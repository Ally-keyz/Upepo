import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // or 'MaterialIcons', etc.

function Home() {
  return (
    <View className="flex-1 bg-white">
      {/* Header with Logo and Notification */}
    <View className="flex-row items-center justify-between  p-5">
        {/* Logo */}
        <Image
          source={require('../assets/logo.png')} // Replace with your logo path
          className="w-32 h-20"
          resizeMode="contain"
        />

        {/* Notification Button */}
        <TouchableOpacity onPress={() => console.log('Notification pressed')}>
          <View className="w-10 h-10 rounded-xl bg-gray-100 shadow-sm items-center justify-center">
            <Icon name="notifications-outline" size={24} color="#000" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Rest of the content */}
    </View>
  );
}

export default Home;
