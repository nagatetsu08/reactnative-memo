// メモ修正画面
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useRouter, useLocalSearchParams,useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { MemoInputForm } from '../../src/components/MemoInputForm';
import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { Indicator } from '../../src/components/Indicator';

// ダミーメモデータ
import * as MemoService from "../../src/services/memoService"


export default function MemoEditScreen() {
  const router = useRouter();

  // ダイナミックルーティングであるPathパラメータ、クエリパラメータを受け取ることができる
  // 最新のreactnativeの場合、useLocalSearchParamsを使うのが一般的
  // ちなみにuseRouteというフックを使って以下のように撮ることもできる
  // import { useRoute } from '@react-navigation/native';
  // const { userId } = route.params as { userId: number };

  // useLocalSearchParamsはstringかstring配列を返すので、型が厳格していされている（stringしかだめ）場合、
  // エラーになるので、ここでstring型として型アサーションする。
  const { id } = useLocalSearchParams() as {id: string};

  const [title, setTitle] = useState<string>("")      // タイトル
  const [content, setContent] = useState<string>("")  // コンテンツ
  const [isLoading, setIsLoading] = useState<boolean>(false)  // インジケータの表示状態

  // 作成ボタンを押下したらデータを保存して、画面自体は閉じる。
  // この画面はModalで開くので、dismiss()で閉じることが可能
  const handleSavePress = async() => {
    // バリデーション
    if (!title) {
      Alert.alert("確認", "タイトルを設定してください")
      return
    }

    setIsLoading(true);

    try {
      // メモを追加する
      await MemoService.editMemo(id, title, content)

      // memo画面はモーダルで開かず、Stackによる画面遷移になる。
      // 1画面前なのでroute.backでもrouter.popどちらでもOK
      // 複数前の画面に戻りたいときはrouter.pop(3)のようにpopを使って戻る
      router.back();
    } catch(error) {
      Alert.alert("エラー", "メモの保存に失敗しました")
    } finally {
      setIsLoading(false);
    }
    router.back();
  }

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="保存" onPress={handleSavePress} />
      }
    })
  }, [title, content])

  // useEffectの中で使う変数は全て監視対象にするのがセオリー（定数は監視しなくていい）
  useEffect(() => {

    // この画面にきてすぐ前の画面に戻るといったように、非同期が終わる前にこの画面のフォーカスが外れる（unmountになる）と
    // その後に実行されるsetStateが何にも使われない上にメモリリークの原因となる。
    // 従って、非同期処理直後のチェックと最後にクリーンアップ関数でisMountedフラグをオフにしてやる処理を実装する必要がある。
    // Udemy動画のやり方はエラーにはならないがいけてないらしいのでこっちのやり方にする。
    let isMounted = true;

    const loadData = async (memoId: string) => {
      try {
        // 選択されたメモ情報を取得
        const memo = await MemoService.getMemo(memoId);

        // アンマウント済みなら以降の処理をすべてスキップ
        if (!isMounted) return;

        //メモが存在しない場合はエラーを表示して戻る
        if(!memo) {
          Alert.alert("エラー", "メモが見つかりませんでした", [{text: "OK", onPress: () => router.back()}])
          return;
        }

        // メモのタイトルと内容をセット
        setTitle(memo.title)
        setContent(memo.content)
      }catch(error) {
        if (!isMounted) return;
        Alert.alert("エラー", "データの取得に失敗しました", [{text: "OK", onPress: () => router.back()}])
        return;
      }
    }

    loadData(id)

    return () => {
      isMounted = false;
    }
  },[id])

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
  },
});
