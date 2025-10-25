// メモ作成画面
import { StyleSheet, Text, View, Button } from 'react-native';
import { useRouter, useNavigation} from 'expo-router';
import { useEffect,useState } from 'react';
import { MemoInputForm } from '../../src/components/MemoInputForm';
import { KeyboardAvoidingView } from '@gluestack-ui/themed';

// Recoil
import { useRecoilValue } from 'recoil'; // Recoilへの値設定はやらずに、設定されている値を使うだけ
import { selectedLabelIdState } from '../../src/recoils/selectedLabelId';

export default function MemoCreateScreen() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("")      // タイトル
  const [content, setContent] = useState<string>("")  // コンテンツ

  const selectLabelId = useRecoilValue(selectedLabelIdState);                 // 選択されているlabelId

  /**
   * 作成が押下されたときの処理
   */
  const handleCreatePress = () => {
    // memo画面はモーダルで開かず、Stackによる画面遷移になる。
    // 1画面前なのでroute.backでもrouter.popどちらでもOK
    // 複数前の画面に戻りたいときはrouter.pop(3)のようにpopを使って戻る
    router.back();
  }

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="作成" onPress={handleCreatePress}
      />
      }
    })
  }, [])

  return (
    // KeyboardAvoidingViewはスマホでキーボードを出す際に下部の方に入力した値がキーボードで隠れないように
    // キーボード表示時に画面下部の内容をキーボードより上に押し上げてくれる機能
    <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <MemoInputForm
        title={title}
        content={content}
        onContentChange={setContent}
        onTitleChange={setTitle}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  }
});
