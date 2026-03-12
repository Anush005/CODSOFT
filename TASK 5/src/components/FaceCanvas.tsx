import { useEffect, useRef } from 'react';
import type { FaceResult } from '@/lib/faceDetection';

interface FaceCanvasProps {
  imageSrc: string;
  faces: FaceResult[];
  recognizedNames: Map<number, string>;
  selectedFace: number | null;
  onFaceClick: (id: number) => void;
  width: number;
  height: number;
}

export default function FaceCanvas({ imageSrc, faces, recognizedNames, selectedFace, onFaceClick, width, height }: FaceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      draw(ctx, img);
    };
    img.src = imageSrc;
  }, [imageSrc, faces, recognizedNames, selectedFace]);

  function draw(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const canvas = ctx.canvas;
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const dx = (canvas.width - img.width * scale) / 2;
    const dy = (canvas.height - img.height * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale);

    faces.forEach((face) => {
      const x = face.box.x * scale + dx;
      const y = face.box.y * scale + dy;
      const w = face.box.width * scale;
      const h = face.box.height * scale;

      const isSelected = selectedFace === face.id;
      const name = recognizedNames.get(face.id);

      // Colors: indigo for selected, coral for default
      const color = isSelected ? '#5b4cd4' : '#e8613c';
      const bgColor = isSelected ? 'rgba(91,76,212,0.9)' : 'rgba(232,97,60,0.9)';
      const textColor = '#ffffff';

      // Rounded box with thicker stroke
      ctx.strokeStyle = color;
      ctx.lineWidth = isSelected ? 3 : 2;
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

      // Label pill
      const label = name || `Face ${face.id + 1}`;
      ctx.font = '600 13px "Space Grotesk", sans-serif';
      const textWidth = ctx.measureText(label).width;
      const pillW = textWidth + 16;
      const pillH = 22;
      const pillX = x;
      const pillY = y - pillH - 4;

      ctx.beginPath();
      const pr = 8;
      ctx.moveTo(pillX + pr, pillY);
      ctx.lineTo(pillX + pillW - pr, pillY);
      ctx.quadraticCurveTo(pillX + pillW, pillY, pillX + pillW, pillY + pr);
      ctx.lineTo(pillX + pillW, pillY + pillH - pr);
      ctx.quadraticCurveTo(pillX + pillW, pillY + pillH, pillX + pillW - pr, pillY + pillH);
      ctx.lineTo(pillX + pr, pillY + pillH);
      ctx.quadraticCurveTo(pillX, pillY + pillH, pillX, pillY + pillH - pr);
      ctx.lineTo(pillX, pillY + pr);
      ctx.quadraticCurveTo(pillX, pillY, pillX + pr, pillY);
      ctx.closePath();
      ctx.fillStyle = bgColor;
      ctx.fill();
      ctx.fillStyle = textColor;
      ctx.fillText(label, pillX + 8, pillY + 15);

      // Landmarks
      if (isSelected && face.landmarks) {
        ctx.fillStyle = 'rgba(91,76,212,0.5)';
        const positions = face.landmarks.positions;
        positions.forEach((pt: { x: number; y: number }) => {
          ctx.beginPath();
          ctx.arc(pt.x * scale + dx, pt.y * scale + dy, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    });
  }

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current) return;
    const rect = canvas.getBoundingClientRect();
    
    // Account for CSS scaling: canvas internal size vs displayed size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = (e.clientX - rect.left) * scaleX;
    const cy = (e.clientY - rect.top) * scaleY;

    const img = imgRef.current;
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const dx = (canvas.width - img.width * scale) / 2;
    const dy = (canvas.height - img.height * scale) / 2;

    for (const face of faces) {
      const x = face.box.x * scale + dx;
      const y = face.box.y * scale + dy;
      const w = face.box.width * scale;
      const h = face.box.height * scale;
      if (cx >= x && cx <= x + w && cy >= y && cy <= y + h) {
        onFaceClick(face.id);
        return;
      }
    }
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
      className="rounded-2xl cursor-pointer w-full max-w-full"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
}