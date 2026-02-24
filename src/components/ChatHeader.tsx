import { CHARACTER_NAME } from '../data/sampleChat';
import kojiLogo from '../assets/koji-logo.png';

export default function ChatHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3.5 bg-bg-secondary shrink-0">
      {/* 뒤로가기 + 캐릭터 이름 */}
      <div className="flex items-center gap-3">
        <button className="text-white hover:text-white/80 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="text-[17px] font-bold text-white">
          {CHARACTER_NAME}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* koji 배지 */}
        <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3.5 py-1.5 cursor-pointer hover:bg-white/15 transition-colors">
          <img src={kojiLogo} alt="koji" className="h-[18px] w-auto" />
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        {/* 메뉴 */}
        <button className="text-white/70 hover:text-white transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
