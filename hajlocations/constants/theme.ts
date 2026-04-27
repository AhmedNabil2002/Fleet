import { Platform } from 'react-native';

export const HajjColors = {
  green: '#1B6B3A',
  greenDark: '#0D3B1F',
  greenMid: '#2E7D32',
  greenLight: '#E8F5E9',
  gold: '#C8A044',
  goldLight: '#F5E6C0',
  goldDark: '#8B6914',
  cream: '#FAF6EE',
  sand: '#F0E6D0',
  white: '#FFFFFF',
  black: '#0D0D0D',
  textDark: '#1A1A1A',
  textMuted: '#6B7280',
  error: '#C0392B',
  errorLight: '#FDECEA',
  border: '#DDD5C0',
};

export const Colors = {
  light: {
    text: HajjColors.textDark,
    background: HajjColors.cream,
    tint: HajjColors.green,
    icon: HajjColors.gold,
    tabIconDefault: HajjColors.textMuted,
    tabIconSelected: HajjColors.green,
    card: HajjColors.white,
    border: HajjColors.border,
    gold: HajjColors.gold,
    primary: HajjColors.green,
  },
  dark: {
    text: HajjColors.goldLight,
    background: HajjColors.greenDark,
    tint: HajjColors.gold,
    icon: HajjColors.gold,
    tabIconDefault: '#6B8C74',
    tabIconSelected: HajjColors.gold,
    card: '#162B1F',
    border: '#2A4A35',
    gold: HajjColors.gold,
    primary: HajjColors.gold,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
