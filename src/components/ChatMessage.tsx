import type { ChatMessage as ChatMessageType } from '../types/chat';
import { parseCyoaContent } from '../utils/parseCyoa';
import { renderStyledText } from '../utils/renderStyledText';
import CyoaChoices from './CyoaChoices';
import { CHARACTER_NAME, USER_NAME } from '../data/sampleChat';

interface ChatMessageProps {
  message: ChatMessageType;
  onChoiceSelect?: (messageId: string, choiceIndex: number) => void;
  choicesDisabled?: boolean;
  onDirectInput?: (messageId: string) => void;
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
  const hasScene = parsed.sceneText.length > 0;
  const hasChoices = !isUser && parsed.choices.length > 0;

  if (!hasBody && !hasChoices && !hasScene) return null;

  return (
    <div
      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-5`}
    >
      {/* AI: 아바타 + 이름 */}
      {!isUser && hasBody && (
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 shrink-0 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-[10px] text-white/70 font-medium">
              DR
            </div>
          </div>
          <span className="text-[12px] text-text-secondary">
            {CHARACTER_NAME}
          </span>
        </div>
      )}

      {/* 유저: 이름 + 아바타 */}
      {isUser && (
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[12px] text-text-secondary">{USER_NAME}</span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shrink-0 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-[10px] text-white font-medium">
              혜인
            </div>
          </div>
        </div>
      )}

      {/* 메시지 버블 */}
      {hasBody && (
        <div
          className={`
            rounded-2xl px-4 py-3 text-[14px] leading-[1.8] break-words overflow-hidden
            ${
              isUser
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

      {/* 장면 내레이션 블록 (버블 외부, ≡ 아이콘) */}
      {hasScene && (
        <div className="flex gap-2.5 mt-4 ml-6 mr-2">
          <div className="shrink-0 mt-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-text-secondary/50"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="16" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </div>
          <p className="text-[14px] leading-[1.8] text-text-primary/80">
            {parsed.sceneText}
          </p>
        </div>
      )}

      {/* 선택지 버튼 (AI 메시지에만, 선택 전에만 표시) */}
      {hasChoices && !choicesDisabled && (
        <CyoaChoices
          choices={parsed.choices}
          onSelect={(choiceIndex) =>
            onChoiceSelect?.(message.id, choiceIndex)
          }
          onDirectInput={() => onDirectInput?.(message.id)}
        />
      )}
    </div>
  );
}
