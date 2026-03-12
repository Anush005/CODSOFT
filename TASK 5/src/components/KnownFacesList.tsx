import { Trash2 } from 'lucide-react';

interface KnownFacesListProps {
  names: string[];
  onRemove: (name: string) => void;
}

export default function KnownFacesList({ names, onRemove }: KnownFacesListProps) {
  if (names.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-soft">
      <h3 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Recognized People ({names.length})
      </h3>
      <div className="space-y-2">
        {names.map(name => (
          <div key={name} className="flex items-center justify-between bg-secondary rounded-xl px-3 py-2">
            <span className="text-sm font-medium text-foreground">{name}</span>
            <button
              onClick={() => onRemove(name)}
              className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-lg hover:bg-destructive/10"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}