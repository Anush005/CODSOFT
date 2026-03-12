const ChatHeader = () => (
  <div className="h-16 flex items-center px-6 border-b border-foreground/[0.04] shrink-0">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      <h1 className="text-[16px] font-medium tracking-[-0.02em] text-foreground">
        MedBot Health Assistant
      </h1>
    </div>
  </div>
);

export default ChatHeader;
