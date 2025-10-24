import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

export const DefaultTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: '#ffffff',
    text: '#000000',
    placeholder: '#aaaaaa',
    error: '#B00020',
  },
};
