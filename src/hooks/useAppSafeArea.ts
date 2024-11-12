import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';

export function useAppSafeArea() {
  const { top, bottom } = useSafeAreaInsets();
  const { spacing } = useTheme();

  return {
    top: Math.max(top, spacing.s20),
    bottom: Math.max(bottom, spacing.s20),
  };
}
