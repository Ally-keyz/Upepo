import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { setAgency } from '../appSlice/appSlices'
import Modal1 from '../components/Modal'
import SeatSelector from '../components/SeatSelector';
import Map from '../components/booking/map';
import { Ionicons } from '@expo/vector-icons';

function Booking() {
  const origin = useSelector(state => state.origin);
  const destination = useSelector(state => state.destination);
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState('');

  const closeModal = () => {
    setModalVisible(false);
  };

  const HandleOpen = () => {
    setModalVisible(true);
  };

  const handleSubmit = () => {
    if (!origin || !destination || !selectedAgency) {
      Alert.alert('Validation Error', 'Please provide origin, destination, and select an agency.');
      return;
    }

    dispatch(setAgency(selectedAgency));
    navigator.navigate('Tickets', { origin, destination, agency: selectedAgency });
  };

  return (
    <>
     
    </>
  );
}

export default Booking;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#032B44',
    height: Dimensions.get('window').height * 0.96,
    color: 'white',
    fontSize: 27,
    fontWeight: '900'
  },
  Header: {
    height: Dimensions.get('window').height * 0.13,
    justifyContent: 'center',
    paddingHorizontal: Dimensions.get('window').height * 0.02
  },
  HeaderText: {
    color: 'white',
    fontSize: 27,
    fontWeight: '900',
  },
  scrollContainer: {
    backgroundColor: 'white',
    paddingVertical: Dimensions.get('window').height * 0.02
  },
  loginBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5EDF0',
    width: Dimensions.get('screen').width * 0.87,
    height: Dimensions.get('screen').height * 0.90,
    borderRadius: 10,
    position: 'relative',
    top: '-30%',
  },
  loginContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  continueBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5EDF0',
    width: Dimensions.get('screen').width * 0.87,
    height: Dimensions.get('screen').height * 0.09,
    borderRadius: 10,
    position: 'relative',
    top: '30%',

  },
  googleLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Dimensions.get('screen').height * 0.06,
    width: Dimensions.get('screen').width * 0.8,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 15
  },
  googleLoginText: {
    color: '#035B94',
    fontSize: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    color: 'white',

  },
})