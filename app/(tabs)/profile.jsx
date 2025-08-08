import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

const menuItems = [
  {
    label: 'Booking Details',
    icon: <MaterialIcons name="receipt" size={24} />,
  },
  {
    label: 'About Us',
    icon: <Ionicons name="information-circle-outline" size={24} />,
  },
  {
    label: 'Language',
    icon: <Ionicons name="globe-outline" size={24} />,
  },
  {
    label: 'Help Centre',
    icon: <Ionicons name="help-circle-outline" size={24} />,
  },
  {
    label: 'Privacy Policy',
    icon: <Ionicons name="shield-checkmark-outline" size={24} />,
  },
  {
    label: 'Log out',
    icon: <Ionicons name="exit-outline" size={24} />,
  },
];

const Profile = () => {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-8 pb-4">
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Profile</Text>
        <TouchableOpacity>
          <MaterialIcons name="edit" size={22} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View className="items-center mt-6">
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', // Replace with user profile image URL
          }}
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-xl font-semibold mt-4">Elissa DUSABE</Text>
        <Text className="text-gray-500 mt-1">user@gmail.com</Text>
        <Text className="text-gray-500">+250782121982</Text>
      </View>

      {/* Menu Options */}
      <View className="mt-8">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200"
          >
            <View className="flex-row items-center">
              <View className="mr-4">{item.icon}</View>
              <Text className="text-gray-700 font-medium">{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Profile;
