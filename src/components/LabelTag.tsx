import { StyleSheet, Text, View} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

// ラベルタグのプロパティ
type labelTagProps = {
  color: string,  //ラベルの色
  name: string    // ラベル名
}

/**
 * ラベルタグ
 *
 * @param props
 * @returns　ラベルタグコンポーネント
 */

const LabelTag = (props: labelTagProps) => {
  const {color, name} = props

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name='label'
        size={24}
        color={color}
      />
      <Text style={styles.tagText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2
  },
  tagText: {
    marginLeft: 5
  }
})

export {LabelTag}
