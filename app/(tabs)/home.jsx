import React, { useRef, useEffect , useState } from 'react';
import LottieView from 'lottie-react-native';
import { View, Text, Image, TouchableOpacity, TextInput ,Platform , ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import Voice from '@react-native-voice/voice';
import { Audio } from 'expo-av';
import { OpenAI } from 'openai';
import { OPENAI_KEY } from '@env'


function Home() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateText, setDateText] = useState('Select date');
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const lottieRef = useRef(null);

  const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  });
  
  useEffect(() => {
  if (!lottieRef.current) return;
  if (isRecording) {
    // play/loop the animation
    lottieRef.current.play();
  } else {
    // stop and reset to first frame
    lottieRef.current.reset();
  }
}, [isRecording]);

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

    // 🔊 Play sound helper
  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
    // Optionally unload after playing to free memory
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  };
  
  const startRecording = async () => {
    try {
      await playSound(require('../assets/sounds/start.mp3'));
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();

      console.log('Starting recording..');
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

    const stopRecording = async () => {
    console.log('Stopping recording..');
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    await playSound(require('../assets/sounds/start.mp3'));
    setIsTranscribing(true); // Start spinner
    
    // Send to Whisper API
    try {
      const file = {
        uri,
        name: 'audio.m4a',
        type: 'audio/m4a',
      };

      const formData = new FormData();
      formData.append('file', file);
      formData.append('model', 'whisper-1');
      formData.append("language", "en");

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openai.apiKey}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log('Transcription:', data.text);
      setTranscript(data.text);
    } catch (error) {
      console.error('Whisper API error:', error);
    }finally{
      setIsTranscribing(false); // Stop spinner
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

      {/* Search Section  */}
      <View className="mx-5 mt-4 p-4 rounded-lg bg-white backdrop-blur-md  ">
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
            className="flex-1 items-center justify-center rounded-lg py-3 bg-gray-100/50 "
          >
            <Icon name="search" size={16} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={isRecording ? stopRecording : startRecording}
            className="flex-3 bg-black rounded-lg p-3 items-center justify-center shadow-sm flex-row space-x-2"
          >
    {isRecording ? (
    <LottieView
      ref={lottieRef}
      source={require('../assets/animations/rec-mic.json')}
      autoPlay={false}        
      loop={true}
      style={{ width: 48, height: 48 }}
    />
  ) : (
    <Icon name="mic-outline" size={24} color="white" />
  )}
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 20, textAlign: 'center' }}>
        {transcript || 'Press the mic to start speaking'}
      </Text>
        {isTranscribing && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ marginTop: 10 }}>Transcribing...</Text>
        </View>
      )}
      </View>

      {/* Rest of the content */}
    </View>
  );
}

export default Home;