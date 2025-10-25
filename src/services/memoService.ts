import { execute, fetch } from '../database/dbService';
import { MemoQueries } from '../database/queries/memoQueries';
import * as Crypto from 'expo-crypto';
import { type Memo } from '../types/memo';
import { MemoSchema } from '../database/schemas/memoSchema';

/**
 * labelsテーブルを作成する処理
 */
const createTable = async () => {
  await execute({ sql: MemoQueries.CREATE_TABLE });
};

/**
 * メモ全件取得
 * @returns
 */
const getMemos = async (): Promise<Memo[]> => {
  // メモを取得する
  const rows = await fetch<MemoSchema>({ sql: MemoQueries.SELECT_MEMOS });

  // メモ型に変換する
  const memos = rows.map((row): Memo => {
    return {
      id: row.id,
      title: row.title,
      content: row.content || '',
      labelId: row.label_id || undefined
    };
  });

  return memos;
};

/**
 * 指定IDのメモ取得
 * @param memoId // メモID
 * @returns
 */
const getMemo = async (memoId: string): Promise<Memo | undefined> => {
  // メモを取得する
  const rows = await fetch<MemoSchema>({ sql: MemoQueries.SELECT_MEMO_TARGET_ID, params: [memoId] });

  // メモが存在しない場合はundefiendを返す
  if (rows.length === 0) {
    return undefined;
  }
  // メモ型に変換する
  const row = rows[0];
  return {
    id: row.id,
    title: row.title,
    content: row.content || '',
    labelId: row.label_id || undefined
  };
};

/**
 * メモ追加
 *
 * @param title     // タイトル
 * @param content   // 内容
 */
const addMemo = async (title: string, content: string) => {
  const memoId = Crypto.randomUUID();
  await execute({ sql: MemoQueries.INSERT, params: [memoId, title, content] });
};

export { createTable, addMemo, getMemos, getMemo };
