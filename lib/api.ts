type Current = {
  temperature_2m: number;
  wind_speed_10m: number;
};

type Daily = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
};

export type Forecast = {
  current: Current;
  daily: Daily;
};

const BASE = 'https://api.open-meteo.com/v1/forecast';

function buildUrl(lat: number, lon: number) {
  const p = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    // 今は必要最低限。後で hourly などを追加する
    current: 'temperature_2m,wind_speed_10m',
    daily: 'temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
  });
  return `${BASE}?${p.toString()}`;
}

/** 5秒でタイムアウトする fetch */
async function fetchWithTimeout(
  input: RequestInfo,
  init?: RequestInit,
  ms = 5000,
) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(input, { ...init, signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(t);
  }
}

export async function getForecast(lat: number, lon: number): Promise<Forecast> {
  const url = buildUrl(lat, lon);
  console.log('[api] GET', url); // 確認用
  const res = await fetchWithTimeout(url);

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`weather api ${res.status}: ${text || 'request failed'}`);
  }

  const json = await res.json();

  // Open-Metro のキーをこちらの薄い型へマッピング
  const current: Current = {
    temperature_2m: json.current?.temperature_2m,
    wind_speed_10m: json.current?.wind_speed_10m,
  };

  const daily: Daily = {
    time: json.daily?.time ?? [],
    temperature_2m_max: json.daily?.temperature_2m_max ?? [],
    temperature_2m_min: json.daily?.temperature_2m_min ?? [],
  };

  return { current, daily };
}
