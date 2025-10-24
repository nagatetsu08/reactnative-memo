// メモ修正画面
import { StyleSheet, Text, View, Button } from 'react-native';
import { useRouter, useLocalSearchParams,useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { MemoInputForm } from '../../src/components/MemoInputForm';
import { KeyboardAvoidingView } from '@gluestack-ui/themed';

export default function MemoEditScreen() {
  const router = useRouter();

  // ダイナミックルーティングであるPathパラメータ、クエリパラメータを受け取ることができる
  // 最新のreactnativeの場合、useLocalSearchParamsを使うのが一般的
  // ちなみにuseRouteというフックを使って以下のように撮ることもできる
  // import { useRoute } from '@react-navigation/native';
  // const { userId } = route.params as { userId: number };

  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState<string>("")      // タイトル
  const [content, setContent] = useState<string>("")  // コンテンツ

  // 作成ボタンを押下したらデータを保存して、画面自体は閉じる。
  // この画面はModalで開くので、dismiss()で閉じることが可能
  const handleSavePress = () => {
    router.back();
  }

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="保存" onPress={handleSavePress} />
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
  },
});
