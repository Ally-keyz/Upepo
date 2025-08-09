import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput ,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import Voice from '@react-native-voice/voice';


function Home() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateText, setDateText] = useState('Select date');

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep open on iOS, close on Android
    if (selectedDate) {
      setDate(selectedDate);
      // Format the date nicely
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      setDateText(formattedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

    // States for transcription and listening
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = () => {
      setIsListening(true);
    };
    Voice.onSpeechResults = (event) => {
      setTranscript(event.value[0]);
      // You can call NLP here with event.value[0]
      console.log('Final result:', event.value[0]);
    };
    Voice.onSpeechPartialResults = (event) => {
      setTranscript(event.value[0]);
      console.log('Partial result:', event.value[0]);
      // Optionally do wake word detection here
      if (event.value[0].toLowerCase().includes('upepo')) {
        console.log('Wake word detected');
        // Start actual command listening or confirm UI state
      }
    };
    Voice.onSpeechEnd = () => {
      setIsListening(false);
    };
    Voice.onSpeechError = (e) => {
      console.error('Speech error:', e);
      setIsListening(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start('en-US'); // or 'sw-KE' for Kiswahili if supported
      setTranscript('');
    } catch (e) {
      console.error('Failed to start listening:', e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error('Failed to stop listening:', e);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header with Logo and Notification */}
      <View className="flex-row items-center justify-between p-5">
        {/* Logo */}
        <Image
          source={require('../assets/logo.png')}
          className="w-32 h-20"
          resizeMode="contain"
        />

        {/* Notification Button */}
        <TouchableOpacity onPress={() => console.log('Notification pressed')}>
          <View className="w-10 h-10 rounded-xl bg-gray-100 shadow-sm items-center justify-center">
            <Icon name="notifications-outline" size={20} color="#000" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Section with Glassy Effect */}
      <View className="mx-5 mt-4 p-5 rounded-lg bg-white backdrop-blur-md  ">
        {/* Origin Input */}
        <View className="mb-3">
          <Text className="text-gray-500 text-xs mb-1 ml-2">From</Text>
          <View className="flex-row items-center bg-gray-50/70 rounded-lg px-3 py-2.5 ">
            <Icon name="location-outline" size={16} color="#6b7280" className="mr-2" />
            <TextInput
              placeholder="Current location"
              placeholderTextColor="#9ca3af"
              className="flex-1 text-black text-sm"
            />
            <View className="flex-row items-center space-x-2">
              <TouchableOpacity onPress={() => console.log('Voice input for origin')}>
                <Icon name="mic-outline" size={16} color="#6b7280" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="close-circle" size={16} color="#d1d5db" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Destination Input */}
        <View className="mb-3">
          <Text className="text-gray-500 text-xs mb-1 ml-2">To</Text>
          <View className="flex-row items-center bg-gray-50/70 rounded-lg px-3 py-2.5 ">
            <Icon name="navigate-outline" size={16} color="#6b7280" className="mr-2" />
            <TextInput
              placeholder="Where to?"
              placeholderTextColor="#9ca3af"
              className="flex-1 text-black text-sm"
            />
            <TouchableOpacity onPress={() => console.log('Voice input for destination')}>
              <Icon name="mic-outline" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Input */}
        <View className="mb-4">
          <Text className="text-gray-500 text-xs mb-1 ml-2">When</Text>
          <TouchableOpacity 
            onPress={showDatepicker}
            className="flex-row items-center bg-gray-50/70 rounded-lg px-3 py-3 "
          >
            <Icon name="calendar-outline" size={16} color="#6b7280" className="mr-2" />
            <Text className="flex-1 text-black text-sm">
              {dateText}
            </Text>
            <Icon name="chevron-down" size={16} color="#9ca3af" />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={onChangeDate}
              minimumDate={new Date()}
              accentColor="#000" // iOS only
              themeVariant="light" // iOS only
            />
          )}
        </View>

        <View className="flex-row space-x-3">
          <TouchableOpacity 
            onPress={() => console.log('Voice search pressed')}
            className="flex-1 items-center justify-center rounded-lg py-3 bg-gray-100 "
          >
            <Icon name="search" size={16} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={isListening ? stopListening : startListening}
            className="flex-3 bg-black rounded-lg p-3 items-center justify-center shadow-sm flex-row space-x-2"
          >
            
            <Icon name={isListening ? 'mic' : 'mic-outline'} size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Rest of the content */}
    </View>
  );
}

export default Home;