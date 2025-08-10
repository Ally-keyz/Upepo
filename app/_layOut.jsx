import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './Screens/Landing';
import LoginScreen from './Screens/LoginScreen';
import Map from './components/booking/map';
import TabNavigator from './(tabs)/_LayOut';

const Stack = createStackNavigator();

const _layOut = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Map" component={Map} options={{ gestureDirection: 'horizontal', animation: 'slide_from_right' }} />
    </Stack.Navigator>

  );
};

export default _layOut;