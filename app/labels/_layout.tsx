import { Stack } from "expo-router"
import { Text, TouchableOpacity } from "react-native"
import { useRouter } from 'expo-router';

export default function Layout() {
  const router = useRouter();

  return (
    <Stack screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="create"
        options={{
          headerTitle: "ラベル作成",
          headerLeft: () => (
            // TouchableOpacityでラップしたものがタッチ操作を受け付けられるようになる
            // ボタン以外のやつに仕掛けられる（例えばtextとか）
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Text>閉じる</Text>
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "ラベル修正",
          headerLeft: () => (
            // TouchableOpacityでラップしたものがタッチ操作を受け付けられるようになる
            // ボタン以外のやつに仕掛けられる（例えばtextとか）
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Text>閉じる</Text>
            </TouchableOpacity>
          )
        }}
      />
    </Stack>

  )
}
