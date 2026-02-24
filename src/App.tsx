import { useState, useCallback } from 'react';
import type { ChatMessage } from './types/chat';
import { initialMessages } from './data/sampleChat';
import { parseCyoaContent } from './utils/parseCyoa';
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

  /**
   * 선택지 클릭 핸들러
   * - 해당 메시지의 responses 배열에서 유저 버블 콘텐츠를 가져옴 (하이브리드)
   * - responses 없으면 버튼 텍스트를 그대로 사용 (폴백)
   */
  const handleChoiceSelect = useCallback(
    (messageId: string, choiceIndex: number) => {
      if (disabledChoiceIds.includes(messageId)) return;

      // 해당 메시지 찾기
      const choiceMessage = messages.find((m) => m.id === messageId);
      if (!choiceMessage) return;

      // 하이브리드 유저 버블 콘텐츠 결정
      let userContent: string;
      if (choiceMessage.responses?.[choiceIndex]) {
        userContent = choiceMessage.responses[choiceIndex];
      } else {
        // 폴백: 버튼 텍스트 사용
        const parsed = parseCyoaContent(choiceMessage.content);
        userContent = parsed.choices[choiceIndex]?.text || '';
      }

      // 유저 메시지 추가
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: userContent,
      };

      setMessages((prev) => [...prev, userMessage]);
      setDisabledChoiceIds((prev) => [...prev, messageId]);
      setShowInput(false);
      setActiveInputMessageId(null);

      // 후속 AI 메시지가 있으면 추가
      if (choiceMessage.followUpMessage) {
        const followUp: ChatMessage = {
          ...choiceMessage.followUpMessage,
          id: `ai-${Date.now()}`,
        };
        setTimeout(() => {
          setMessages((prev) => [...prev, followUp]);
        }, 1200);
      }
    },
    [disabledChoiceIds, messages],
  );

  /**
   * 직접 입력 버튼 클릭 핸들러
   */
  const handleDirectInput = useCallback((messageId: string) => {
    setShowInput(true);
    setActiveInputMessageId(messageId);
  }, []);

  /**
   * 텍스트 전송 핸들러
   */
  const handleSend = useCallback(
    (text: string) => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
      };

      setMessages((prev) => [...prev, userMessage]);
      setShowInput(false);

      // 해당 메시지의 선택지 비활성화
      if (activeInputMessageId) {
        const choiceMessage = messages.find(
          (m) => m.id === activeInputMessageId,
        );

        setDisabledChoiceIds((prev) => [...prev, activeInputMessageId]);
        setActiveInputMessageId(null);

        // 후속 AI 메시지가 있으면 추가
        if (choiceMessage?.followUpMessage) {
          const followUp: ChatMessage = {
            ...choiceMessage.followUpMessage,
            id: `ai-${Date.now()}`,
          };
          setTimeout(() => {
            setMessages((prev) => [...prev, followUp]);
          }, 1200);
        }
      }
    },
    [activeInputMessageId, messages],
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
