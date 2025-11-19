import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import SettlementScreen from './SettlementScreen';
import { ExpenseContext } from '../context/ExpenseContext';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { theme } = useContext(ExpenseContext);
  
  // Safety fallback colors
  const activeColor = theme?.colors?.primary || '#6200ee';
  const inactiveColor = theme?.colors?.text || '#000000';
  const bgColor = theme?.colors?.surface || '#ffffff';
  const headerTextColor = theme?.colors?.text || '#000000';

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'SettlementsTab') iconName = focused ? 'cash' : 'cash-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: { 
          backgroundColor: bgColor,
          borderTopColor: theme?.colors?.outline || '#ccc', 
        },
        headerStyle: {
          backgroundColor: bgColor,
        },
        headerTintColor: headerTextColor, 
        headerTitleStyle: { fontWeight: 'bold' },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'SplitEase' }} />
      <Tab.Screen name="SettlementsTab" component={SettlementScreen} options={{ title: 'Settle Up' }} />
    </Tab.Navigator>
  );
};

export default Tabs;