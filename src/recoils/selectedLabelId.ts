import { atom } from 'recoil';

/**
 * 選択されたラベルのIDを保持するRecoil
 */

// atomというのはreduxでいうstoreみたいなもの
const selectedLabelIdState = atom<number | undefined>({
  key: 'selectedLabelIdState',
  default: undefined
});

export { selectedLabelIdState };
