import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const DEEP_BLUE = 'white';
const WHITE = 'black';
const ACCENT_BLUE = '#2A4D73';
const LIGHT_GRAY = 'white';

const TicketCard = ({ tickets }) => {
  const navigator = useNavigation();
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <View style={styles.container}>
      {tickets.map((ticket) => (
        <TouchableOpacity
          onPress={() => {
            setSelectedTicket(ticket);
            navigator.navigate('Payment');
          }}
          key={ticket._id}
          style={[
            styles.card,
            selectedTicket?._id === ticket._id && styles.selectedCard
          ]}
          activeOpacity={0.9}
        >
          {/* Card Header */}
          <View style={styles.header}>
            <Ionicons name="bus" size={20} color={ACCENT_BLUE} />
            <Text style={styles.price}>${ticket.price}</Text>
          </View>
          
          {/* Remaining Tickets */}
          <Text style={styles.remaining}>5 Left</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Journey Details */}
          <View style={styles.journeyContainer}>
            {/* Origin */}
            <View style={styles.timeBlock}>
              <Text style={styles.city}>{ticket.origin}</Text>

            </View>

            {/* Duration */}
            <Text style={styles.duration}>Horizon</Text>

            {/* Destination */}
            <View style={[styles.timeBlock, styles.alignRight]}>
              <Text style={styles.city}>{ticket.destination}</Text>
              <Text style={styles.time}>
                {format(new Date(ticket.arrivalTime), 'hh:mm a')}
              </Text>
              <Text style={styles.date}>
                {format(new Date(ticket.arrivalTime), 'dd MMM yyyy')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: LIGHT_GRAY,
  },
  card: {
    backgroundColor: DEEP_BLUE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: ACCENT_BLUE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    color: ACCENT_BLUE,
    fontSize: 20,
    fontWeight: '700',
  },
  remaining: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#2A4D73',
    marginVertical: 8,
  },
  journeyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeBlock: {
    flex: 1,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  city: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  time: {
    color: '#2A4D73',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  date: {
    color: '#8E8E93',
    fontSize: 14,
  },
  duration: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 12,
  },
  buyButton: {
    backgroundColor: ACCENT_BLUE,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#C7C7CC',
  },
  buttonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TicketCard;