import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

/**
 * アプリ起動時の画面
 *
 */

export default function InitialScreen() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

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
