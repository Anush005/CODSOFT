import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImageDropZoneProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

const ImageDropZone = ({ onImageSelect, isLoading }: ImageDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files?.[0]?.type.startsWith("image/")) {
        onImageSelect(files[0]);
      }
    },
    [onImageSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files?.[0]) {
        onImageSelect(files[0]);
      }
    },
    [onImageSelect]
  );

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all duration-300 cursor-pointer group
        ${isDragging ? "drop-zone-active border-drop-zone scale-[1.01]" : "border-border hover:border-primary/40 hover:bg-muted/50"}
        ${isLoading ? "pointer-events-none opacity-60" : ""}`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />

      <div className={`mb-4 rounded-xl p-4 transition-colors ${isDragging ? "bg-primary/10" : "bg-muted group-hover:bg-primary/5"}`}>
        {isDragging ? (
          <ImageIcon className="h-8 w-8 text-primary" />
        ) : (
          <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </div>

      <p className="text-lg font-medium text-foreground mb-1">
        {isDragging ? "Drop your image here" : "Upload an image"}
      </p>
      <p className="text-sm text-muted-foreground">
        Drag & drop or click to browse · JPG, PNG, WebP
      </p>
    </div>
  );
};

export default ImageDropZone;
