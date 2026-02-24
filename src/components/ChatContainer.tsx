import { useRef, useEffect } from 'react';
import type { ChatMessage as ChatMessageType } from '../types/chat';
import ChatMessage from './ChatMessage';

interface ChatContainerProps {
  messages: ChatMessageType[];
  onChoiceSelect: (text: string) => void;
  selectedChoiceMessageId: string | null;
  onDirectInput: () => void;
}

export default function ChatContainer({
  messages,
  onChoiceSelect,
  selectedChoiceMessageId,
  onDirectInput,
}: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg}
          onChoiceSelect={onChoiceSelect}
          choicesDisabled={selectedChoiceMessageId !== null}
          onDirectInput={onDirectInput}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
