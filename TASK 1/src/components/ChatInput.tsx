import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  return (
    <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Ask about your health..."
          disabled={disabled}
          className="w-full bg-transparent outline-none placeholder:text-foreground/30 text-[15px] py-3 pl-4 pr-12 rounded-xl ring-1 ring-foreground/5 transition-shadow duration-200 focus:ring-2 focus:ring-primary/30"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={!value.trim() || disabled}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center transition-colors hover:bg-primary-hover disabled:opacity-30"
        >
          <ArrowUp size={16} />
        </motion.button>
    </div>
  );
};

export default ChatInput;
