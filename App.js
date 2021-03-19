import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import {
  ProfileScreen,
  CalendarScreen,
  WorkoutScreen,
  StatsScreen,
} from './screens';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function CalendarStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Workout" component={WorkoutScreen} />
    </Stack.Navigator>
  );
}

function StatsStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Stats" component={StatsScreen} />
    </Stack.Navigator>
  );
}

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let name =
      route.name === 'Profile'
        ? 'person-circle-outline'
        : route.name === 'Calendar'
        ? 'calendar'
        : 'bar-chart';
    return <Ionicons name={name} color={color} size={size} />;
  },
  tabBarLabel: () => null,
});

const tabBarOptions = {
  activeTintColor: '#073603',
  inactiveTintColor: 'gray',
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={screenOptions}
        tabBarOptions={tabBarOptions}
      >
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
        <Tab.Screen name="Calendar" component={CalendarStackScreen} />
        <Tab.Screen name="Stats" component={StatsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
