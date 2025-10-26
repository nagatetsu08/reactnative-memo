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

/**
 * メモ修正
 * @param memoId
 * @param title
 * @param content
 */
const editMemo = async (memoId: string, title: string, content: string) => {
  await execute({ sql: MemoQueries.UPDATE, params: [title, content, memoId] });
};

/**
 * メモ削除
 * @param memoId
 */
const deleteMemo = async (memoId: string) => {
  await execute({ sql: MemoQueries.DELETE, params: [memoId] });
};

/**
 * メモにラベルを設定する
 *
 * @param memoId
 * @param labelId (undefinedの場合はラベルを削除する)
 */
const setLabel = async (memoId: string, labelId: number | undefined) => {
  // ラベルを解除する時の処理
  if (labelId === undefined) {
    await execute({ sql: MemoQueries.UPDATE_LABEL_ID_TO_NULL_BY_ID, params: [memoId] });
    return;
  }

  // メモにラベルを設定する
  await execute({ sql: MemoQueries.UPDATE_LABEL_ID_BY_ID, params: [labelId, memoId] });
};

export { createTable, addMemo, getMemos, getMemo, editMemo, deleteMemo, setLabel };
