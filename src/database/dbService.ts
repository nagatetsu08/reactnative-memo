import { SQLiteAnyDatabase } from './../../node_modules/expo-sqlite/build/NativeStatement.d';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

/**
 * SQL引数の型
 */
type SqlArg = {
  sql: string;
  params?: (string | number)[];
};

const DB_NAME = 'MemoAPP.db'; // DB名

// DBファイル保存先パス取得
const getDbFilePath = () => {
  const path = FileSystem.documentDirectory + 'SQLite' + '/' + DB_NAME;
  return path;
};

/**
 * データ取得関数
 * @param sqlArg
 *
 */

// ジェネリクスのTを設定しているのは、これを使っていろんな形の情報を取得する(例えばidしか取得しない、全件取得、特定のカラムだけ取得するなど)
const fetch = async <T>(sqlArg: SqlArg): Promise<T[]> => {
  // DBを開く
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  const { sql, params } = sqlArg; // 分割代入

  try {
    // SQL実行
    // sqlにはプレースホルダー付のSQL、paramsはそこに値を当てこむ用の値のみの配列のため、スプレッド構文で展開してやる
    const allRows = await db.getAllAsync<T>(sql, ...(params || []));
    return allRows;
  } catch (error) {
    console.error('SQLの実行に失敗しました', error);
    throw error;
  }
};

/**
 * 実行系SQL関数
 * @param sqlArgs SQL引数
 * @returns 処理結果
 *
 */

const execute = async <T>(...sqlArgs: SqlArg[]): Promise<void> => {
  // DBを開く
  const db = await SQLite.openDatabaseAsync(DB_NAME);

  // トランザクション
  await db.withTransactionAsync(async () => {
    for (const arg of sqlArgs) {
      const { sql, params } = arg; // 分割代入
      try {
        await db.runAsync(sql, ...(params || []));
      } catch (error) {
        console.error('SQLの実行に失敗しました', error);
        throw error;
      }
    }
  });
};

export { execute, fetch, getDbFilePath };
