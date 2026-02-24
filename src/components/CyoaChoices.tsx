import type { CyoaChoice } from '../types/chat';
import { renderStyledText } from '../utils/renderStyledText';

interface CyoaChoicesProps {
  choices: CyoaChoice[];
  onSelect?: (choiceIndex: number) => void;
  onDirectInput?: () => void;
}

export default function CyoaChoices({
  choices,
  onSelect,
  onDirectInput,
}: CyoaChoicesProps) {
  return (
    <div className="flex flex-col gap-1.5 mt-2 w-full pl-10">
      {choices.map((choice) => (
        <button
          key={choice.index}
          onClick={() => onSelect?.(choice.index)}
          className="w-full text-left text-[13px] leading-[1.6]
            px-3 py-2 rounded-xl break-words
            border transition-all duration-300
            border-border-choice bg-bg-choice hover:border-border-choice-hover hover:bg-accent/8 active:scale-[0.98] cursor-pointer"
        >
          <span className="text-text-primary">
            {renderStyledText(choice.text)}
          </span>
        </button>
      ))}

      {/* 직접 입력 버튼 */}
      <button
        onClick={() => onDirectInput?.()}
        className="w-full text-center text-[12px] leading-[1.4]
          px-3 py-1.5 rounded-xl
          border border-white/10 bg-white/[0.03]
          hover:border-white/20 hover:bg-white/[0.06]
          active:scale-[0.98] cursor-pointer
          transition-all duration-300
          text-text-secondary"
      >
        ✏️ 직접 입력
      </button>
    </div>
  );
}
