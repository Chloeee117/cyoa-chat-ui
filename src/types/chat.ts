export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  /** 하이브리드: 각 선택지 index에 대응하는 유저 버블 텍스트 */
  responses?: string[];
  /** 선택지 클릭 후 이어지는 AI 후속 메시지 */
  followUpMessage?: ChatMessage;
}

export interface CyoaChoice {
  index: number;
  text: string;
}

export interface ParsedMessage {
  bodyText: string;
  sceneText: string;
  choices: CyoaChoice[];
}
