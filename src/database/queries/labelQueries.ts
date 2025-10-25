const CreateTableLabels = `
  CREATE TABLE IF NOT EXISTS labels
  (
    id          INTEGER   PRIMARY KEY AUTOINCREMENT,
    name        TEXT      NOT NULL,
    color       TEXT      NOT NULL,
    created_at  TEXT      DEFAULT(DATETIME('now', 'localtime')),
    updated_at  TEXT      DEFAULT(DATETIME('now', 'localtime'))
  );
`;

// freezeを使うことでオブジェクトを変更不可にしつつ、「LabelQueries.〜」の形で呼び出せるようにしている。
// いちいちSQL増えるたびにexport constに追加していくのはナンセンスだから
const LabelQueries = Object.freeze({
  CREATE_TABLE: CreateTableLabels
});

export { LabelQueries };
