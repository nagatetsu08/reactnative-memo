// メモ作成画面
import { StyleSheet, Text, View, Button } from 'react-native';
import { useRouter, useNavigation} from 'expo-router';
import { useEffect } from 'react';

export default function MemoCreateScreen() {
  const router = useRouter();

  // memo画面はモーダルで開かず、Stackによる画面遷移になる。
  // 1画面前なのでroute.backでもrouter.popどちらでもOK
  // 複数前の画面に戻りたいときはrouter.pop(3)のようにpopを使って戻る
  const handleCreatePress = () => {
    router.back();
  }

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="作成" onPress={handleCreatePress}
      />
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>メモ作成</Text>
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
