import { Badge } from "@/components/ui/badge";

interface CaptionData {
  caption: string;
  detailed: string;
  tags: string[];
  confidence: number;
}

interface CaptionResultProps {
  data: CaptionData;
  imageUrl: string;
}

const ConfidenceBar = ({ value }: { value: number }) => {
  const percent = Math.round(value * 100);
  const colorClass =
    value >= 0.8 ? "bg-confidence-high" : value >= 0.5 ? "bg-confidence-mid" : "bg-confidence-low";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-mono">Confidence</span>
        <span className="font-mono font-medium text-foreground">{percent}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full confidence-bar ${colorClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

const CaptionResult = ({ data, imageUrl }: CaptionResultProps) => {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Image Preview */}
      <div className="overflow-hidden rounded-2xl glow">
        <img
          src={imageUrl}
          alt={data.caption}
          className="w-full h-auto max-h-[400px] object-cover"
        />
      </div>

      {/* Caption */}
      <div className="space-y-4 rounded-xl bg-caption-surface border border-border p-6">
        <div className="space-y-1">
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Caption</h3>
          <p className="text-lg font-medium leading-relaxed text-foreground">{data.caption}</p>
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-1">
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Detailed Analysis</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{data.detailed}</p>
        </div>

        <div className="h-px bg-border" />

        {/* Tags */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-tag-bg text-tag-foreground border-0 font-mono text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="h-px bg-border" />

        <ConfidenceBar value={data.confidence} />
      </div>
    </div>
  );
};

export default CaptionResult;
