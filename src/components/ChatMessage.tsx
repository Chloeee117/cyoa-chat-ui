import type { ChatMessage as ChatMessageType } from '../types/chat';
import { parseCyoaContent } from '../utils/parseCyoa';
import { renderStyledText } from '../utils/renderStyledText';
import CyoaChoices from './CyoaChoices';
import { CHARACTER_NAME, USER_NAME } from '../data/sampleChat';

interface ChatMessageProps {
  message: ChatMessageType;
  onChoiceSelect?: (text: string) => void;
  choicesDisabled?: boolean;
  onDirectInput?: () => void;
}

export default function ChatMessage({
  message,
  onChoiceSelect,
  choicesDisabled,
  onDirectInput,
}: ChatMessageProps) {
  const isUser = message.role === 'user';
  const parsed = parseCyoaContent(message.content);
  const hasBody = parsed.bodyText.length > 0;
  const hasChoices = !isUser && parsed.choices.length > 0;

  if (!hasBody && !hasChoices) return null;

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-5`}>
      {/* AI: 아바타 + 이름 */}
      {!isUser && hasBody && (
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 shrink-0 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-[10px] text-white/70 font-medium">
              JH
            </div>
          </div>
          <span className="text-[12px] text-text-secondary">
            {CHARACTER_NAME}
          </span>
        </div>
      )}

      {/* 유저: 이름 */}
      {isUser && (
        <span className="text-[12px] text-text-secondary mb-1.5 mr-1">
          {USER_NAME}
        </span>
      )}

      {/* 메시지 버블 */}
      {hasBody && (
        <div
          className={`
            rounded-2xl px-4 py-3 text-[14px] leading-[1.8] break-words overflow-hidden
            ${isUser
              ? 'max-w-[75%] bg-bg-bubble-user text-white rounded-br-sm'
              : 'max-w-[80%] bg-bg-bubble-ai text-text-primary rounded-tl-sm ml-10'
            }
          `}
        >
          {renderStyledText(parsed.bodyText)}
        </div>
      )}

      {/* AI: zeta 라벨 */}
      {!isUser && hasBody && (
        <span className="text-[10px] text-text-secondary/50 mt-1 ml-10">
          zeta
        </span>
      )}

      {/* 선택지 버튼 (AI 메시지에만, 선택 전에만 표시) */}
      {hasChoices && !choicesDisabled && (
        <CyoaChoices
          choices={parsed.choices}
          onSelect={onChoiceSelect}
          onDirectInput={onDirectInput}
        />
      )}
    </div>
  );
}
