import { StyleSheet, Text, View, Button } from 'react-native';
import { ListItem } from '@rneui/themed';
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons'

// propsの型を定義
type labelListItemProps = {
  color: string;            // ラベルの色
  name: string;             // ラベルの名前
  onPress: () => void       // ラベルが押下された時に実行したい関数（戻り値なし）
  onEditPress: () => void   // 修正アイコンが押された時に実行したい関数（戻り値なし）
}

// react18以降はReact.FCはない方がいい。暗黙的なchildrenの付与など副作用があるらしく。
// 公式もあまりお勧めしていない。
// const LabelListItem: React.FC<labelListItemProps> = props => {

/**
 * ラベルリストアイテム
 *
 * @param props
 * @returns ラベルリストアイテム
 */
const LabelListItem = (props: labelListItemProps) => {
  const {color, name, onPress, onEditPress} = props

  return (
    <View style={styles.container}>
      <ListItem style={styles.listItem} bottomDivider onPress={onPress}>

        {/* ラベルアイコン */}
        <MaterialCommunityIcons
          name="label"
          color={color}
          size={26}
          style={styles.labelIcon}
        />

        {/* ラベル名 */}
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{name}</ListItem.Title>
        </ListItem.Content>

        {/* 修正アイコン */}
        <Foundation
          name='pencil'
          color='#818181'
          size={26}
          style={styles.editIcon}
          onPress={onEditPress}
        />
      </ListItem>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelIcon: {
    marginLeft: 10
  },
  listItem: {
    flex: 1 // 横幅いっぱいにリストアイテムが広がる
  },
  title: {
    fontSize: 18
  },
  editIcon: {
    marginRight: 12
  }
})

export {LabelListItem}
