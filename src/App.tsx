import { useState, useCallback } from 'react';
import type { ChatMessage } from './types/chat';
import { initialMessages, followUpMessage } from './data/sampleChat';
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [selectedChoiceMessageId, setSelectedChoiceMessageId] = useState<string | null>(null);
  const [showInput, setShowInput] = useState(false);

  const handleChoiceSelect = useCallback(
    (text: string) => {
      if (selectedChoiceMessageId) return; // 이미 선택됨

      // 1. 선택된 텍스트를 유저 메시지로 추가
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
      };

      setMessages((prev) => [...prev, userMessage]);
      setSelectedChoiceMessageId('selected');
      setShowInput(false);

      // 2. 잠시 후 AI 후속 응답 추가
      setTimeout(() => {
        setMessages((prev) => [...prev, followUpMessage]);
      }, 1200);
    },
    [selectedChoiceMessageId],
  );

  const handleDirectInput = useCallback(() => {
    setShowInput(true);
  }, []);

  const handleSend = useCallback((text: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setShowInput(false);
    setSelectedChoiceMessageId('selected');

    // 직접 입력도 선택지와 동일하게 후속 AI 응답 트리거
    setTimeout(() => {
      setMessages((prev) => [...prev, followUpMessage]);
    }, 1200);
  }, []);

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-bg-primary">
      <ChatHeader />
      <ChatContainer
        messages={messages}
        onChoiceSelect={handleChoiceSelect}
        selectedChoiceMessageId={selectedChoiceMessageId}
        onDirectInput={handleDirectInput}
      />
      {showInput && <ChatInput onSend={handleSend} />}
    </div>
  );
}

export default App;
