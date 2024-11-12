import { useTheme } from '@shopify/restyle';

import { Theme } from '../themes/theme';

export function useAppTheme() {
  return useTheme<Theme>();
}
