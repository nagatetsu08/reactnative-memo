// メモ一覧画面
// メモ修正画面
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { MemoListItem } from '../../src/components/memoListItem';


// ダミーメモデータ
const memoData = [
  {
    id: "abcd",
    name: "useStateについて",
    contents: "useStateの説明",
    label: {name: "プログラミング", color: "blue"}
  },
  {
    id: "efgh",
    name: "アカウント",
    contents: "メールアドレス： 123@example.com/nパスワード：password",
  },
  {
    id: "ijkl",
    name: "オムライスのレシピ",
    contents: "卵: 2個/nご飯: 200g/nたまねぎ: 1/2個/nケチャップ: 少々",
  },
]


export default function MemoListScreen() {
  const router = useRouter();

  // ダイナミックルーティングであるPathパラメータ、クエリパラメータを受け取ることができる
  // 最新のreactnativeの場合、useLocalSearchParamsを使うのが一般的
  // ちなみにuseRouteというフックを使って以下のように撮ることもできる
  // import { useRoute } from '@react-navigation/native';
  // const { userId } = route.params as { userId: number };

  const { labelId } = useLocalSearchParams();

  const navigation = useNavigation(); //今回は画面遷移をコントロールするのではなく、ナビゲーションバーをいじくるために必要

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Feather name="edit" size={24} color="black" onPress={handleCreatePress}/>
      }
    })
  }, [])

  const handleCreatePress = () => {
    router.push({pathname: "/memos/create"});
  }

  /**
   * メモがタップされたときの処理
   * @param memoId
   */
  const hadleMemoPress = (memoId: string) => {
    router.push({pathname: `/memos/${memoId}`})
  }

  /**
   * メモが長押しされたときの処理
   * @param memoId // メモID
   */
  const handleMemoLongPress = (memoId: string) => {
    console.log("メモが長押しされました")
  }

  /**
   * メモ削除が押下されたときの処理
   * @param memoId // メモID
   *
   */
  const handleMemoDeletePress = (memoId: string) => {
    console.log("メモが削除されました")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{labelId ? `ラベルID: ${labelId}` : "すべてのメモ"}</Text>

      <FlatList
        contentContainerStyle={styles.flatList}
        data={memoData}
        renderItem={({item}) => (
          <MemoListItem
            name={item.name}
            content={item.contents}
            onPress={() => hadleMemoPress(item.id)}
            onLongPress={() => handleMemoLongPress(item.id)}
            onDeletePress={() => handleMemoDeletePress(item.id)}
            label={undefined}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  flatList: {
    paddingBottom: 100
  }
});
