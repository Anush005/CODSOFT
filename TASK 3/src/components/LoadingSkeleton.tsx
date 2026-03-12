const LoadingSkeleton = () => {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Image skeleton */}
      <div className="h-64 rounded-2xl bg-muted animate-pulse-soft" />

      {/* Content skeleton */}
      <div className="space-y-4 rounded-xl bg-caption-surface border border-border p-6">
        <div className="space-y-2">
          <div className="h-3 w-16 rounded bg-muted" />
          <div className="h-5 w-full rounded bg-muted animate-pulse-soft" />
          <div className="h-5 w-3/4 rounded bg-muted animate-pulse-soft" />
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-2">
          <div className="h-3 w-28 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted animate-pulse-soft" />
          <div className="h-4 w-full rounded bg-muted animate-pulse-soft" />
          <div className="h-4 w-2/3 rounded bg-muted animate-pulse-soft" />
        </div>

        <div className="h-px bg-border" />

        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 w-16 rounded-full bg-muted animate-pulse-soft" />
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground font-mono animate-pulse-soft">
        Analyzing image features with neural network...
      </p>
    </div>
  );
};

export default LoadingSkeleton;
