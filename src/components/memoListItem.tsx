import { ListItem, Button } from "@rneui/themed";
import { StyleSheet } from "react-native";

type MemoListItemProps = {
  name: string,               // メモタイトル
  content: string,            // メモ内容
  onPress: () => void;        // タップ時の処理
  onLongPress?: () => void;   // 長押し時の処理（複数の画面で利用するが、設定しない画面も存在するのでオプショナル）
  onDeletePress?: () => void;
  label?: {
    color: string,
    name: string
  }
}

/**
 * メモリストアイテム
 *
 * @param props プロパティ
 * @returns メモリストアイテム
 */
const MemoListItem = (props: MemoListItemProps) => {
  const {name, content, onPress, onLongPress, onDeletePress, label} = props
  return (
    <ListItem.Swipeable
      bottomDivider
      rightContent={reset => (
        <Button
          title="削除"
          onPress={() => {
            // 外部からonPressの関数が割ったって来ていたら、それを実行
            if(onDeletePress) {
              onDeletePress()
            }
            // 公式ドキュメントのお作法をそのまま
            reset()
          }}
          icon={{name: "delete", color: "white"}}
          buttonStyle={styles.deleteButton}
        />
      )}
      onPress={onPress}
      // 以下のように書くとオプショナルの関数において、わたってきていなかったら実行しない、渡ってきていたら実行するという形式をとることができる
      onLongPress={() => onLongPress?.()}
    >
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{name}</ListItem.Title>
        <ListItem.Subtitle style={styles.subTitle} numberOfLines={4}>{content}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
}

const styles=StyleSheet.create({
  title: {
    color: "#4A5054",
    fontWeight: "bold",
    fontSize: 20
  },
  subTitle: {
    color: "#95A2AC",
    fontSize: 15,
    padding: 4,
    maxHeight: 100
  },
  deleteButton: {
    minHeight: "100%",
    backgroundColor: "red"
  }
})

export {MemoListItem}
