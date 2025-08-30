import { useEffect, useRef, useState } from 'react';
import { useOnline } from './useOnline';
import { getCache, setCache } from '../lib/cache';

const ranRef = useRef(false);

type Forecast = {
  // 必要な形に合わせて型定義
  hourly: any;
  daily: any;
  timezone: string;
  _fetchedAt: number;
};

const TTL_MS = 1000 * 60 * 30; // 30分

function cacheKey(lat: number, lon: number) {
  return `forecast:${lat.toFixed(3)},${lon.toFixed(3)}:v1`;
}

async function fetchForecast(lat: number, lon: number): Promise<Forecast> {
  // 実際のAPIに合わせて
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return { ...json, _fetchedAt: Date.now() };
}

export function useForecast(lat?: number | null, lon?: number | null) {
  const online = useOnline();
  const [data, setData] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [stale, setStale] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const onceRef = useRef(false);

  useEffect(() => {
    if (lat == null || lon == null) return;

    // StrictMode の二重実行を抑止
    if (ranRef.current) return;
    ranRef.current = true;

    if (onceRef.current) return; // 初回マウント時にロード（依存にlat/lon含むのであれば外してよい）
    onceRef.current = true;

    const key = cacheKey(lat, lon);

    let cancelled = false;

    (async () => {
      setError(null);
      // 1) まずキャッシュ
      const { data: cached, stale: isStale } = await getCache<Forecast>(key);
      if (!cancelled && cached) {
        setData(cached);
        setStale(isStale);
      }

      // 2)オフラインなら終了（キャッシュ頼み）
      if (!online) {
        setLoading(false);
        return;
      }

      // 3)SWR:裏で最新取得
      setLoading(!cached); // キャッシュがなければローダーを見せる
      try {
        const fresh = await fetchForecast(lat, lon);
        if (cancelled) return;
        setData(fresh);
        setStale(false);
        await setCache(key, fresh, TTL_MS);
      } catch (e: any) {
        if (cancelled) return;
        // キャッシュが無い or エラー明示
        if (!cached) setError(String(e?.message ?? e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [lat, lon, online]);

  return { data, loading, error, stale, online };
}
