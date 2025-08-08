import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import Coordinates from '../../utils/coordinates';

const Map = () => {
    const [userLocation, setUserLocation] = useState(null);
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
            console.log(currentLocation.coords);
        } catch (error) {
            console.error('Error fetching user location:', error);
        }
    };

    const originCoords = Coordinates[origin] || null;
    const destinationCoords = Coordinates[destination] || null;

    console.log(originCoords, destinationCoords);
    console.log(userLocation);



    return (
        <View>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ height: Dimensions.get('window').height}}
                initialRegion={{
                    latitude: -1.9441,
                    longitude: 30.0619,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                {userLocation && (
                    <Marker
                        coordinate={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                        }}
                        title="You are here"
                    />
                )}

                {originCoords && (
                    <Marker
                        coordinate={{
                            latitude: originCoords.latitude,
                            longitude: originCoords.longitude,
                        }}
                        title={`Origin: ${origin}`}
                        pinColor="green"
                    />
                )}

                {destinationCoords && (
                    <Marker
                        coordinate={{
                            latitude: destinationCoords.latitude,
                            longitude: destinationCoords.longitude,
                        }}
                        title={`Destination: ${destination}`}
                        pinColor="red"
                    />
                )}

                {originCoords && destinationCoords && (
                    <Polyline
                        coordinates={[
                            {
                                latitude: originCoords.latitude,
                                longitude: originCoords.longitude,
                            },
                            {
                                latitude: destinationCoords.latitude,
                                longitude: destinationCoords.longitude,
                            },
                        ]}
                        strokeColor="#FF0000"
                        strokeWidth={2}
                    />
                )}
            </MapView>
        </View>
    );
};

export default Map;