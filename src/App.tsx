import { useState, useCallback } from 'react';
import type { ChatMessage } from './types/chat';
import { initialMessages, followUpMessage } from './data/sampleChat';
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [disabledChoiceIds, setDisabledChoiceIds] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [activeInputMessageId, setActiveInputMessageId] = useState<
    string | null
  >(null);

  const handleChoiceSelect = useCallback(
    (messageId: string, text: string) => {
      if (disabledChoiceIds.includes(messageId)) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
      };

      setMessages((prev) => [...prev, userMessage]);
      setDisabledChoiceIds((prev) => [...prev, messageId]);
      setShowInput(false);
      setActiveInputMessageId(null);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { ...followUpMessage, id: `ai-${Date.now()}` },
        ]);
      }, 1200);
    },
    [disabledChoiceIds],
  );

  const handleDirectInput = useCallback((messageId: string) => {
    setShowInput(true);
    setActiveInputMessageId(messageId);
  }, []);

  const handleSend = useCallback(
    (text: string) => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
      };
      setMessages((prev) => [...prev, userMessage]);
      setShowInput(false);

      if (activeInputMessageId) {
        setDisabledChoiceIds((prev) => [...prev, activeInputMessageId]);
        setActiveInputMessageId(null);
      }

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { ...followUpMessage, id: `ai-${Date.now()}` },
        ]);
      }, 1200);
    },
    [activeInputMessageId],
  );

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-bg-primary">
      <ChatHeader />
      <ChatContainer
        messages={messages}
        onChoiceSelect={handleChoiceSelect}
        disabledChoiceIds={disabledChoiceIds}
        onDirectInput={handleDirectInput}
      />
      {showInput && <ChatInput onSend={handleSend} />}
    </div>
  );
}

export default App;
