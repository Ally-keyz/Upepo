import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import Coordinates from '../../utils/coordinates';

MapboxGL.setAccessToken("pk.eyJ1IjoiYWxwZS0wMSIsImEiOiJjbWU1eXJsMG0wYjJ0MmxyMXozdGh2ZDQ4In0.zMIyCFmNk8F8JhGx4G9jSA");

const agenciesData = [
  { name: 'Volcano Express', price: '$15', hours: ['08:00', '10:00', '12:00', '14:00'] },
  { name: 'Kigali Bus Co.', price: '$18', hours: ['09:00', '11:00', '13:00', '15:00'] },
  { name: 'Rwanda Coaches', price: '$20', hours: ['07:30', '10:30', '13:30', '16:30'] },
];

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedHour, setSelectedHour] = useState({});
  const origin = useSelector((state) => state.origin);
  const destination = useSelector((state) => state.destination);

  const originCoords = Coordinates[origin] || { latitude: -1.2921, longitude: 36.8219 };
  const destinationCoords = Coordinates[destination] || { latitude: -1.9441, longitude: 30.0619 };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let currentLocation = await Location.getCurrentPositionAsync({});
      setUserLocation([currentLocation.coords.longitude, currentLocation.coords.latitude]);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Uber Dark Styled Map */}
      <MapboxGL.MapView
        style={{ flex: 1 }}
        styleURL="mapbox://styles/mapbox/navigation-night-v1"
      >
        {userLocation && (
          <MapboxGL.PointAnnotation id="me" coordinate={userLocation} />
        )}

        <MapboxGL.PointAnnotation
          id="origin"
          coordinate={[originCoords.longitude, originCoords.latitude]}
        />
        <MapboxGL.PointAnnotation
          id="destination"
          coordinate={[destinationCoords.longitude, destinationCoords.latitude]}
        />

        <MapboxGL.ShapeSource
          id="routeSource"
          shape={{
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: [
                    [originCoords.longitude, originCoords.latitude],
                    [destinationCoords.longitude, destinationCoords.latitude],
                  ],
                },
              },
            ],
          }}
        >
          <MapboxGL.LineLayer id="routeLine" style={{ lineColor: '#1DB954', lineWidth: 4 }} />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>

      {/* Uber-like Card */}
      <View style={{ position: 'absolute', bottom: 30, left: 0, right: 0 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {agenciesData.map((agency, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#1c1c1e',
                borderRadius: 15,
                padding: 15,
                marginRight: 10,
                width: Dimensions.get('window').width * 0.85,
              }}
            >
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>{agency.name}</Text>
              <Text style={{ color: '#9e9e9e', marginBottom: 5 }}>{origin} → {destination}</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ color: '#4cd964', fontSize: 17 }}>{agency.price}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'white', marginRight: 5 }}>~500 km</Text>
                  <Text style={{ color: '#4cd964' }}>~8 hrs</Text>
                </View>
              </View>

              <Text style={{ color: 'white', marginBottom: 5 }}>Departure Times:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {agency.hours.map((hour, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setSelectedHour({ ...selectedHour, [agency.name]: hour })}
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      backgroundColor:
                        selectedHour[agency.name] === hour ? '#4cd964' : '#2c2c2e',
                      borderRadius: 8,
                      marginRight: 8,
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: selectedHour[agency.name] === hour ? '700' : '400' }}>
                      {hour}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity style={{ backgroundColor: '#4cd964', padding: 10, borderRadius: 10, marginTop: 10 }}>
                <Text style={{ textAlign: 'center', color: 'black', fontWeight: '600' }}>Select Trip</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Map;
