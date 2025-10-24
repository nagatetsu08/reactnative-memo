// ラベル作成画面
import { StyleSheet, Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function LabelCreateScreen() {
  const router = useRouter();

  // 作成ボタンを押下したらデータを保存して、画面自体は閉じる。
  // この画面はModalで開くので、dismiss()で閉じることが可能
  const handleCreatePress = () => {
    router.dismiss();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ラベル作成</Text>
      <Button
        title="作成"
        onPress={handleCreatePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
