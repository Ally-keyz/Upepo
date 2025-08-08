import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './Screens/Landing';
import LoginScreen from './Screens/LoginScreen';

const Stack = createStackNavigator();

const _layOut = () => {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>

  );
};

export default _layOut;