import { execute } from '../database/dbService';
import { MemoQueries } from '../database/queries/memoQueries';

/**
 * labelsテーブルを作成する処理
 */
const createTable = async () => {
  await execute({ sql: MemoQueries.CREATE_TABLE });
};

export { createTable };
