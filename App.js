import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications'
import Landing from './app/Screens/Landing';
import LoginScreen from './app/Screens/LoginScreen';
import SignupScreen from './app/Screens/SignupScreen';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import AgencyLogin from './app/Screens/AgencyLogin';
import Test from './app/(tabs)/test';
import Schedule from './app/(tabs)/Schedule';
import DriverScreen from './app/Driver/DriverScreen ';
import Payment from './app/modals/payment';
import Seats from './app/modals/seats';
import AgencySignup from './app/Screens/AgencySignup';




export default function App() {
  const Stack = createStackNavigator();
  return (
    <>
      <ToastProvider
        placement="top"
        animationType='slide-in'
        successColor="green"
        dangerColor="red"
      >

        <Provider store={store}>
          <NavigationContainer style={styles.container}>
            <SafeAreaProvider >
              <Stack.Navigator>
                <Stack.Screen name="Landing" options={{ headerShown: false }} component={Landing} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Test' options={{ headerShown: false }} component={Test} />
                <Stack.Screen name='Agency Login' component={AgencyLogin} options={{ headerShown: false }} />
                <Stack.Screen name='agencySignup' component={AgencySignup} options={{ headerShown: false }} />
                <Stack.Screen name='Schedule' options={{ headerShown: false }} component={Schedule} />
                <Stack.Screen name='Driver' options={{ headerShown: false }} component={DriverScreen} />
                <Stack.Screen name='Payment' options={{ headerShown: false }} component={Payment} />
                <Stack.Screen name='Seats' options={{ headerShown: false }} component={Seats} />
              </Stack.Navigator>
            </SafeAreaProvider>
          </NavigationContainer>
        </Provider>
        <StatusBar style="auto" />
      </ToastProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
