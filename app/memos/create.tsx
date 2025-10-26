// メモ作成画面
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useRouter, useNavigation} from 'expo-router';
import { useEffect,useState } from 'react';
import { MemoInputForm } from '../../src/components/MemoInputForm';
import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { Indicator } from '../../src/components/Indicator';

// Recoil
import { useRecoilValue } from 'recoil'; // Recoilへの値設定はやらずに、設定されている値を使うだけ
import { selectedLabelIdState } from '../../src/recoils/selectedLabelId';

import * as MemoService from '../../src/services/memoService'

export default function MemoCreateScreen() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("")              // タイトル
  const [content, setContent] = useState<string>("")          // コンテンツ
  const [isLoading, setIsLoading] = useState<boolean>(false)  // インジケータの表示状態

  const selectLabelId = useRecoilValue(selectedLabelIdState);                 // 選択されているlabelId

  /**
   * 作成が押下されたときの処理
   * titleとかcontentはState変数で管理しているので、引数で渡さなくていい
   */
  const handleCreatePress = async() => {

    // バリデーション
    if (!title) {
      Alert.alert("確認", "タイトルを設定してください")
      return
    }

    setIsLoading(true);

    try {
      // メモを追加する
      await MemoService.addMemo(selectLabelId ?? undefined, title, content)

      // memo画面はモーダルで開かず、Stackによる画面遷移になる。
      // 1画面前なのでroute.backでもrouter.popどちらでもOK
      // 複数前の画面に戻りたいときはrouter.pop(3)のようにpopを使って戻る
      router.back();
    } catch(error) {
      Alert.alert("エラー", "メモの追加に失敗しました")
    } finally {
      setIsLoading(false);
    }
  }

  const navigation = useNavigation();


  // titleとcontentの変更が入るたびに
  // nativeのナビゲーションに手を加えて、onPressを設定しているため、こうしないといけない
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="作成" onPress={handleCreatePress}
      />
      }
    })
  }, [title, content])

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
      <Indicator visible={isLoading} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  }
});
