// メモ一覧画面
// メモ修正画面
import { StyleSheet, Text, View, Button, FlatList, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation, useFocusEffect } from 'expo-router';
import { useEffect, useState, useCallback} from 'react';
import Feather from '@expo/vector-icons/Feather';
import { MemoListItem } from '../../src/components/MemoListItem';
import { LabelTag } from '../../src/components/LabelTag';
import { LabelListModal } from '../../src/components/LabelListModal';

// Recoil
import { useRecoilValue } from 'recoil'; // Recoilへの値設定はやらずに、設定されている値を使うだけ
import { selectedLabelIdState } from '../../src/recoils/selectedLabelId';
import { type Label } from '../../src/types/label';
import { type Memo } from '../../src/types/memo';

import * as MemoService from '../../src/services/memoService';

// ダミーメモデータ
import { MEMO_DATA } from '../../src/dummy_data/memoData';

// ダミーLabelデータ
import { LABEL_DATA } from '../../src/dummy_data/labelData';

export default function MemoListScreen() {
  const router = useRouter();

  // ダイナミックルーティングであるPathパラメータ、クエリパラメータを受け取ることができる
  // 最新のreactnativeの場合、useLocalSearchParamsを使うのが一般的
  // ちなみにuseRouteというフックを使って以下のように撮ることもできる
  // import { useRoute } from '@react-navigation/native';
  // const { userId } = route.params as { userId: number };

  const navigation = useNavigation(); //今回は画面遷移をコントロールするのではなく、ナビゲーションバーをいじくるために必要
  const [isLabelListModalVisible, setIsLabelListModalVisible] = useState(false) //ラベルリストモーダルの表示状態を管理

  const selectLabelId = useRecoilValue(selectedLabelIdState);                 // 選択されているlabelId
  const selectedLabel = LABEL_DATA.find(label => label.id === selectLabelId)  // 選択されているlabelIdに紐づくオブジェクトを取得

  const [labels, setLabels] = useState<Label[]>([]);  // ラベルリスト
  const [memos, setMemos] = useState<Memo[]>([])      //メモリスト

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Feather name="edit" size={24} color="black" onPress={handleCreatePress}/>
      }
    })
  }, [])

  // useEffect(() => {
  //   // ラベルリストを設定する
  //   const labels = LABEL_DATA
  //   setLabels(labels)

  //   // 選択されたメモ（本来こういうのはaxios等でselectLabelIdを渡しつつバックエンドから必要なデータのみを抽出する。）
  //   // フロントエンドエンジニアにありがちな、データ持ってききてこっちでフィルタリングってのはパフォーマンス的にNG
  //   const fileterdMemos = selectLabelId ? MEMO_DATA.filter(memo => memo.labelId === selectLabelId) : MEMO_DATA
  //   setMemos(fileterdMemos)
  // }, [])

  const handleCreatePress = () => {
    router.push({pathname: "/memos/create"});
  }

  // 作成画面から戻ってきた時など、この画面にFoucusが当たるたびに以下の処理が実行される。
  useFocusEffect(
    useCallback(() => {
      let isActive = true; // フラグ管理
      const loadData = async(labelId: number | undefined) => {
        try {
          // ラベルリストを設定する
          const labels = LABEL_DATA

          // ここはまだ非同期処理手前だからやらなくてもいいけど、処理全体がasyncになってるので統一する意味ではやっといたほうがいい
          if (!isActive) return;
          setLabels(labels)

          // メモ一覧取得
          const memos = await MemoService.getMemos();

          // アンマウント済みなら以降の処理をすべてスキップ
          if (!isActive) return;

          const fileterdMemos = labelId ? memos.filter(memo => memo.labelId === labelId) : memos
          setMemos(fileterdMemos)

        } catch(error) {
          console.error('メモ取得エラー:', error); // ← デバッグ用のログ
          // エラー時も画面がアクティブな場合のみ表示
          if (!isActive) return
          Alert.alert("エラー", "データの取得に失敗しました", [{text: "ok", onPress: () => router.back()}])
        }

      }

      loadData(selectLabelId)
      return () => {
        console.log('画面がアンフォーカスされました');
        isActive = false;
      };
    }, [selectLabelId])
  )

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
          selectedLabel ? (
            <View style={{margin: 10}}>
              <LabelTag color={selectedLabel.color} name={selectedLabel.name} />
            </View>
          ) : (
            <></>
          )
        }
        contentContainerStyle={styles.flatList}
        data={memos}
        renderItem={({item}) => (
          <MemoListItem
            name={item.title}
            content={item.content}
            onPress={() => hadleMemoPress(item.id)}
            onLongPress={() => handleMemoLongPress(item.id)}
            onDeletePress={() => handleMemoDeletePress(item.id)}
            // ラベルはselectLabelIdが渡ってきたときは表示させない（画面上部にすでに出ているから）
            // selectLabelIdが渡ってきてないときは、すべてのメモを選択されたことになるので、各メモのタイルの最下部にラベルコンテンツを表示する
            label={selectLabelId ? undefined : LABEL_DATA.find(label => label.id === item.labelId)}
          />
        )}
        keyExtractor={item => item.id}
      />

      <LabelListModal
        visible={isLabelListModalVisible} // この変数はState変数として、useStateで管理している。この値が切り替わるたびに描画が再評価される感じ
        title="ラベル設定"
        data={labels}
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
