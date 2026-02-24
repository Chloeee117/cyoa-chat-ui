import { useRef, useEffect } from 'react';
import type { ChatMessage as ChatMessageType } from '../types/chat';
import ChatMessage from './ChatMessage';

interface ChatContainerProps {
  messages: ChatMessageType[];
  onChoiceSelect: (messageId: string, choiceIndex: number) => void;
  disabledChoiceIds: string[];
  onDirectInput: (messageId: string) => void;
}

export default function ChatContainer({
  messages,
  onChoiceSelect,
  disabledChoiceIds,
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
          choicesDisabled={disabledChoiceIds.includes(msg.id)}
          onDirectInput={onDirectInput}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
