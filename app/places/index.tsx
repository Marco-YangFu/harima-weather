import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { useFavorites } from '@/hooks/useFavorites';
import { Link, type Href } from 'expo-router';

export default function PlacesIndex() {
  const { items } = useFavorites();

  if (!items.length) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}
      >
        <Text>No favorites yet.</Text>
        <Text>Weather 画面から「Save Current」を押して登録してください。</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(it) => `${it.name}-${it.lat}-${it.lon}`}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => {
        const href = {
          pathname: '/places/[name]',
          params: {
            name: item.name, // encodeURIComponent(item.name) でも可
            lat: String(item.lat),
            lon: String(item.lon),
          },
        } satisfies Href; // ← ここがポイント

        return (
          <Link href={href} asChild>
            <TouchableOpacity
              accessibilityRole="button"
              style={{ padding: 16, borderRadius: 12, borderWidth: 1 }}
            >
              <Text style={{ fontWeight: '600' }}>{item.name}</Text>
              <Text style={{ opacity: 0.7 }}>
                lat {item.lat} / lon {item.lon}
              </Text>
            </TouchableOpacity>
          </Link>
        );
      }}
    />
  );
}
