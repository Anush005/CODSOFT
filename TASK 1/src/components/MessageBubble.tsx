import { motion } from 'framer-motion';

interface MessageBubbleProps {
  role: 'user' | 'bot';
  content: string;
}

const parseMarkdown = (text: string) => {
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;

  // Match **bold** and *italic*
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[1]) {
      // Bold text
      parts.push(
        <strong key={`${match.index}-bold`} className="font-bold">
          {match[1]}
        </strong>
      );
    } else if (match[2]) {
      // Italic text
      parts.push(
        <em key={`${match.index}-italic`} className="italic">
          {match[2]}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

const MessageBubble = ({ role, content }: MessageBubbleProps) => {
  const isBot = role === 'bot';
  const parsedContent = parseMarkdown(content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={`max-w-[88%] md:max-w-[85%] px-3.5 py-2.5 md:px-4 md:py-3 text-[14px] md:text-[15px] leading-[1.6] tracking-[-0.01em] ${
        isBot
          ? 'self-start bg-bot-bg text-bot-fg rounded-2xl rounded-tl-sm'
          : 'self-end bg-user-bg text-user-fg rounded-2xl rounded-tr-sm'
      }`}
    >
      {parsedContent}
    </motion.div>
  );
};

export default MessageBubble;
