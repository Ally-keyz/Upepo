import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home';
import Booking from './booking';
import CustomTabBar from '../components/customTabBar';
import Map from '../components/booking/map';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="Booking"
        component={Booking}
      />
      <Tab.Screen name="Map" component={Map}  />
    </Tab.Navigator>
  );
}

export default TabNavigator;
