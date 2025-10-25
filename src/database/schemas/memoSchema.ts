// Memoスキーマの型
type MemoSchema = {
  id: string; // メモID
  title: string; // タイトル
  content: string | null; // コンテンツ
  label_id: number | null; // ラベルID
  created_at: string; //作成日時
  updated_at: string; //更新日時
};

export type { MemoSchema };
