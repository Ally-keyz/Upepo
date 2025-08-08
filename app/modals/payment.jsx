import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import { ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';



const paymentMethods = [
  {
    id: 'mtn',
    name: 'MTN',
    image: require('../assets/MTN.png'),
  },
  {
    id: 'Airtel',
    name: 'AIRTEL',
    image: require('../assets/airtel.png'),
  },
];


const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigation();
  const toast = useToast()
  const route = useRoute();

  const handleSelectMethod = (id) => {
    setSelectedMethod(id);
  };

  const handlePayNow = () => {
    setShowPaymentForm(true);
  };

  const { price } = route.params || {};

  const handlePayment = async () => {
    
    const amount = 5;
    

    if (!selectedMethod || !phoneNumber) {
      toast.show('Please select a payment method and enter your phone number.', {
        type: 'danger',
      });
      return;
    }

    if (!/^07\d{8}$/.test(phoneNumber)) {
      toast.show('Please enter a valid phone number', { type: 'danger' });
      return;
    }


    setIsLoading(true);

    const url =
      selectedMethod === 'mtn'
        ? 'https://etix-mobile-app-deployed-1.onrender.com/pay/mtn-pay'
        : 'https://etix-mobile-app-deployed-1.onrender.com/pay/airtel-pay';

    const payload = {
      price,
      phone: phoneNumber,
    };

    try {
      const response = await axios.post(url, payload);
      console.log(response.data);

      if (response.status === 200) {
        toast.show('Payment successful!', { type: 'success' });
        setSuccessModalVisible(true);
      } else if (response.status === 400) {
        toast.show(response.data.message || 'Enter valid number or check balance.', {
          type: 'danger',
        });
      } else {
        toast.show(response.data.message || 'Payment failed.', {
          type: 'danger',
        });
      }
    } catch (error) {
      toast.show(
        error.response?.data?.message || 'An error occurred. Please try again.',
        { type: 'danger' }
      );
      console.log(error);

    } finally {
      setIsLoading(false); // Stop loading
    }
  };



  const handleReturnHome = () => {
    setSuccessModalVisible(false);
    navigator.navigate('Home');
  };

  return (
    <View className="px-3">
      <View className="relative flex-row w-full mt-10 items-center justify-center">
        <TouchableOpacity
          className="absolute left-5 text-blue-900"
          onPress={() => { navigator.goBack() }}
        >
          <FontAwesome name="chevron-left"  size={18}  />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-blue-900">Payment</Text>
      </View>
      {!showPaymentForm ? (
        <>
          <Text className="mt-10 mb-2 font-bold text-lg">You trip</Text>
          <View className="border border-gray-300 p-4">
            <View className="flex-row justify-between items-center">
              <Image
                source={require('../assets/Route.png')}
                className="w-10 h-8"
              />
            </View>

            <View className="mt-2">
              <View className="flex-row justify-between">
                <Text className="font-bold">Kigali</Text>
                <Text className="font-bold">Huye</Text>
              </View>

              <View className="flex-row justify-between mt-1">
                <Text className="font-bold">10:11 AM</Text>
                <Text className="font-bold">12:11 AM</Text>
              </View>

              <View className="flex-row justify-between mt-1">
                <Text className="text-gray-500 text-sm">5 Apr 2025</Text>
                <Text className="text-gray-500 text-sm">5 Apr 2025</Text>
              </View>

              <View className="flex-row items-center justify-between mt-4">
                <Text className="text-sm text-gray-500">Duration 2h 15m</Text>
              </View>
            </View>
          </View>
          <Text className="mt-5 mb-2 font-bold text-lg">Payment Method</Text>
          <View className="px-2 py-4 border border-gray-300">
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                className={`flex-row items-center justify-between border py-3 px-4 mb-3 relative ${selectedMethod === method.id ? 'border-blue-500' : 'border-gray-200'
                  }`}
                onPress={() => handleSelectMethod(method.id)}
              >
                <View className="flex-row items-center">
                  <Image source={method.image} className="w-10 h-10 mr-4" />
                  <Text className="font-semibold">{method.name}</Text>
                </View>
                <View>
                  {selectedMethod === method.id ? (
                    <View className=" transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500" />
                  ) : (
                    <View className="transform -translate-y-1/2 w-3 h-3 rounded-full bg-gray-500" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row justify-between items-center mt-10">
            <View className="flex gap-y-1">
              <Text className="text-blue-500 font-bold">3712Rwf</Text>
              <Text className="text-gray-400">Total Price</Text>
            </View>
            <TouchableOpacity
              className={`w-32 py-2 items-center ${selectedMethod ? 'bg-blue-500' : 'bg-gray-400'
                }`}
              disabled={!selectedMethod}
              onPress={handlePayNow}
            >
              <Text className="text-white text-base font-semibold">Pay Now</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="mt-10">
          <Text className="font-bold text-lg">Enter Payment Details</Text>
          <TextInput
            className="border border-gray-300 px-3 py-4 mt-5"
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity
            className={`py-3 items-center mt-5 ${isLoading ? 'bg-gray-400' : 'bg-blue-500'}`}
            onPress={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-white text-base font-semibold">Pay</Text>
            )}
          </TouchableOpacity>

        </View>
      )}
      <Modal
        visible={successModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View className="flex-1 justify-center items-center bg-gray-50 bg-opacity-20">
          <View className="bg-white p-5 rounded-lg items-center">
            <Image
              source={require('../assets/success.png')}
              className="w-24 h-24"
            />
            <Text className="text-xl font-bold mt-4">Paid Successfully!</Text>
            <TouchableOpacity
              className="bg-blue-500 py-3 px-10 mt-5 rounded-full"
              onPress={handleReturnHome}
            >
              <Text className="text-white font-semibold">Return to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Payment