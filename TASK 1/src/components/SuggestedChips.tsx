interface SuggestedChipsProps {
  chips: string[];
  onSelect: (chip: string) => void;
}

const SuggestedChips = ({ chips, onSelect }: SuggestedChipsProps) => (
  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
    {chips.map((chip) => (
      <button
        key={chip}
        onClick={() => onSelect(chip)}
        className="px-3 py-1.5 rounded-full text-[13px] bg-bot-bg/50 text-bot-fg cursor-pointer whitespace-nowrap transition-colors duration-150 hover:bg-bot-bg shrink-0"
      >
        {chip}
      </button>
    ))}
  </div>
);

export default SuggestedChips;
