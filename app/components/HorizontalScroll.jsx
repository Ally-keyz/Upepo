import React from 'react';
import { ScrollView, View } from 'react-native';
import { Image, Text } from 'react-native';
import { Routes } from '../components/Route'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HorizontalScrollView = () => {
  const navigator = useNavigation()
  return (
    <ScrollView
      horizontal={true}
      style={{ height: 200, }} className="gap-x-5 bg-white">

      {
        Routes.map((route) => (
          <TouchableOpacity key={route.id}>
            <View
              className='w-full flex-row p-2 justify-between items-center mt-5 border border-gray-300'
              style={{ width: 280, height: 150, paddingTop: '2.3%', borderRadius: 5, backgroundColor: '#F9F9F9' }}
              key={route.id}
            >
              <View className="w-[40%] mr-1">
                <Image source={require('../assets/Kigali_Rwanda.jpg')} className="w-full h-[100px] rounded-full" />
              </View>
              <View className="relative w-[60%]">
                <View className="flex-row w-full items-center p-1 border border-b-0 border-gray-300 ">
                  <Ionicons name="location" color="blue" />
                  <Text>{route.start}</Text>
                </View>
                <View className="flex-row w-full items-center p-1 border border-gray-300 ">
                  <Ionicons name="location" color="blue" />
                  <Text>{route.end}</Text>
                </View>
                <View className="absolute top-5 right-1 p-1 flex-row items-center bg-blue-500 justify-center rounded-full">
                  <Image source={require('../assets/arrows.png')} className="w-4 h-4 text-white" />
                </View>
                <View className="flex-row mt-2 gap-x-2">
                  <Text className="text-sm text-gray-600 font-light">Price</Text>
                  <Text className="text-sm font-bold">{route.cost}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))
      }

    </ScrollView>
  );
};

export default HorizontalScrollView