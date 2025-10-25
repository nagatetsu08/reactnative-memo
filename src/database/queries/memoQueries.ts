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

// freezeを使うことでオブジェクトを変更不可にしつつ、「LabelQueries.〜」の形で呼び出せるようにしている。
// いちいちSQL増えるたびにexport constに追加していくのはナンセンスだから
const MemoQueries = Object.freeze({
  CREATE_TABLE: CreateTableMemos
});

export { MemoQueries };
