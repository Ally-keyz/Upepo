import { _View, SafeAreaView, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import Test from '../(tabs)/test';




const Landing = () => {

  const [count, setCount] = useState(0)
  const navigation = useNavigation()
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(1);
    }, 2000); // 1000ms = 1 second

    return () => clearTimeout(timer);

  }, []);



  if (count === 0) {

    return (
      <SafeAreaView style={styles.container}>

        <View>
          <Image
            fadeDuration={2000}
            style={{
              resizeMode: 'contain',
              height: 200,
              width: 200
            }} className='' source={
              require('../assets/upepoLogo.png')} />
        </View>
      </SafeAreaView>

    )
  } else {
    return (
      <>
        <SafeAreaView className='' style={{  flex: 1, }}>
          <Test />
        </SafeAreaView>
      </>
    )
  }
};



export default Landing


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1
  }
})