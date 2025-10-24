import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { LabelListItem } from '../../src/components/LabelListItem';
import { ListItem } from '@rneui/themed';

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

/**
 * ホーム画面
 *
 */

export default function HomeScreen() {

  const router = useRouter();
  const navigation = useNavigation(); //今回は画面遷移をコントロールするのではなく、ナビゲーションバーをいじくるために必要

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <MaterialIcons name="new-label" size={24} color="black" onPress={handleAddLabelPress}/>
      }
    })
  }, [])

  /**
   * 全てのメモタップ時の処理
   *
   */

  const handleAllMemoPress = () => {
    router.push({pathname: "/memos"})
  }

/**
 *
 * ラベル押下時の処理
 * @param labelId ラベルID
 *
 */

  const handleLabelPress = (labelId: number) => {
    const params = {labelId: labelId}
    router.push({pathname: "/memos", params: params})
  }


  /**
   * ラベル追加処理
   *
   */
  const handleAddLabelPress = () => {
    router.push({pathname: "/labels/create"})
  }

  /**
   * ラベル修正押下時の処理
   *
   * @param labelId ラベルID
   *
   */

  const handleEditLabelPress = (labelId: number) => {
    // labelIdはパスパラメータで渡ってくる。
    // バッククォートで変数展開ができる
    router.push({pathname: `/labels/${labelId}`})
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* 全てのメモ */}
        {/* <ListItem.Chevron />は、">"みたいなアイコンのこと */}
        <ListItem bottomDivider onPress={handleAllMemoPress}>
          <ListItem.Content>
            <ListItem.Title>すべてのメモ</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <Text style={styles.sectionText}>ラベル</Text>

        {LABEL_DATA.map(item => (
          <LabelListItem
            key={item.id}
            color={item.color}
            name={item.name}
            onPress={() => handleLabelPress(item.id)}
            onEditPress={() => handleEditLabelPress(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  sectionText: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 14,
    fontSize: 14,
    color: '#707070'
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  scrollView: {
    paddingVertical: 40
  }
});
