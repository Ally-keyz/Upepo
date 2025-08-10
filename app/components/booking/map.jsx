import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import Coordinates from '../../utils/coordinates';
import { BlurView } from 'expo-blur';

const agenciesData = [
  {
    name: 'Volcano Express',
    price: '$15',
    hours: ['08:00', '10:00', '12:00', '14:00'],
  },
  {
    name: 'Kigali Bus Co.',
    price: '$18',
    hours: ['09:00', '11:00', '13:00', '15:00'],
  },
  {
    name: 'Rwanda Coaches',
    price: '$20',
    hours: ['07:30', '10:30', '13:30', '16:30'],
  },
];

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedHour, setSelectedHour] = useState({});
  const origin = useSelector((state) => state.origin);
  const destination = useSelector((state) => state.destination);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setUserLocation(currentLocation.coords);
    } catch (error) {
      console.error('Error fetching user location:', error);
    }
  };

  const originCoords = Coordinates[origin] || { latitude: -1.2921, longitude: 36.8219 } 
  const destinationCoords = Coordinates[destination] || { latitude: -1.9441, longitude: 30.0619 };;

  return (
    <View className="flex-1 bg-white">
      <MapView
        className="flex-1"

                initialRegion={{
                    latitude: -1.9441,
                    longitude: 30.0619,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="You are here" />
        )}

        <Marker coordinate={originCoords} title={`Origin: ${origin}`} pinColor="green" />
        <Marker coordinate={destinationCoords} title={`Destination: ${destination}`} pinColor="red" />

        <Polyline
          coordinates={[originCoords, destinationCoords]}
          strokeColor="#000100ff"
          strokeWidth={4}
        />
      </MapView>

      {/* Travel Info Card */}
      <View className="absolute bottom-32 left-0 right-0 px-1">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 4}}
        >
          {agenciesData.map((agency, index) => (
            <View 
              key={index} 
              className="bg-white  backdrop-blur-md  rounded-2xl p-3 mr-4 w-[330px] h-[300px] shadow-lg border border-gray-100"
            >
              <View className="border-b border-gray-300 pb-2 mb-2">
                <Text className="text-lg  text-gray-900">{agency.name}</Text>
                <Text className="text-sm  text-gray-500">{origin} → {destination}</Text>
              </View>

              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-red-600 text-[17px] ">{agency.price}</Text>
                <View className="flex-row">
                  <Text className="text-black font-medium text-[17px] mr-2">~500 km</Text>
                  <Text className="text-red-600 text-[17px]">~8 hrs</Text>
                </View>
              </View>

              <Text className="text-gray-900 mb-2 text-[17px] ">Departure Times:</Text>
              <ScrollView className="max-h-24 mb-2">
                <View className="flex-row flex-wrap">
                  {agency.hours.map((hour, i) => (
                    <TouchableOpacity
                      key={i}
                      className={`py-2 px-3 rounded-lg mr-2 mb-2 ${
                        selectedHour[agency.name] === hour 
                          ? 'bg-gray-100' 
                          : 'bg-gray-100/30'
                      }`}
                      onPress={() => setSelectedHour({ ...selectedHour, [agency.name]: hour })}
                    >
                      <Text className={`text-center ${
                        selectedHour[agency.name] === hour 
                          ? 'text-black font-bold' 
                          : 'text-gray-800'
                      }`}>
                        {hour}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <TouchableOpacity className="bg-gray-100 py-3 rounded-xl mt-2">
                <Text className="text-white text-black  text-center">Select Trip</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Map; 