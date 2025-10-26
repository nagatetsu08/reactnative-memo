import { execute } from '../database/dbService';
import { LabelQueries } from '../database/queries/labelQueries';

/**
 * labelsテーブルを作成する処理
 */
const createTable = async () => {
  await execute({ sql: LabelQueries.CREATE_TABLE });
};

/**
 *
 * @param name  ラベル名
 * @param color カラー名
 */
const addLabel = async (name: string, color: string) => {
  await execute({ sql: LabelQueries.INSERT, params: [name, color] });
};

export { createTable, addLabel };
