import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import ExpenseProvider from './src/context/ExpenseContext';
import HomeScreen from './src/screens/HomeScreen';
import SettlementScreen from './src/screens/SettlementScreen';
import { DefaultTheme } from './src/styles/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ExpenseProvider>
      <PaperProvider theme={DefaultTheme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'SplitEase' }}
            />
            <Stack.Screen
              name="Settle"
              component={SettlementScreen}
              options={{ title: 'Settlements' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ExpenseProvider>
  );
}
