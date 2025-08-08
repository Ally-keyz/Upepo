import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DEEP_BLUE = '#0A1F3A';
const PRIMARY_BLUE = '#007AFF';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#8E8E93';

const TicketCard = ({ tickets = [] }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const navigator = useNavigation();

  const handlePaymentRedirect = () => {
    navigator.navigate('Payment', { price: selectedTicket.price });
  };

  return (
    <View style={styles.container}>
      {tickets?.map((ticket) => (
        <TouchableOpacity
          key={ticket._id}
          style={[
            styles.card,
            selectedTicket?._id === ticket._id && styles.selectedCard
          ]}
          onPress={() => setSelectedTicket(ticket)}
          activeOpacity={0.9}
        >
          {/* Header Row */}
          <View style={styles.headerRow}>
            <Text style={styles.agencyText}>{ticket.agency}</Text>
            <Text style={styles.priceText}>{ticket.price}Rwf</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Journey Details */}
          <View style={styles.journeyContainer}>
            {/* Origin */}
            <View style={styles.timeContainer}>
              <Text style={styles.locationText}>{ticket.origin}</Text>
              <Text style={styles.timeText}>
                {format(new Date(ticket.departureTime), 'hh:mm a')}
              </Text>
              <Text style={styles.dateText}>
                {format(new Date(ticket.departureTime), 'dd MMM yyyy')}
              </Text>
            </View>

            {/* Bus Icon */}
            <Ionicons name="bus" size={24} color={PRIMARY_BLUE} />

            {/* Destination */}
            <View style={[styles.timeContainer, styles.alignRight]}>
              <Text style={styles.locationText}>{ticket.destination}</Text>
              <Text style={styles.timeText}>
                {format(new Date(ticket.arrivalTime), 'hh:mm a')}
              </Text>
            </View>
          </View>

          {/* Driver Info & Buy Button */}
          <View style={styles.footer}>
            <View>
              <Text style={styles.driverText}>Driver: {ticket.driverName}</Text>
              <Text style={styles.driverText}>Plate: {ticket.driverCarPlate}</Text>
            </View>

            {selectedTicket?._id === ticket._id && (
              <TouchableOpacity
                style={styles.buyButton}
                onPress={handlePaymentRedirect}
              >
                <Text style={styles.buyButtonText}>Buy Ticket</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: DEEP_BLUE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: PRIMARY_BLUE,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  agencyText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '600',
  },
  priceText: {
    color: PRIMARY_BLUE,
    fontSize: 20,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: LIGHT_GRAY,
    marginVertical: 12,
    opacity: 0.3,
  },
  journeyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeContainer: {
    flex: 1,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  locationText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  timeText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  dateText: {
    color: LIGHT_GRAY,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  driverText: {
    color: LIGHT_GRAY,
    fontSize: 14,
    lineHeight: 20,
  },
  buyButton: {
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buyButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TicketCard;