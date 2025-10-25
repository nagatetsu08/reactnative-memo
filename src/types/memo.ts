// Memoデータの型
type Memo = {
  id: string; // メモID
  title: string; // タイトル
  content: string; // コンテンツ
  labelId: number | undefined; // ラベルID
};

export type { Memo };
