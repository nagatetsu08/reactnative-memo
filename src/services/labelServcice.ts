import { execute } from '../database/dbService';
import { LabelQueries } from '../database/queries/labelQueries';

/**
 * labelsテーブルを作成する処理
 */
const createTable = async () => {
  await execute({ sql: LabelQueries.CREATE_TABLE });
};

export { createTable };
