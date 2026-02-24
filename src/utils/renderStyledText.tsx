import React from 'react';

/**
 * *로 감싼 텍스트(지문/서술)를 흐리게+기울임으로, 나머지(대사)를 일반 텍스트로 렌더링한다.
 *
 * 예: "*살짝 놀라며 고개를 끄덕인다.* \"네, 안녕하세요.\""
 * → 지문은 italic + opacity-55, 대사는 일반
 */
export function renderStyledText(text: string): React.ReactNode[] {
  // *...*로 감싼 부분을 찾는 정규식
  const parts = text.split(/(\*[^*]+\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      // 지문/서술 부분: 기울임 + 흐리게
      const innerText = part.slice(1, -1);
      return (
        <span
          key={index}
          className="italic"
          style={{ opacity: 0.55 }}
        >
          {innerText}
        </span>
      );
    }
    // 대사/일반 텍스트
    return <span key={index}>{part}</span>;
  });
}
