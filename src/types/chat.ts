export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

export interface CyoaChoice {
  index: number;
  text: string;
}

export interface ParsedMessage {
  bodyText: string;
  choices: CyoaChoice[];
}
