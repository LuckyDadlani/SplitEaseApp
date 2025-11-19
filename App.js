import 'react-native-get-random-values';
import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme as NavDefaultTheme, DarkTheme as NavDarkTheme } from '@react-navigation/native';
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import ExpenseProvider, { ExpenseContext } from './src/context/ExpenseContext';
import Tabs from './src/screens/Tabs';

const AppContent = () => {
  const { theme, isDarkTheme } = useContext(ExpenseContext);
  
  // Merge React Navigation Theme with our Custom Paper Theme colors
  // This ensures the Navigation Container doesn't crash on undefined colors
  const navigationTheme = isDarkTheme ? {
    ...NavDarkTheme,
    colors: {
      ...NavDarkTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.outline || '#444',
    }
  } : {
    ...NavDefaultTheme,
    colors: {
      ...NavDefaultTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.outline || '#ccc',
    }
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={navigationTheme}>
        <Tabs />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  );
}