// メモテーブル
const CreateTableMemos = `
  CREATE TABLE IF NOT EXISTS memos
  (
    id          TEXT,
    label_id    INTEGER,
    title       TEXT      NOT NULL,
    content     TEXT,
    created_at  TEXT      DEFAULT(DATETIME('now', 'localtime')),
    updated_at  TEXT      DEFAULT(DATETIME('now', 'localtime')),
    PRIMARY KEY(id),
    FOREIGN KEY(label_id) REFERENCES labels(id)
  );
`;

/**
 * 全てのメモを取得
 */
const SelectMemos = `
  SELECT
    m.id,
    m.label_id,
    m.title,
    m.content,
    m.created_at,
    m.updated_at,
    l.name,
    l.color
  FROM
    memos m
  LEFT JOIN
    labels l
  ON
    m.label_id = l.id
  ORDER BY
    m.updated_at DESC;
`;

/**
 * メモIDを指定したメモを取得
 * @param id メモID
 */
const SelectMemoByTargetId = `
  SELECT
    id,
    label_id,
    title,
    content,
    created_at,
    updated_at
  FROM
    memos
  WHERE
    id = ?
`;

/**
 * メモ追加
 * @param id        メモID
 * @param title     タイトル
 * @param content   内容
 * @param label_id  メモID
 */
const InsertMemo = `
  INSERT INTO memos (
    id,
    title,
    content,
    label_id
  ) VALUES (
    ?,
    ?,
    ?,
    ?
  )
`;

/**
 * メモ更新
 * @param title   タイトル
 * @param content 内容
 * @param id      メモID
 */
const UpdateMemo = `
  UPDATE
    memos
  SET
    title = ?,
    content = ?,
    updated_at = (DATETIME('now','localtime'))
  WHERE
    id = ?
`;

/**
 * メモ削除
 * @param id メモID
 */
const DeleteMemo = `
  DELETE FROM
    memos
  WHERE
    id = ?
`;

/**
 * ラベル削除時に削除されたラベルに紐づくラベルのIDをNULLに更新
 * @param label_id ラベルID
 *
 */

const UpdateTargetLabelIdToNull = `
  UPDATE
    memos
  SET
    label_id = NULL,
    updated_at = (DATETIME('now','localtime'))
  WHERE
    label_id = ?
`;

/**
 * メモのラベル更新
 * @param labelId ラベルID
 * @param id メモID
 */
const UpdateMemoLabelIdById = `
  UPDATE
    memos
  SET
    label_id = ?,
    updated_at = (DATETIME('now','localtime'))
  WHERE
    id = ?
`;

/**
 * メモのラベルIDをNULLに更新
 * @param id メモID
 */
const UpdateMemoLabelIdToNullById = `
  UPDATE
    memos
  SET
    label_id = NULL,
    updated_at = (DATETIME('now','localtime'))
  WHERE
    id = ?
`;

// freezeを使うことでオブジェクトを変更不可にしつつ、「LabelQueries.〜」の形で呼び出せるようにしている。
// いちいちSQL増えるたびにexport constに追加していくのはナンセンスだから
const MemoQueries = Object.freeze({
  CREATE_TABLE: CreateTableMemos,
  INSERT: InsertMemo,
  SELECT_MEMOS: SelectMemos,
  SELECT_MEMO_TARGET_ID: SelectMemoByTargetId,
  UPDATE: UpdateMemo,
  DELETE: DeleteMemo,
  UPDATE_TARGET_LABELID_TO_NULL: UpdateTargetLabelIdToNull,
  UPDATE_LABEL_ID_BY_ID: UpdateMemoLabelIdById,
  UPDATE_LABEL_ID_TO_NULL_BY_ID: UpdateMemoLabelIdToNullById
});

export { MemoQueries };
