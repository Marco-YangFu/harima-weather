import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const sub = NetInfo.addEventListener((state) => {
      setOnline(Boolean(state.isConnected && state.isInternetReachable));
    });
    // 初期状態も取得する
    NetInfo.fetch().then((s) => {
      setOnline(Boolean(s.isConnected && s.isInternetReachable));
    });
    return () => sub();
  }, []);
  return online;
}
