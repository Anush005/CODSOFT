import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Brain, Sparkles } from "lucide-react";
import ImageDropZone from "@/components/ImageDropZone";
import CaptionResult from "@/components/CaptionResult";
import LoadingSkeleton from "@/components/LoadingSkeleton";

interface CaptionData {
  caption: string;
  detailed: string;
  tags: string[];
  confidence: number;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [captionData, setCaptionData] = useState<CaptionData | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImageSelect = useCallback(async (file: File) => {
    setIsLoading(true);
    setCaptionData(null);
    setImageUrl(URL.createObjectURL(file));

    try {
      const base64 = await fileToBase64(file);

      const { data, error } = await supabase.functions.invoke("caption-image", {
        body: { imageBase64: base64, mimeType: file.type },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setCaptionData(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to caption image";
      toast.error(message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setCaptionData(null);
    setImageUrl(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">
              Neural Caption
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              Vision Transformer × NLP
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
            <Sparkles className="h-3 w-3" />
            AI-Powered Image Analysis
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="text-gradient">Describe any image</span>
            <br />
            <span className="text-foreground">with neural precision</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Upload an image and our AI extracts visual features using deep neural networks,
            then generates rich, contextual captions with transformer-based language models.
          </p>
        </div>

        {/* Upload or Result */}
        {!imageUrl && !isLoading && (
          <ImageDropZone onImageSelect={handleImageSelect} isLoading={isLoading} />
        )}

        {isLoading && <LoadingSkeleton />}

        {captionData && imageUrl && !isLoading && (
          <>
            <CaptionResult data={captionData} imageUrl={imageUrl} />
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="rounded-lg bg-secondary px-6 py-2.5 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                Caption another image
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
