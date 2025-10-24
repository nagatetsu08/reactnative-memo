// メモ修正画面
import { StyleSheet, Text, View, Button } from 'react-native';
import { useRouter, useLocalSearchParams,useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function MemoEditScreen() {
  const router = useRouter();

  // ダイナミックルーティングであるPathパラメータ、クエリパラメータを受け取ることができる
  // 最新のreactnativeの場合、useLocalSearchParamsを使うのが一般的
  // ちなみにuseRouteというフックを使って以下のように撮ることもできる
  // import { useRoute } from '@react-navigation/native';
  // const { userId } = route.params as { userId: number };

  const { id } = useLocalSearchParams();

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
    <View style={styles.container}>
      <Text style={styles.title}>メモ修正: {id}</Text>
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
