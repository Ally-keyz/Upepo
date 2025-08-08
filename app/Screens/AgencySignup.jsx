import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { setAgecnyLoginData } from '../appSlice/appSlices';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';

const AgencySignup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [isShowm, setIsShowm] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const toast = useToast();

  const handleLogin = () => {
    // e.preventDefault();
    setLoading(true)

    if (!name || !password || !selectedAgency || !vehiclePlate) {
      toast.show('All fields are required', {
        type: "error"
      });
      setLoading(false)
      return;
    }

    axios.post('https://etix-mobile-app-deployed-1.onrender.com/driverRoutes/addDrivers', {
      driverName: name,
      driverPassword: password,
      driverCar: vehiclePlate,
      driverAgency: selectedAgency,
    })
      .then(response => {
        const data = response.data;

        if (data.error) {
          toast.show(data.error, {
            type: "error"
          });
        } else if (data.message) {
          toast.show("Driver Registered successfully!", {
            type: "success"
          });

          setPassword('');
          setName('');
          setVehiclePlate('');
          setSelectedAgency('');
          navigator.navigate('Agency Login');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.show('Something went wrong. Please try again.', {
          type: "error"
        });
      })
      .finally(() => {
        setLoading(false);
      })
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
        <Text className="text-3xl font-bold">Agency Signup</Text>
      </View>


      <View className="w-full flex items-center mt-16">
        <View
          className="h-16 border border-gray-500 border-opacity-20 border-1 mb-4 pl-4 w-full flex flex-row items-center rounded-lg"
        >
          <Ionicons name="person-outline" size={24} color={"gray"} />
          <TextInput
            placeholder="Driver full names"
            value={name}
            onChangeText={(name) => setName(name)}
            className="w-5/6 h-10 border-transparent focus:border-transparent px-4"
          />
        </View>
        <View className="w-full">
          <View className="h-16 border border-gray-500 border-opacity-20 border-1 mb-3 pl-4 w-full flex flex-row items-center rounded-lg">
            <Feather name="lock" size={24} color={"gray"} />
            <TextInput
              placeholder="Enter your password"
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
        <View
          className="h-16 border border-gray-500 border-opacity-20 border-1 mb-4 pl-4 w-full flex flex-row items-center rounded-lg"
        >
          <Ionicons name="car-outline" size={24} color={"gray"} />
          <TextInput
            placeholder="Vehicle Plate (e.g., RAB 123C)"
            value={vehiclePlate}
            onChangeText={(vehiclePlate) => setVehiclePlate(vehiclePlate)}
            className="w-5/6 h-10 border-transparent focus:border-transparent px-4"
          />
        </View>
        <View className="h-16 border border-gray-500 border-opacity-20 mb-4 pl-4 w-full flex flex-row items-center rounded-lg">
          <Ionicons name="briefcase-outline" size={24} color={"gray"} />
          <Picker
            selectedValue={selectedAgency}
            onValueChange={(itemValue) => setSelectedAgency(itemValue)}
            style={{ flex: 1, color: 'gray' }}
          >
            <Picker.Item label="Choose your Agency" disabled={true} />
            <Picker.Item label="Volcano" value="Volcano" />
            <Picker.Item label="Horizon" value="Horizon" />
            <Picker.Item label="Ritco" value="Ritco" />
          </Picker>
        </View>
        <TouchableOpacity onPress={handleLogin} className="w-full flex items-center py-4 mt-7 bg-blue-600 rounded-full">
          <Text className="text-white font-bold">{loading ? <ActivityIndicator size={30} color={'white'} /> : 'Sign Up'}</Text>
        </TouchableOpacity>
        <View className="my-3 flex-row justify-center gap-x-3">
          <Text className="text-gray-400 font-bold text-center">Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigator.navigate('Signup')}>
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
    height: Dimensions.get('screen').height * 0.60,
    borderRadius: 10,
    position: 'relative',
    top: '-50%',
  },
  input: {
    height: Dimensions.get('screen').height * 0.06,
    width: Dimensions.get('screen').width * 0.8,
    borderRadius: 990,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontSize: 18,
    color: '#032B44',
    fontWeight: '600',
    marginBottom: 10,
  },
  loginButtonContainer: {
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: '#035B94',
    padding: 15,
    borderRadius: 12,
    width: Dimensions.get('screen').width * 0.5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default AgencySignup;