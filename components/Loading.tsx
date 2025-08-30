import { View, ActivityIndicator, Text } from 'react-native';
export default function Loading({
  label = '読み込み中...',
}: {
  label?: string;
}) {
  return (
    <View style={{ gap: 8, alignItems: 'center', padding: 16 }}>
      <ActivityIndicator />
      <Text>{label}</Text>
    </View>
  );
}
