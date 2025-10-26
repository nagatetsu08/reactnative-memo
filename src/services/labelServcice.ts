import { execute, fetch } from '../database/dbService';
import { LabelQueries } from '../database/queries/labelQueries';
import { type Label } from '../../src/types/label';
import { type LabelSchema } from '../database/schemas/labelSchema';

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
 * ラベル追加処理
 * @param name  ラベル名
 * @param color カラー名
 */
const addLabel = async (name: string, color: string) => {
  await execute({ sql: LabelQueries.INSERT, params: [name, color] });
};

export { createTable, addLabel, getLabels };
