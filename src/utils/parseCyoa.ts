import type { CyoaChoice, ParsedMessage } from '../types/chat';

/**
 * <cyoa> 태그와 <scene> 태그를 파싱하여 본문, 장면 내레이션, 선택지를 분리한다.
 */
export function parseCyoaContent(content: string): ParsedMessage {
  const cyoaRegex = /<cyoa>\s*([\s\S]*?)\s*<\/cyoa>/;
  const sceneRegex = /<scene>\s*([\s\S]*?)\s*<\/scene>/;

  const cyoaMatch = content.match(cyoaRegex);
  const sceneMatch = content.match(sceneRegex);

  // 장면 내레이션 추출
  const sceneText = sceneMatch ? sceneMatch[1].trim() : '';

  // 본문에서 <cyoa>, <scene> 블록 제거
  let bodyText = content;
  if (cyoaMatch) bodyText = bodyText.replace(cyoaRegex, '');
  if (sceneMatch) bodyText = bodyText.replace(sceneRegex, '');
  bodyText = bodyText.trim();

  if (!cyoaMatch) {
    return { bodyText, sceneText, choices: [] };
  }

  // 선택지 파싱
  const choicesRaw = cyoaMatch[1].trim();
  const lines = choicesRaw.split('\n').filter((line) => line.trim());

  const choices: CyoaChoice[] = lines
    .map((line, idx) => {
      // "1. 텍스트" 형식에서 번호 제거
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
    sceneText,
    choices,
  };
}
