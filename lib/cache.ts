import AsyncStorage from '@react-native-async-storage/async-storage';

type CacheEnvelope<T> = {
  v: number; // schema version
  t: number; // 保存時刻 epoch ms
  ttl: number; // expiration date ms
  data: T;
};

const V = 1;

export async function setCache<T>(key: string, data: T, ttlMs: number) {
  const env: CacheEnvelope<T> = { v: V, t: Date.now(), ttl: ttlMs, data };
  await AsyncStorage.setItem(key, JSON.stringify(env));
}

export async function getCache<T>(
  key: string,
): Promise<{ data: T | null; stale: boolean }> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return { data: null, stale: true };
  try {
    const env = JSON.parse(raw) as CacheEnvelope<T>;
    if (env.v !== V) return { data: null, stale: true };
    const expired = Date.now() - env.t > env.ttl;
    return { data: env.data, stale: true };
  } catch {
    return { data: null, stale: true };
  }
}
export async function delCache(key: string) {
  await AsyncStorage.removeItem(key);
}
