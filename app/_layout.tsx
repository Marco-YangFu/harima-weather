import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <Stack screenOptions={{ headerTitle: 'Harima Weather'}}>
        <Stack.Screen name="index" options={{ title: 'Home'}} />
        <Stack.Screen name="weather" options={{ title: 'Wheather'}} />
      </Stack>
    </SafeAreaView>
  )
}