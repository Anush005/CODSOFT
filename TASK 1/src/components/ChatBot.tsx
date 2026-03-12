import { useState, useRef, useEffect, useCallback } from 'react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestedChips from './SuggestedChips';
import ChatInput from './ChatInput';
import { getResponse, initialChips } from '@/lib/healthRules';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

const WELCOME = "Hi, I'm MedBot 🩺 — your personal health assistant. I can help with nutrition, exercise, sleep, symptoms, and general wellness tips. What can I help you with today?\n\n*Note: I provide general health information, not medical advice. Always consult a professional for diagnosis.*";

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'bot', content: WELCOME },
  ]);
  const [chips, setChips] = useState<string[]>(initialChips);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = useCallback((text: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setChips([]);
    setIsTyping(true);

    setTimeout(() => {
      const { response, followUpChips } = getResponse(text);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', content: response };
      setMessages((prev) => [...prev, botMsg]);
      setChips(followUpChips || initialChips);
      setIsTyping(false);
    }, 700);
  }, []);

  return (
    <div className="w-full md:max-w-md lg:max-w-lg h-svh md:h-[85svh] md:max-h-[800px] flex flex-col bg-surface md:rounded-3xl" style={{ boxShadow: 'var(--chat-shadow)' }}>
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-3 md:gap-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:p-4 pt-2 flex flex-col gap-3">
        {chips.length > 0 && (
          <SuggestedChips chips={chips} onSelect={handleSend} />
        )}
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatBot;
