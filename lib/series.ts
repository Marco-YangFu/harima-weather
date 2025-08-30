export function toHourlySeries(hourly: any) {
  // hourly.time: string[], hourly.temperature_2m: number[]
  if (!hourly?.time || !hourly?.temperature_2m) return [];
  return hourly.time.map((iso: string, i: number) => ({
    x: new Date(iso), // 時刻
    y: Number(hourly.temperature_2m[i]), // 気温
  }));
}

export function toDailyHiLo(daily: any) {
  if (!daily?.time || !daily?.temperature_2m_min || !daily?.temperature_2m_max)
    return [];
  return daily.time.map((iso: string, i: number) => ({
    x: new Date(iso),
    min: Number(daily.temperature_2m_min[i]),
    max: Number(daily.temperature_2m_max[i]),
  }));
}
