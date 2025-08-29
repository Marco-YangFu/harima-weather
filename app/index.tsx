import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <Text>It works.</Text>

      <Link href="/weather" asChild>
        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 8,
            borderWidth: 1,
          }}
        >
          <Text>Go to Weather</Text>
        </Pressable>
      </Link>

      <Link href="/places" asChild>
        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 8,
            borderWidth: 1,
          }}
        >
          <Text>Favorites</Text>
        </Pressable>
      </Link>
    </View>
  );
}
