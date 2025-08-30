import { View, Text, Pressable } from 'react-native';

export default function ErrorView({
  message,
  onRetry,
  disabled,
}: {
  message: string;
  onRetry: () => void;
  disabled?: boolean;
}) {
  return (
    <View
      style={{
        gap: 8,
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#fff4f4',
      }}
    >
      <Text style={{ color: '#b00020', fontWeight: '600' }}>
        取得に失敗しました
      </Text>
      <Text selectable style={{ color: '#b00020' }}>
        {message}
      </Text>
      <Pressable
        onPress={onRetry}
        style={{
          alignSelf: 'flex-start',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
          backgroundColor: disabled ? '#9bb6ff' : '#3b82f6',
          opacity: disabled ? 0.7 : 1,
        }}
        disabled={disabled}
      >
        <Text style={{ color: 'white', fontWeight: '700' }}>再試行</Text>
      </Pressable>
    </View>
  );
}
