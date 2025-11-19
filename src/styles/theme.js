import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Define a consistent, vibrant primary color
const primaryColor = '#6200ee'; 

export const LightTheme = {
  ...MD3LightTheme,
  roundness: 8,
  colors: {
    ...MD3LightTheme.colors,
    primary: primaryColor,
    accent: '#FF4081',
    background: '#FFFFFF',
    surface: '#F7F7F7',
    text: '#000000',
    placeholder: '#757575',
    error: '#B00020',
    isDark: false, 
  },
};

export const DarkTheme = {
  ...MD3DarkTheme,
  roundness: 8,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#BB86FC',
    accent: '#FF80AB',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    placeholder: '#BBBBBB',
    error: '#CF6679',
    isDark: true,
  },
};