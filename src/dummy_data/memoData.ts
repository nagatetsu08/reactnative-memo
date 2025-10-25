import type { Memo } from '../types/memo';

const MEMO_DATA: Memo[] = [
  {
    id: 'abcd',
    title: 'useStateについて',
    content: 'useStateの説明',
    labelId: 1
  },
  {
    id: 'efgh',
    title: 'アカウント',
    content: 'メールアドレス： 123@example.com\nパスワード：password',
    labelId: 2
  },
  {
    id: 'ijkl',
    title: 'オムライスのレシピ',
    content: '卵: 2個\nご飯: 200g\nたまねぎ: 1/2個\nケチャップ: 少々',
    labelId: 3
  }
];

export { MEMO_DATA };
