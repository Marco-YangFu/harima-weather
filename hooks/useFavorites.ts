// hooks/useFavorites.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';

export type Place = { name: string; lat: number; lon: number };

const KEY = 'favorites:v1';
const LIMIT = 3 as const;

export function useFavorites() {
  const [items, setItems] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 初期ロード
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (!raw) {
          setItems([]);
        } else {
          try {
            const parsed = JSON.parse(raw) as Place[];
            setItems(Array.isArray(parsed) ? parsed : []);
          } catch {
            // 壊れたJSONの場合はリセット
            setItems([]);
          }
        }
      } catch (e: any) {
        setError(e?.message ?? 'storage read failed');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 永続化（単発の失敗は UI を止めない方針）
  const persist = useCallback(async (next: Place[]) => {
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(next));
    } catch (e: any) {
      setError(e?.message ?? 'storage write failed');
    }
  }, []);

  // 競合を避けるため、functional updateで一気に計算→保存
  const add = useCallback(
    (p: Place) => {
      setItems((prev) => {
        const next = [p, ...prev.filter((x) => x.name !== p.name)].slice(
          0,
          LIMIT,
        );
        // fire-and-forget の非同期保存（awaitしない）
        void persist(next);
        return next;
      });
    },
    [persist],
  );

  const remove = useCallback(
    (name: string) => {
      setItems((prev) => {
        const next = prev.filter((x) => x.name !== name);
        void persist(next);
        return next;
      });
    },
    [persist],
  );

  const clear = useCallback(() => {
    setItems(() => {
      const next: Place[] = [];
      void persist(next);
      return next;
    });
  }, [persist]);

  return { items, add, remove, clear, loading, error, LIMIT };
}
