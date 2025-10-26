// ラベル作成画面
import { StyleSheet, Text, View, Alert} from 'react-native';
import { useRouter} from 'expo-router';
import { Input, InputField, VStack, Button, ButtonText } from '@gluestack-ui/themed';
import { useState } from 'react';
import { ColorPicker } from '../../src/components/ColorPicker';
import * as LabelService from '../../src/services/labelServcice'
import { Indicator } from '../../src/components/Indicator';

export default function LabelCreateScreen() {
  const router = useRouter();

  const [labelName, setLabelName] = useState<string>("")            // ラベル名
  const [color, setColor] = useState<string | undefined>(undefined) // カラー
  const [isLoading, setIsLoading] = useState<boolean>(false)  // インジケータの表示状態

  const handleCreatePress = async() => {

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
      await LabelService.addLabel(labelName, color)

    // 作成ボタンを押下したらデータを保存して、画面自体は閉じる。
    // この画面はModalで開くので、dismiss()で閉じることが可能
    router.dismiss();

    } catch(error) {
      Alert.alert("エラー", "ラベル作成に失敗しました");
    } finally {
      setIsLoading(false);
    }
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
      {/* Vstackはコンポーネントをまとめて管理できるもの。（コンポーネントごとに一定間隔余白を与えたいときなど便利） */}
      <VStack space="lg">
        {/* ラベル名入力エリア */}
        <Input variant="underlined" size="md" backgroundColor="$white" borderColor="$warmGray300">
          <InputField paddingLeft={"$2"} placeholder='ラベル名' onChangeText={setLabelName}/>
        </Input>

        {/* カラーピッカー */}
        <ColorPicker onPress={handleColorPress} />

        {/* actionはボタンの色 */}
        <Button size="md" action="primary" marginHorizontal={"$4"} onPress={handleCreatePress}>
          <ButtonText>作成</ButtonText>
        </Button>
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
