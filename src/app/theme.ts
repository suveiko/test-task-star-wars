import { createTheme, type MantineColorsTuple } from '@mantine/core';

const brandColor: MantineColorsTuple = [
  '#f0f4ff',
  '#dce4ff',
  '#b9c7ff',
  '#94a8ff',
  '#748eff',
  '#5f7cff',
  '#5474ff',
  '#4264eb',
  '#3759d4',
  '#264cbd',
];

export const theme = createTheme({
  colors: {
    brand: brandColor,
  },
  primaryColor: 'brand',
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  defaultRadius: 'md',
});
