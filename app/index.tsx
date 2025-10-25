import { StyleSheet, Text, View, Alert } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as LabelService from "../src/services/labelServcice"
import * as MemoService from "../src/services/memoService"
import { getDbFilePath } from '../src/database/dbService';


/**
 * アプリ起動時の画面
 *
 */

export default function InitialScreen() {
  const router = useRouter();
  useEffect(() => {
    initApp()
  }, [router]);

  // アプリ起動時初期化処理
  const initApp = async  () => {
    try {
      // テーブル作成処理
      await LabelService.createTable();
      await MemoService.createTable();

      console.log(getDbFilePath());

      // 上記2つの処理に成功したら、ホーム画面に遷移する
      router.replace('/home');
    }catch(error) {
      console.log('アプリの起動に失敗しました', error)
      Alert.alert('エラー', 'アプリの起動に失敗しました', [{
        text: "再起動",
        onPress: initApp
      }])
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>アプリ起動中!!...</Text>
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
