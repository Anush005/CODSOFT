import { motion } from 'framer-motion';

const TypingIndicator = () => (
  <div className="self-start bg-bot-bg rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
    <div className="flex gap-1.5 items-center h-5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-bot-fg/40"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}
    </div>
  </div>
);

export default TypingIndicator;
