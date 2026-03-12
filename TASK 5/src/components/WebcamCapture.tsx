import { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, CameraOff, Pause, Play } from 'lucide-react';
import { detectFaces, type FaceResult } from '@/lib/faceDetection';

interface WebcamCaptureProps {
  onCapture: (dataUrl: string) => void;
  isActive: boolean;
  onToggle: () => void;
  recognizedNames?: Map<number, string>;
}

export default function WebcamCapture({ onCapture, isActive, onToggle, recognizedNames = new Map() }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number>(0);
  const detectingRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [liveDetection, setLiveDetection] = useState(true);
  const [liveFaces, setLiveFaces] = useState<FaceResult[]>([]);
  const [fps, setFps] = useState(0);
  const lastDetectTime = useRef(0);

  useEffect(() => {
    if (isActive) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 } })
        .then(stream => {
          streamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
          setError(null);
        })
        .catch(() => setError('Camera access denied'));
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      setLiveFaces([]);
      cancelAnimationFrame(animFrameRef.current);
    }
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !liveDetection) {
      cancelAnimationFrame(animFrameRef.current);
      return;
    }
    const loop = async () => {
      const video = videoRef.current;
      if (!video || video.readyState < 2 || detectingRef.current) {
        animFrameRef.current = requestAnimationFrame(loop);
        return;
      }
      detectingRef.current = true;
      const start = performance.now();
      try {
        const results = await detectFaces(video, true);
        setLiveFaces(results);
        const elapsed = performance.now() - start;
        lastDetectTime.current = elapsed;
        setFps(Math.round(1000 / Math.max(elapsed, 1)));
      } catch { /* skip */ }
      detectingRef.current = false;
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isActive, liveDetection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || !isActive) return;

    const draw = () => {
      if (video.readyState < 2) { requestAnimationFrame(draw); return; }
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      liveFaces.forEach((face) => {
        const { x, y, width: w, height: h } = face.box;
        const color = '#5b4cd4';

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        const r = 6;
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.stroke();

        const topExpr = Object.entries(face.expressions).sort((a, b) => b[1] - a[1])[0];
        const label = `${face.gender === 'male' ? '♂' : '♀'} ~${face.age}y ${topExpr ? topExpr[0] : ''}`;
        ctx.font = '600 12px "Space Grotesk", sans-serif';
        const tw = ctx.measureText(label).width;
        ctx.fillStyle = 'rgba(91,76,212,0.9)';
        const pillH = 20;
        const pillY = y - pillH - 3;
        ctx.beginPath();
        const pr = 6;
        ctx.moveTo(x + pr, pillY);
        ctx.lineTo(x + tw + 12 - pr, pillY);
        ctx.quadraticCurveTo(x + tw + 12, pillY, x + tw + 12, pillY + pr);
        ctx.lineTo(x + tw + 12, pillY + pillH - pr);
        ctx.quadraticCurveTo(x + tw + 12, pillY + pillH, x + tw + 12 - pr, pillY + pillH);
        ctx.lineTo(x + pr, pillY + pillH);
        ctx.quadraticCurveTo(x, pillY + pillH, x, pillY + pillH - pr);
        ctx.lineTo(x, pillY + pr);
        ctx.quadraticCurveTo(x, pillY, x + pr, pillY);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText(label, x + 6, pillY + 14);
      });
    };
    const id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, [liveFaces, isActive]);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')!.drawImage(video, 0, 0);
    onCapture(canvas.toDataURL('image/jpeg'));
  }, [onCapture]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
            isActive
              ? 'bg-destructive/10 text-destructive border border-destructive/20'
              : 'bg-secondary text-foreground border border-border hover:bg-secondary/80'
          }`}
        >
          {isActive ? <CameraOff size={16} /> : <Camera size={16} />}
          {isActive ? 'Stop Camera' : 'Use Camera'}
        </button>
        {isActive && (
          <button
            onClick={() => setLiveDetection(p => !p)}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 transition-colors"
          >
            {liveDetection ? <Pause size={14} /> : <Play size={14} />}
            {liveDetection ? 'Pause' : 'Resume'}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-destructive font-medium">{error}</p>}

      {isActive && (
        <div className="relative rounded-2xl overflow-hidden shadow-elevated">
          <video ref={videoRef} autoPlay muted playsInline className="w-full" />
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
          {liveDetection && (
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="bg-card/90 backdrop-blur-md border border-border rounded-full px-3 py-1 text-xs font-medium text-primary flex items-center gap-1.5 shadow-soft">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
                LIVE
              </span>
              <span className="bg-card/90 backdrop-blur-md border border-border rounded-full px-3 py-1 text-xs text-muted-foreground shadow-soft">
                {liveFaces.length} face{liveFaces.length !== 1 ? 's' : ''} · {fps} FPS
              </span>
            </div>
          )}
          <button
            onClick={capture}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-elevated active:scale-[0.98]"
          >
            Capture & Analyze
          </button>
        </div>
      )}
    </div>
  );
}