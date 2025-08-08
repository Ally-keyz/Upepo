import React, { useState } from 'react';
import { SafeAreaView, View, Image, Animated, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome } from '@expo/vector-icons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const navigator = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const opacity = new Animated.Value(0);

  const handleLogin = async () => {
    // navigator.navigate('Test');
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Please fill in both email and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://192.168.43.76:2002/userAuth/userlogin', {
        userEmail: email,
        userPassword: password
      });

      if (response.status === 200) {
        // Save token to AsyncStorage
        await AsyncStorage.setItem('token', response.data.token);

        setEmail('');
        setPassword('');
        navigator.navigate('Test');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert('Login Error', error.response.data.error);
      } else {
        Alert.alert('Login Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const HandlePress = (e) => {
    e.preventDefault();
    navigator.navigate('Agency Login');
  };

  return (
    <ScrollView
      contentContainerStyle={{ height: Dimensions.get('window').height * 1 }}
      style={{ flex: 1, width: '100%' }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#035B94', width: '100%' }}>
        {/* <View style={styles.title}>
          <TouchableOpacity
            onPress={() => {
              router.navigate('../')
            }}
          >
            <FontAwesome name="chevron-left" size={20} />
          </TouchableOpacity>
          <Text style={styles.title}>Sign Up</Text>
        </View> */}
        {/* <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: '0%', backgroundColor: 'red' }}>
          <TouchableOpacity
            onPress={() => {
              router.navigate('../')
            }}
          >
            <FontAwesome name="chevron-left" size={20} />
          </TouchableOpacity>
          <Text style={styles.title}>Sign Up</Text>
        </View> */}
        <View style={styles.loginContainer}>
          <Animated.View
            style={[
              styles.modal,
              { opacity, display: isVisible ? 'flex' : 'none' },
            ]}
          >
            <TouchableOpacity onPress={() => navigator.navigate('AgencyLogin')}>
              <Text style={styles.modalButton}>Login as Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigate('AdminSignup')}>
              <Text style={styles.modalButton}>Signup as Admin</Text>
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.loginBox}>
            <TouchableOpacity style={styles.googleLoginButton}>
              <Image
                style={styles.googleIcon}
                resizeMode="contain"
                source={require('/app/assets/google.png')}
              />
              <Text style={styles.googleLoginText}>Login with Google</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot password</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>or</Text>
            <TouchableOpacity>
              <Text style={styles.signupLink} onPress={HandlePress}>Login as Driver</Text>
            </TouchableOpacity>
            <Text style={styles.signupText}>
              Don't have an account?
              <Text style={styles.signupLink} onPress={() => navigator.navigate('Signup')}>
                Signup
              </Text>
            </Text>
            <TouchableOpacity onPress={handleLogin} style={styles.loginButtonContainer}>
              <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>{loading ? <ActivityIndicator size={30} color={'white'} /> : 'Login'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
    paddingLeft: 10,
    gap: 100,
    alignItems: "center",
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
  },
  loginContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loginBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5EDF0',
    width: Dimensions.get('screen').width * 0.90,
    height: Dimensions.get('screen').height * 0.65,
    borderRadius: 10,
    position: 'relative',
    top: '-30%',
  },
  googleLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Dimensions.get('screen').height * 0.06,
    width: Dimensions.get('screen').width * 0.8,
    backgroundColor: '#035B94',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 20,
  },
  googleIcon: {
    width: 30,
    height: 23,
  },
  googleLoginText: {
    color: 'white',
    fontSize: 15,
  },
  input: {
    height: Dimensions.get('screen').height * 0.07,
    width: Dimensions.get('screen').width * 0.8,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },
  forgotPasswordText: {
    fontSize: 18,
    color: '#032B44',
    fontWeight: '600',
    marginBottom: 10,
  },
  orText: {
    fontSize: 20,
  },
  signupText: {
    fontSize: 18,
    color: '#032B44',
    fontWeight: '600',
  },
  signupLink: {
    fontSize: 20,
    fontWeight: '900',
    color: '#032B44',
  },
  loginButtonContainer: {
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: '#035B94',
    padding: 15,
    borderRadius: 12,
    width: Dimensions.get('screen').width * 0.5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default LoginScreen;
