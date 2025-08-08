import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, TextInput, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Modal1 from '../components/Modal';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import TicketCard from '../components/tickets/ticketCard';


const Tickets = () => {
  const route = useRoute();
  const navigator = useNavigation();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ticketFromData, setTicketFromData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [debitCardNumber, setDebitCardNumber] = useState('');
  const [debitCardExpiry, setDebitCardExpiry] = useState('');
  const [debitCardCVC, setDebitCardCVC] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const { ticket, origin, destination, agency } = route.params || {};
  console.log("The params in tickets are: ", origin, destination, agency);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          'https://etix-mobile-app-deployed-1.onrender.com/ticketsRoutes/findTicks/findTickets',
          { origin, destination, agency },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const result = response.data;
        console.log("Fetched tickets:", result);
        if (Array.isArray(result) && result.length > 0) {
          setTickets(result);
        } else {
          Alert.alert('No Tickets Found', 'No tickets available.');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    if (origin && destination && agency) {
      fetchTickets();
    }
  }, [route.params]);


  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handlePayment = async () => {
    if (!selectedTicket) {
      Alert.alert('Error', 'Please select a ticket.');
      return;
    }

    if (!paymentMethod) {
      Alert.alert('Error', 'Please select a payment method.');
      return;
    }

    if (!selectedTicket.driverCarPlate || !selectedTicket.driverName) {
      Alert.alert('Error', 'Failed because the ticket lacks one or more required details. Please try again.');
      return;
    }

    let paymentDetails = {
      ticketId: selectedTicket.ticketId,
      paymentMethod,
      clientName,
      arrivalTime: selectedTicket.arrivalTime,
      vehicleNumber: selectedTicket.driverCarPlate,
    };

    if (paymentMethod === 'airtel' || paymentMethod === 'MTN') {
      if (!phoneNumber || !clientName) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }
      paymentDetails.phoneNumber = phoneNumber;
    } else if (paymentMethod === 'debit') {
      if (!clientName || !debitCardNumber || !debitCardExpiry || !debitCardCVC) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }
      paymentDetails.debitCardNumber = debitCardNumber;
      paymentDetails.debitCardExpiry = debitCardExpiry;
      paymentDetails.debitCardCVC = debitCardCVC;
    }



    try {
      const response = await fetch('http://192.168.43.76:2000/handlePayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.paymentStatus === 'successful') {
        Alert.alert('Success', 'Payment successful!');

        await handleGetYourBoughtTicket({
          userName: clientName,
          origin: selectedTicket.origin,
          destination: selectedTicket.destination,
          price: selectedTicket.price,
          departureTime: selectedTicket.departureTime,
          arrivalTime: selectedTicket.arrivalTime,
          vehicleNumber: selectedTicket.driverCarPlate,
          paymentStatus: 'successful',
          agency: selectedTicket.agency,
        });

      } else {
        Alert.alert('Failure', 'Payment failed. Please try again.');
      }

      setModalVisible(false);
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Error', 'Failed to process payment.');
      setModalVisible(false);
    }
  };

  const handleGetYourBoughtTicket = async (ticketDetails) => {

    try {
      const response = await fetch('https://etix-mobile-app-deployed-1.onrender.com//ticketsRoutes/getYourBoughtTicks/getYourBoughtTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketDetails),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.newTicket) {
        Alert.alert('Success', 'Ticket fetched successfully!');
        setTicketFromData(result.newTicket);


        // // Navigate to Notification screen with the ticket details
        // navigation.navigate('notification', { ticket: result.newTicket });
      } else {
        Alert.alert('Failure', 'Failed to fetch the ticket. Please try again.');
      }
    } catch (error) {
      console.error('Fetch ticket error:', error);
      Alert.alert('Error', 'Failed to fetch the ticket.');
    }
  };

  const handlePaymentRedirect = () => {
    navigator.navigate('Payment')
  }


  return (
    <View className='px-2 mb-10 bg-white'>
      <View className="relative flex-row w-full mt-8 p-5 items-center justify-center">
        <TouchableOpacity
          className="absolute left-5"
          onPress={() => { navigator.goBack() }}
        >
          <FontAwesome name="chevron-left" className="text-[#2A4D73]" size={20} color="#2A4D73" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#2A4D73]">Find Ticket</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View className="flex-1 items-center  justify-center h-[480px]">
            <ActivityIndicator size="large" color="gray" />
            <Text className="mt-2 text-gray-500 font-semibold text-base">Loading tickets...</Text>
          </View>
        ) : tickets.length > 0 ? (
          <TicketCard tickets={tickets} />
        ) : (
          <View className="flex items-center justify-center h-[480px]">
            <Text style={styles.noTicketsText}>No tickets found.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ea',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    paddingVertical: 20
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buyButtonContainer: {
    marginTop: 10,
    backgroundColor: '#6200ea',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buyButton: {
    color: '#fff',
    fontSize: 16,
  },
  noTicketsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  modalHeader: {
    backgroundColor: '#6200ea',
    padding: 15,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 20,
  },
  paymentOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  paymentOptionButton: {
    alignItems: 'center',
  },
  paymentOptionText: {
    fontSize: 16,
  },
  paymentForm: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  confirmButtonContainer: {
    backgroundColor: '#6200ea',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  confirmButton: {
    color: '#fff',
    fontSize: 16,
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrCodeImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  validationMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Tickets;
