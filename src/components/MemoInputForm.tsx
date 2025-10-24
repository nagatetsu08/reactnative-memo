import { View, StyleSheet, Button, InputAccessoryView, Keyboard, Platform } from "react-native"
import { Input, InputField, Textarea, TextareaInput } from '@gluestack-ui/themed';


type MemoInputFormProps = {
  title: string,
  content: string,
  onTitleChange: (text: string ) => void    // タイトル変更時のコールバック
  onContentChange: (text: string) => void   // 内容変更時のコールバック
}

const inputAccessoryViewID =  "INPUT_ACCESSORY_VIEW_ID"

/**
 * メモ入力フォーム
 *
 * @param props
 * @returns
 */

const MemoInputForm = (props: MemoInputFormProps) => {
  const {title, content, onTitleChange, onContentChange} = props

  return (
    <View style={styles.container}>
      {/*
        {"$full"}は画面一杯に広がるという意味。minWidth、minHeightにそれを設定することは、最小でコンポーネント一杯を意味するので
        デフォルトでコンポーネントの許す限りの最大の縦横幅を確保する
        またTextareaの中にTextareaInput以外の項目（InputとかInputField）を入れ子にすることも普通にあるらしい。制約やらレイアウト（横幅いっぱい等）を
        共有するためだとか。だから間違いではないらしい
      */}

      <Textarea
        borderWidth={0}
        minWidth={"$full"}
        minHeight={"$full"}
      >
        {/* タイトル入力欄 */}
        <Input
          borderWidth={0}
          minWidth={"$full"}
          marginTop={"$4"}
          marginBottom={"$1"}
          paddingHorizontal={"$1"}
        >
          <InputField
            defaultValue={title}
            onChangeText={onTitleChange}
            fontSize={"$2xl"}
            fontWeight={"$bold"}
            placeholder="タイトル"
          />
        </Input>

        {/* 内容入寮区欄 */}
        <TextareaInput
          inputAccessoryViewID={inputAccessoryViewID} // inputAccessoryViewでUIを弄るための識別IDを付与
          scrollEnabled={true}
          paddingHorizontal={"$5"}
          defaultValue={content}
          onChangeText={onContentChange}
          fontSize={"$md"}
          placeholder="メモを入力"
        />
      </Textarea>

      {/* iOSのみ、キーボード上部に閉じるボタンを表示 */}
      {Platform.OS === 'ios' && (
        <InputAccessoryView
          nativeID={inputAccessoryViewID}
          backgroundColor="#F1F1F1"
        >
          <View style={styles.iosCloseButtonContainer}>
            <Button title='閉じる' onPress={() => Keyboard.dismiss()} />
          </View>
        </InputAccessoryView>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100
  },
  iosCloseButtonContainer: {
    alignItems: "flex-end"
  },
})

export {MemoInputForm}
