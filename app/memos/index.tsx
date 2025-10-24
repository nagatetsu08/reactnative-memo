// メモ一覧画面
// メモ修正画面
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { MemoListItem } from '../../src/components/MemoListItem';
import { LabelTag } from '../../src/components/LabelTag';
import { LabelListModal } from '../../src/components/LabelListModal';

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

// ダミーデータ
const LABEL_DATA = [
  {
    id: 1,
    name: 'プログラミング',
    color: 'blue'
  },
    {
    id: 2,
    name: 'パスワード',
    color: 'green'
  },
    {
    id: 3,
    name: '料理',
    color: 'orange'
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
  const [isLabelListModalVisible, setIsLabelListModalVisible] = useState(false) //ラベルリストモーダルの表示状態を管理


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
    setIsLabelListModalVisible(true)
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

  /**
   * labelが押下されたときの処理
   * @param labelId // ラベルID
   *
   */
  const handleLabelPress = (labelId?: number) => {
    console.log("ラベルが押されました")
    setIsLabelListModalVisible(false)
  }

  /**
   * ModalがClosesされたときの処理
   * @param labelId // ラベルID
   *
   */
  const handleLabelListModalClose = () => {
    setIsLabelListModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          labelId ? (
            <View style={{margin: 10}}>
              <LabelTag color="blue" name={`ラベルID: ${labelId}`} />
            </View>
          ) : (
            <></>
          )
        }
        contentContainerStyle={styles.flatList}
        data={memoData}
        renderItem={({item}) => (
          <MemoListItem
            name={item.name}
            content={item.contents}
            onPress={() => hadleMemoPress(item.id)}
            onLongPress={() => handleMemoLongPress(item.id)}
            onDeletePress={() => handleMemoDeletePress(item.id)}
            label={item.label}
          />
        )}
        keyExtractor={item => item.id}
      />

      <LabelListModal
        visible={isLabelListModalVisible} // この変数はState変数として、useStateで管理している。この値が切り替わるたびに描画が再評価される感じ
        title="ラベル設定"
        data={LABEL_DATA}
        onPress={handleLabelPress}
        onClose={handleLabelListModalClose}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  flatList: {
    paddingBottom: 100
  }
});
