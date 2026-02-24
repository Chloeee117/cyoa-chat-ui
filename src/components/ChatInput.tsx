import { useState } from 'react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    const trimmed = text.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 bg-bg-secondary border-t border-white/5 shrink-0">
      {/* 번개 아이콘 + 무료 라벨 */}
      <div className="relative shrink-0 self-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/8">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-text-secondary leading-none bg-bg-secondary px-0.5">무료</span>
      </div>

      {/* 입력 필드 + * 아이콘 */}
      <div className="flex-1 relative self-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="내용 입력하기"
          disabled={disabled}
          autoFocus
          className="w-full bg-white/5 text-text-primary text-[13px] rounded-full px-4 py-2.5 pr-10 outline-none placeholder:text-text-secondary/40 focus:ring-1 focus:ring-accent/30 disabled:opacity-50 transition-all"
        />
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[16px] text-text-secondary/40 leading-none">✱</span>
      </div>

      {/* 전송 버튼 */}
      <button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="w-11 h-11 flex items-center justify-center rounded-full bg-accent text-white disabled:opacity-30 hover:bg-accent-light transition-colors shrink-0 self-center"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
}
