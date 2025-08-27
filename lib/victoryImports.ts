import { Platform } from 'react-native';

export const V =
  Platform.OS === 'web' ? require('victory') : require('victory-native');
