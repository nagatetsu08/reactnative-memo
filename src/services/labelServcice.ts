import { execute, fetch } from '../database/dbService';
import { LabelQueries } from '../database/queries/labelQueries';
import { type Label } from '../../src/types/label';
import { type LabelSchema } from '../database/schemas/labelSchema';
import { MemoQueries } from '../database/queries/memoQueries';

/**
 * labelsテーブルを作成する処理
 */
const createTable = async () => {
  await execute({ sql: LabelQueries.CREATE_TABLE });
};

/**
 * ラベル一覧取得
 * @returns ラベル一覧
 *
 */
const getLabels = async (): Promise<Label[]> => {
  const rows = await fetch<LabelSchema>({ sql: LabelQueries.SELECT_LABELS });

  const labels = rows.map((row): Label => {
    return {
      id: row.id,
      name: row.name,
      color: row.color
    };
  });
  return labels;
};

/**
 * 指定されたIDのラベル取得
 *
 * @params labelId ラベルID
 * @returns ラベル情報
 *
 */
const getLabel = async (labelId: number): Promise<Label | undefined> => {
  const rows = await fetch<LabelSchema>({ sql: LabelQueries.SELECT_LABEL_TARGET_ID, params: [labelId] });

  // ラベルが存在しな場合は、undifiendで返す
  if (rows.length === 0) {
  }
  const row = rows[0];

  return {
    id: row.id,
    name: row.name,
    color: row.color
  };
};

/**
 * ラベル追加処理
 * @param name  ラベル名
 * @param color カラー名
 */
const addLabel = async (name: string, color: string) => {
  await execute({ sql: LabelQueries.INSERT, params: [name, color] });
};

/**
 * ラベル更新
 *
 * @param id
 * @param name
 * @param color
 */
const updateLabel = async (id: number, name: string, color: string) => {
  await execute({ sql: LabelQueries.UPDATE, params: [name, color, id] });
};

/**
 * ラベル削除処理
 *
 * @param id
 */
const deleteLabel = async (id: number) => {
  // executeで複数のクエリを引数として受けられるようにしたのはこのため。excute内でトランザクションを張って複数SQLを実行して、トランザクションを終了させられるようにした
  await execute({ sql: LabelQueries.DELETE, params: [id] }, { sql: MemoQueries.UPDATE_TARGET_LABELID_TO_NULL, params: [id] });
};

export { createTable, addLabel, getLabels, getLabel, updateLabel, deleteLabel };
