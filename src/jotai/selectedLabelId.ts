import { atom } from 'jotai';

/**
 * 選択されたラベルのIDを保持するJotaiのatom
 */

// atomというのはreduxでいうstoreみたいなもの
const selectedLabelIdState = atom<number | undefined>(undefined);

export { selectedLabelIdState };
