// ラベル修正画面
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Input, InputField, VStack, Button, ButtonText } from '@gluestack-ui/themed';
import { useState, useEffect } from 'react';
import { ColorPicker } from '../../src/components/ColorPicker';
import * as LabelService from '../../src/services/labelServcice'
import { Indicator } from '../../src/components/Indicator';


export default function LabelEditScreen() {
  const router = useRouter();

  // ダイナミックルーティングであるPathパラメータ、クエリパラメータを受け取ることができる
  // 最新のreactnativeの場合、useLocalSearchParamsを使うのが一般的
  // ちなみにuseRouteというフックを使って以下のように撮ることもできる
  // import { useRoute } from '@react-navigation/native';
  // const { userId } = route.params as { userId: number };

  const { id } = useLocalSearchParams();
  const [labelName, setLabelName] = useState<string>("") // ラベル名
  const [color, setColor] = useState<string | undefined>(undefined) // カラー
  const [isLoading, setIsLoading] = useState<boolean>(false)  // インジケータの表示状態


  // useFoucusEffectでもいい気がするが、index画面と違って、初期表示の際だけロードすればOK（更新後/作成後の戻った際にも更新という副作用はいらない）なので
  // useEffectでいい。
  useEffect(() =>{
    let isActive = true; // フラグ管理
    const loadData = async (labelId: number) => {
      try {
        // ラベル取得処理
        const label = await LabelService.getLabel(labelId)

        // アンマウント済みなら以降の処理をすべてスキップ
        // アンマウントの状態でsetState関数を実行すると、使用されないだけでなく、無駄にメモリを確保してしまい、メモリリークの原因となる
        if (!isActive) return;

        if(!label) {
          Alert.alert("エラー", "ラベルが見つかりません", [{text: "ok", onPress: () => router.back()}])
          return;
        }

        setLabelName(label.name)
        setColor(label.color)

      } catch(error) {
        // アンマウント済みなら以降の処理をすべてスキップ
        // アンマウント状態でアラート処理が行われると、関係ない画面で関係ないアラートが表示されたり、不要な参照が残ったりするのでこのチェックは必要
        if (!isActive) return;
        Alert.alert("エラー", "データの取得に失敗しました", [{text: "ok", onPress: () => router.back()}])
      }
    }

    const labelId = Number(id)
    loadData(labelId);

    // 以下はクリア関数。このように定義することで、アンマウント時に
    // 自動で以下関数を実行してくれる。
    return () => {
      isActive = false;
    };
  }, [id])


  // 作成ボタンを押下したらデータを保存して、画面自体は閉じる。
  // この画面はModalで開くので、dismiss()で閉じることが可能
  const handleEditPress = async() => {

    // バリデーション
    if (!labelName) {
      Alert.alert("確認", "ラベル名を入力してください")
      return;
    }

    if (!color) {
      Alert.alert("確認", "カラーを入力してください")
      return;
    }

    setIsLoading(true);

    try {
      // ラベル追加処理
      await LabelService.updateLabel(Number(id), labelName, color)

    // 作成ボタンを押下したらデータを保存して、画面自体は閉じる。
    // この画面はModalで開くので、dismiss()で閉じることが可能
    router.dismiss();

    } catch(error) {
      Alert.alert("エラー", "ラベル作成に失敗しました");
    } finally {
      setIsLoading(false);
    }
    router.dismiss();
  }

  // 削除押下時の処理
  const handleDeletePress = async() => {

    // 一旦関数化するのは、confirmでOKを押下してから処理を実行したいから。
    const deleteLabel = async () => {

      setIsLoading(true);

      try {
        // ラベル追加処理
        await LabelService.deleteLabel(Number(id))

        // 作成ボタンを押下したらデータを保存して、画面自体は閉じる。
        // この画面はModalで開くので、dismiss()で閉じることが可能
        router.dismiss();

      } catch(error) {
        Alert.alert("エラー", "ラベル削除に失敗しました");
      } finally {
        setIsLoading(false);
      }
    }

    Alert.alert("確認", "ラベルを削除しますか？", [
      // キャンセル時は特に何もしない（閉じるだけ）
      {text: "キャンセル", onPress: () =>{}},
      {text: "削除", onPress: deleteLabel }
    ])
  }

  /**
   * カラーピッカーで色が選択された際の処理
   * @param color
   *
   */
  const handleColorPress = (color: string) => {
    setColor(color)
  }



  return (
    <View style={styles.container}>
      <VStack space="lg">

        {/* ラベル名入力エリア */}
        <Input variant="underlined" size="md" backgroundColor="$white" borderColor="$warmGray300">
          <InputField defaultValue={labelName} paddingLeft={"$2"} placeholder='ラベル名' onChangeText={setLabelName}/>
        </Input>

        {/* カラーピッカー */}
        <ColorPicker onPress={handleColorPress} defaultColor={color} />

        <VStack space="md">
          <Button size="md" action="primary" marginHorizontal={"$4"} onPress={handleEditPress}>
            <ButtonText>修正</ButtonText>
          </Button>
          <Button size="md" action="negative" marginHorizontal={"$4"} onPress={handleDeletePress}>
            <ButtonText>削除</ButtonText>
          </Button>
        </VStack>
      </VStack>
      <Indicator visible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
});
