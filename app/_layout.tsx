// アプリ全体のレイアウト（共通ヘッダーとか）およびルーティング（ナビゲーション）を記述する

import { Stack } from 'expo-router';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';


export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <Stack
        screenOptions={{
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#F9F9F9'
          }
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: false }} // ヘッダーを見せない(=大元Stackのheaderを見せる。)
        />
        {/* ホーム */}
        <Stack.Screen name="home/index" options={{ headerTitle: 'ホーム' }} />

        {/* ラベル設定画面 */}
        <Stack.Screen
          name="labels" //画面直接ではなく、ディレクトリに飛ぶ感じ。そのディレクトリ直下にある_layoutsの内容を表示する
          options={{ headerShown: false, presentation: 'fullScreenModal' }} // presentationは他の画面と違うアニメーションで表示させたい時に使う
        />

        {/* メモ */}
        <Stack.Screen name="memos/index" options={{ headerTitle: 'メモ' }} />
        <Stack.Screen name="memos/create" options={{ headerTitle: '' }} />
        <Stack.Screen name="memos/[id]" options={{ headerTitle: '' }} />
      </Stack>
    </GluestackUIProvider>
  );
}
