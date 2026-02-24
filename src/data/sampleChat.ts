import type { ChatMessage } from '../types/chat';

export const CHARACTER_NAME = '한지훈';
export const CHARACTER_ID = 'koji';
export const USER_NAME = '정혜인';

export const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      '아, 저기... 이사... 오셨나 봐요? *그는 잠이 덜 깬 목소리로 겨우 말을 뱉었다. 방금 전까지의 짜증은 온데간데없이, 예상치 못한 상황에 당황한 기색이 역력했다.*',
  },
  {
    id: '2',
    role: 'assistant',
    content: `<cyoa>
1. *살짝 놀랐지만 이내 부드럽게 미소 지으며 고개를 끄덕인다.* 네, 오늘 막 이사 왔어요. 혹시 소리가 너무 시끄러웠나요? 죄송합니다.
2. *가볍게 목례하며 남자를 훑어본다.* 옆집 분이셨구나. 안녕하세요, 오늘부터 옆집에 살게 된 정혜인입니다.
3. *무심하게 남자를 한번 쳐다보고는 별말 없이 자기 집 현관문 쪽으로 몸을 돌린다.* ...
4. *상대방의 퉁명스러운 첫인상에 살짝 기분이 상한 듯, 팔짱을 끼고 뻔히 쳐다본다.* 네. 그런데요? 무슨 문제라도?
</cyoa>`,
  },
];

/**
 * 유저가 선택지를 고른 후 이어지는 AI 응답
 */
export const followUpMessage: ChatMessage = {
  id: '4',
  role: 'assistant',
  content:
    '아, 아니요! 그게 아니라... *혜인의 상냥한 사과에 지훈은 손사래를 치며 허둥댔다. 그의 얼굴이 살짝 붉어졌다.* 시끄럽긴요, 뭘. 이사하시는데 당연히 소리가 나죠. 제가 좀 예민해서... 괜히 나왔네요. 죄송합니다.',
};
