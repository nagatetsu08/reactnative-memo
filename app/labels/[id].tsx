// ラベル修正画面
import { StyleSheet, Text, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Input, InputField, VStack, Button, ButtonText } from '@gluestack-ui/themed';
import { useState } from 'react';
import { ColorPicker } from '../../src/components/ColorPicker';


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

  // 作成ボタンを押下したらデータを保存して、画面自体は閉じる。
  // この画面はModalで開くので、dismiss()で閉じることが可能
  const handleEditPress = () => {
    router.dismiss();
  }

  // 削除押下時の処理
  const handleDeletePress = () => {
    router.dismiss();
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
          <InputField paddingLeft={"$2"} placeholder='ラベル名' onChangeText={setLabelName}/>
        </Input>

        {/* カラーピッカー */}
        <ColorPicker onPress={() => handleColorPress(color)} />

        <VStack space="md">
          <Button size="md" action="primary" marginHorizontal={"$4"} onPress={handleEditPress}>
            <ButtonText>修正</ButtonText>
          </Button>
          <Button size="md" action="negative" marginHorizontal={"$4"} onPress={handleDeletePress}>
            <ButtonText>削除</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
});
