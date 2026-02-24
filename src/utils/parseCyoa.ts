import type { CyoaChoice, ParsedMessage } from '../types/chat';

/**
 * <cyoa> 태그를 파싱하여 본문과 선택지를 분리한다.
 */
export function parseCyoaContent(content: string): ParsedMessage {
  const cyoaRegex = /<cyoa>\s*([\s\S]*?)\s*<\/cyoa>/;
  const match = content.match(cyoaRegex);

  if (!match) {
    return {
      bodyText: content.trim(),
      choices: [],
    };
  }

  // 본문에서 <cyoa> 블록 제거
  const bodyText = content.replace(cyoaRegex, '').trim();

  // 선택지 파싱
  const choicesRaw = match[1].trim();
  const lines = choicesRaw.split('\n').filter((line) => line.trim());

  const choices: CyoaChoice[] = lines
    .map((line, idx) => {
      // "1. - 텍스트" 또는 "1. 텍스트" 형식
      const lineMatch = line.trim().match(/^\d+\.\s*-?\s*(.+)$/);
      if (lineMatch) {
        return {
          index: idx,
          text: lineMatch[1].trim(),
        };
      }
      // 매칭 실패 시에도 텍스트가 있으면 포함
      const trimmed = line.trim();
      if (trimmed) {
        return {
          index: idx,
          text: trimmed,
        };
      }
      return null;
    })
    .filter((choice): choice is CyoaChoice => choice !== null);

  return {
    bodyText,
    choices,
  };
}
