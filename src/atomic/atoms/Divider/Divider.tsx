import React from 'react';
import { Box, BoxProps } from '../Box/Box';

type DividerProps = BoxProps;

export function Divider(props: DividerProps) {
  return <Box height={1} backgroundColor="gray400" {...props} />;
}
