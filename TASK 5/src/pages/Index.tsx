import { useState, useRef, useEffect } from 'react';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Eye, Users, Loader2, X } from 'lucide-react';
import FaceCanvas from '@/components/FaceCanvas';
import FaceDetailPanel from '@/components/FaceDetailPanel';
import WebcamCapture from '@/components/WebcamCapture';
import MobileDetailOverlay from '@/components/MobileDetailOverlay';
import KnownFacesList from '@/components/KnownFacesList';
import { useIsMobile } from '@/hooks/use-mobile';
import { useFaceDetection } from '@/hooks/useFaceDetection';

function TerminalTitle() {
  const { displayed, done } = useTypingEffect('VisionLab', 100);
  return (
    <span className={done ? 'glitch-text' : ''} data-text={displayed}>
      {displayed}
      <span
        className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle"
        style={{ animation: done ? 'terminal-blink 1s step-end infinite' : 'none' }}
      />
    </span>
  );
}

export default function Index() {
  const isMobile = useIsMobile();
  const {
    modelsReady, loading, detecting, imageSrc, imageNaturalSize,
    faces, selectedFace, setSelectedFace, recognizedNames,
    knownFaces, selectedFaceData, processImage, labelFace, removeFace,
  } = useFaceDetection();

  const [webcamActive, setWebcamActive] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) setCanvasWidth(containerRef.current.offsetWidth);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => processImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => processImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background bg-dots scanline-overlay">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-primary flex items-center justify-center shadow-soft">
              <Eye className="text-primary-foreground" size={20} />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-display font-bold text-foreground tracking-tight">
                <TerminalTitle />
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-mono">
                &gt; Smart Face Analysis
              </p>
            </div>
          </div>
          {modelsReady && (
            <span className="flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
              Ready
            </span>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Loader2 className="text-primary animate-spin" size={28} />
              </div>
              <p className="text-sm text-muted-foreground">Preparing analysis engine...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {modelsReady && (
          <div className="space-y-6 sm:space-y-8">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all shadow-soft active:scale-[0.98]"
              >
                <Upload size={16} /> Upload Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <WebcamCapture
                isActive={webcamActive}
                onToggle={() => setWebcamActive(!webcamActive)}
                onCapture={(src) => {
                  setWebcamActive(false);
                  processImage(src);
                }}
              />
              {faces.length > 0 && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground ml-auto bg-secondary px-3 py-1.5 rounded-full">
                  <Users size={14} />
                  {faces.length} face{faces.length !== 1 ? 's' : ''} found
                </span>
              )}
            </div>

            {/* Content */}
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-[1fr_320px]'}`}>
              {/* Canvas area */}
              <div ref={containerRef}>
                {imageSrc ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-elevated bg-card">
                    <FaceCanvas
                      imageSrc={imageSrc}
                      faces={faces}
                      recognizedNames={recognizedNames}
                      selectedFace={selectedFace}
                      onFaceClick={setSelectedFace}
                      width={canvasWidth}
                      height={Math.min(
                        Math.round(canvasWidth * (imageNaturalSize.h / imageNaturalSize.w)),
                        window.innerWidth < 640 ? Math.round(window.innerHeight * 0.45) : 800
                      )}
                    />
                    {detecting && (
                      <div className="absolute inset-0 flex items-center justify-center bg-card/70 backdrop-blur-sm rounded-2xl">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Loader2 className="text-primary animate-spin" size={24} />
                          </div>
                          <span className="text-sm font-medium text-foreground">Analyzing faces...</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center py-20 sm:py-32 hover:border-primary/50 hover:bg-primary/[0.02] transition-all cursor-pointer group bg-card"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                      <Eye className="text-muted-foreground group-hover:text-primary transition-colors" size={28} />
                    </div>
                    <p className="text-base font-display font-semibold text-foreground mb-1">Drop an image here</p>
                    <p className="text-sm text-muted-foreground">or click to browse · JPG, PNG, WebP</p>
                  </div>
                )}
              </div>

              {/* Desktop sidebar */}
              {!isMobile && (
                <div className="space-y-4">
                  <FaceDetailPanel
                    face={selectedFaceData}
                    recognizedName={selectedFace !== null ? recognizedNames.get(selectedFace) : undefined}
                    onLabelFace={labelFace}
                    onClose={() => setSelectedFace(null)}
                  />
                  <KnownFacesList names={knownFaces} onRemove={removeFace} />
                  {!selectedFaceData && faces.length > 0 && (
                    <div className="bg-card border border-border rounded-2xl p-5 text-center shadow-soft">
                      <p className="text-sm text-muted-foreground">Select a detected face to view details</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile bottom sheet */}
            {isMobile && (
              <MobileDetailOverlay isOpen={selectedFace !== null} onClose={() => setSelectedFace(null)}>
                <FaceDetailPanel
                  face={selectedFaceData}
                  recognizedName={selectedFace !== null ? recognizedNames.get(selectedFace) : undefined}
                  onLabelFace={labelFace}
                  onClose={() => setSelectedFace(null)}
                />
                <KnownFacesList names={knownFaces} onRemove={removeFace} />
              </MobileDetailOverlay>
            )}

            {isMobile && !selectedFaceData && faces.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-4 text-center shadow-soft">
                <p className="text-sm text-muted-foreground">Tap a face to see details</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}