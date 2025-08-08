import React, { useState } from 'react';
import { SafeAreaView, View, Image, Animated, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch } from 'react-redux';
import { setLoginData } from '../appSlice/appSlices';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const navigator = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const opacity = new Animated.Value(0);
  const [isShowm, setIsShowm] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Please fill in both email and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://etix-mobile-app-deployed-1.onrender.com/userAuth/userlogin', {
        userEmail: email,
        userPassword: password
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('token', response.data.token);

        const userData = {
          name: response.data.userName,
          email: response.data.userEmail,
        };


        // console.log("user data:", userData);
        console.log("API Response:", response.data);
        

        await AsyncStorage.setItem('userData', JSON.stringify(userData));

        dispatch(setLoginData(userData));

        setEmail('');
        setPassword('');
        navigator.navigate('Test');
        toast.show('Successfully logged in!', {
          type: "success"
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert('Login Error', error.response.data.error);
      } else {
        toast.show('Incorrect email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  const HandlePress = (e) => {
    e.preventDefault();
    navigator.navigate('Agency Login');
  };

  return (
    <ScrollView className="w-full px-5">
      <View className="relative flex-row w-full mt-10 items-center justify-center">
        <TouchableOpacity
          className="absolute left-0"
          onPress={() => { navigator.goBack() }}
        >
          <FontAwesome name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold">Login</Text>
      </View>
      <View className="w-full flex items-center mt-16">
        <View
          className="h-16 border border-gray-500 border-opacity-20 border-1 mb-4 pl-4 w-full flex flex-row items-center rounded-lg"
        >
          <Ionicons name="mail-outline" size={24} color={"gray"} />
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            className="w-5/6 h-10 border-transparent focus:border-transparent px-4"
          />
        </View>
        <View className="w-full">
          <View className="h-16 border border-gray-500 border-opacity-20 border-1 mb-3 pl-4 w-full flex flex-row items-center rounded-lg">
            <Feather name="lock" size={24} color={"gray"} />
            <TextInput
              placeholder="Enter new password"
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={!isShowm}
              className="w-3/5 h-10 border-transparent border-0 px-4"
            />
            <TouchableOpacity
              className="absolute right-5"
              onPress={() => {
                setIsShowm((prev) => !prev);
              }}
            >
              <FontAwesome
                name={isShowm ? "eye" : "eye-slash"}
                size={24}
                color={"gray"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity className="w-full items-end px-2">
          <Text className="text-blue-600">Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} className="w-full flex items-center py-4 mt-3 bg-blue-600 rounded-full">
          <Text className="text-white font-bold">{loading ? <ActivityIndicator size={20} color={'white'} /> : 'Login'}</Text>
        </TouchableOpacity>
        <View className="my-3 flex-row justify-center gap-x-3">
          <Text className="text-gray-400 font-bold text-center">Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigator.navigate('Signup')}>
            <Text className="font-bold text-blue-600 underline">Signup</Text>
          </TouchableOpacity>
          <View />
        </View>
        <View className="w-full gap-x-0 flex-row items-center justify-center my-3">
          <View className="bg-gray-400 w-[48%] h-[2px]" />
          <Text className="px-5 font-semibold text-gray-400">OR</Text>
          <View className="bg-gray-400 w-[48%]  h-[2px]" />
        </View>
        <TouchableOpacity onPress={HandlePress} className="w-full flex items-center py-4 mt-3 border border-blue-500 rounded-full">
          <Text className="text-blue-600 font-bold">Login as a Driver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full flex p-4 mt-4 rounded-full flex-row justify-center items-center border gap-x-3 border-blue-500 mx-1"
        >
          <Image
            source={require('../assets/google.png')}
            className="w-6 h-6"
          />
          <Text className="text-blue-600">Sign In With Google</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
