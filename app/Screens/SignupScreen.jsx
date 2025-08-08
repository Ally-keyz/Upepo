import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-input';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigator = useNavigation();
  const [isShowm, setIsShowm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSignup = async () => {
    setLoading(true);

    try {
      const response = await axios.post('https://etix-mobile-app-deployed-1.onrender.com/user/userRegister', {
        userName: name,
        userEmail: email,
        userPassword: password,
        userPhoneNumber: phone
      });

      dispatch(setSignupData({
        name: name,
        email: email,
        phone: phone,
        password: password
      }));

      if (response.status === 201) {
        toast.show('You have been registered successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        navigator.navigate('Login Screen')
      } else {
        toast.show('Error', 'User registration failed');
      }
    } catch (error) {
      toast.show('Error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="w-full px-5">
      <View className="relative flex-row w-full mt-6 items-center justify-center">
        <TouchableOpacity
          className="absolute left-0"
          onPress={() => { navigator.goBack() }}
        >
          <FontAwesome name="chevron-left" size={18} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Signup</Text>
      </View>

      <View className="w-full flex items-center mt-16">
        <View
          className="h-16 border border-gray-500 border-opacity-20 border-1 mb-4 pl-4 w-full flex flex-row items-center rounded-lg"
        >
          <Ionicons name="person-outline" size={24} color={"gray"} />
          <TextInput
            placeholder="Enter your full names"
            value={name}
            onChangeText={(name) => setName(name)}
            className="w-5/6 h-10 border-transparent focus:border-transparent px-4"
          />
        </View>
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
        <PhoneInput
          value={phone}
          onChangePhoneNumber={setPhone}
          className="h-16 border border-gray-500 border-opacity-20 border-1 mb-4 pl-4 w-full flex flex-row items-center rounded-lg"
          initialCountry="rw"
        />
        <TouchableOpacity onPress={handleSignup} className="w-full flex items-center py-4 mt-7 bg-blue-600 rounded-full">
          <Text className="text-white font-bold">{loading ? <ActivityIndicator size={30} color={'white'} /> : 'Sign Up'}</Text>
        </TouchableOpacity>
        <View className="my-3 flex-row justify-center gap-x-3">
          <Text className="text-gray-400 font-bold text-center">Already got an account?
          </Text>
          <TouchableOpacity onPress={() => navigator.navigate('Login')}>
            <Text className="font-bold text-blue-600 underline">Sign In</Text>
          </TouchableOpacity>
          <View />
        </View>
        <View className="w-full gap-x-0 flex-row items-center justify-center my-3">
          <View className="bg-gray-400 w-[48%] h-[2px]" />
          <Text className="px-5 font-semibold text-gray-400">OR</Text>
          <View className="bg-gray-400 w-[48%]  h-[2px]" />
        </View>
        <TouchableOpacity
          className="w-full flex p-4 my-4 rounded-full flex-row justify-center items-center border gap-x-3 border-blue-500 mx-1"
        >
          <Image
            source={require('../assets/google.png')}
            className="w-6 h-6"
          />
          <Text className="text-blue-600">Sign Up With Google</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: 'white',

  },

  loginContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },


  loginBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5EDF0',
    width: Dimensions.get('screen').width * 0.90,
    height: Dimensions.get('screen').height * 0.50,
    borderRadius: 10,
    position: 'relative',
    top: '-55%', 
  },
  googleLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Dimensions.get('screen').height * 0.05,
    width: Dimensions.get('screen').width * 0.8,
    backgroundColor: '#035B94',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 20,
  },
  googleIcon: {
    width: 30,
    height: 23,
  },
  googleLoginText: {
    color: 'white',
    fontSize: 15,
  },
  input: {
    height: Dimensions.get('screen').height * 0.07,
    width: Dimensions.get('screen').width * 0.8,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white'

  },
  forgotPasswordText: {
    fontSize: 18,
    color: '#032B44',
    fontWeight: '600',
    marginBottom: 10,
  },
  orText: {
    fontSize: 20,
  },
  signupText: {
    fontSize: 18,
    color: '#032B44',
    fontWeight: '600',

  },
  signupLink: {
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
  },
  loginButtonContainer: {
    backgroundColor: '#032B44',
    padding: 15,
    borderRadius: 10,
    width: Dimensions.get('screen').width * 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },


});

export default SignupScreen;
