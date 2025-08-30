import { View, Text, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  const shadow =
    Platform.OS === 'web'
      ? { boxShadow: '0 6px 16px rgba(0,0,0,0.12)' }
      : {
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 4,
        };

  type Variant = 'primary' | 'secondary';

  const Button = ({ href, label, variant = 'primary' as Variant }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => router.push(href)}
      // 単一オブジェクトで style を返す（web 安定）
      style={{
        display: Platform.OS === 'web' ? 'inline-flex' : undefined, // webで確実にサイズ反映
        minWidth: 240,
        minHeight: 52,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: variant === 'primary' ? '#000000' : '#FFFFFF', // 黒 or 白
        borderColor: '#000000',
        cursor: 'pointer',
        ...(shadow as any),
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: '900',
          color: variant === 'primary' ? '#FFFFFF' : '#000000', // 白 or 黒
          letterSpacing: 0.5,
          textDecorationLine: 'none',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        gap: 20,
      }}
    >
      <View style={{ alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 30, fontWeight: '900', color: '#000' }}>
          Harima Weather
        </Text>
        <Text style={{ fontSize: 18, color: '#111', marginTop: 6 }}>
          気温情報アプリ
        </Text>
      </View>

      <Button href="/weather" label="気温の確認" variant="primary" />
      <Button href="/places" label="お気に入り" variant="secondary" />
    </View>
  );
}
