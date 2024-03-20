import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScheduleMatchScreen from '../screens/ScheduleMatchScreen/ScheduleMatchScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ScheduleMatch"
          component={ScheduleMatchScreen}
          options={{ title: 'Schedule Match' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;