// import React, { useState, useEffect } from 'react';
// import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { SafeAreaView, ScrollView } from 'react-native';
// import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import { CameraView, Camera } from "expo-camera";
// import axios from 'axios';

// const DriverScreen = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanning, setScanning] = useState(false);
//   const [scanData, setScanData] = useState(null);
//   const [validTicket, setValidTicket] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [scanned, setScanned] = useState(false);

//   const navigator = useNavigation();

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   useEffect(() => {
//     const getCameraPermissions = async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     };

//     getCameraPermissions();
//   }, []);


//   const handleBarCodeScanned = async ({ type, data }) => {
//     setScanning(false);
//     setLoading(true);

//     try {
//       const parsedData = JSON.parse(data);
//       console.log('Parsed QR code data:', parsedData);
//       const response = await axios.post('https://etix-mobile-app-deployed-1.onrender.com/ticketsRoutes/scanTicks/scanTicket', parsedData);

//       if (response.status === 200) {
//         setValidTicket(true);
//         alert('Ticket is valid and paid');
//       } else {
//         setValidTicket(false);
//         alert('Ticket validation failed');
//       }
//     } catch (err) {

//       setValidTicket(false);
//       alert('the ticket is not valid');
//     } finally {
//       setLoading(false);
//       setScanData(null);

//     }
//   };

//   if (hasPermission === null) {
//     return (
//       <View>
//         <Text>Requesting for camera permission</Text>
//       </View>
//     );
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   const { width } = Dimensions.get('window');
//   const cornerSize = 40;

//   return (
//     <View className='bg-black px-5'>
//       <View className="relative flex-row w-full mt-6 items-center justify-center">
//         <TouchableOpacity
//           className="absolute left-0"
//           onPress={() => { navigator.goBack() }}
//         >
//           <FontAwesome name="chevron-left" size={18} color="white" />
//         </TouchableOpacity>
//         <Text className="text-2xl font-bold text-white">Check Point</Text>
//       </View>
//       <SafeAreaView>
//         <ScrollView>
//           <View className='mt-32 flex-1 items-center justify-center'>
//             <View style={{ width: width * 0.8, height: width * 0.8 }} className="relative">
//               <View className="absolute -top-6 left-0 h-[3px] w-[40px] bg-white" />
//               <View className="absolute -top-6 left-0 w-[3px] h-[40px] bg-white" />
//               <View className="absolute -top-6 right-0 h-[3px] w-[40px] bg-white" />
//               <View className="absolute -top-6 right-0 w-[3px] h-[40px] bg-white" />
//               <View className="absolute -bottom-5 left-0 h-[3px] w-[40px] bg-white" />
//               <View className="absolute -bottom-5 left-0 w-[3px] h-[40px] bg-white" />
//               <View className="absolute -bottom-5 right-0 h-[3px] w-[40px] bg-white" />
//               <View className="absolute -bottom-5 right-0 w-[3px] h-[40px] bg-white" />
//               <View className='flex items-center justify-center'>
//                 {scanning ? (
//                   <View className="bg-white ">
//                     <CameraView
//                       onBarcodeScanned={handleBarCodeScanned}
//                       barcodeScannerSettings={{
//                         barcodeTypes: ["qr"],
//                       }}
//                       style={styles.camera}
//                     />
//                   </View>
//                 ) : (
//                   <Image className='' source={require('../assets/images/qr.png')} />
//                 )}

//               </View>
//             </View>
//           </View>
//           <View className='my-24'>
//             <TouchableOpacity
//               className={`flex-row space-x-3 ${scanning ? 'bg-gray-500' : 'bg-green-500'} py-3 rounded-lg w-full justify-center items-center`}
//               onPress={() => setScanning(true)}
//               disabled={scanning}
//             >
//               <MaterialCommunityIcons name="qrcode-scan" size={22} color="white" />
//               <Text className="text-white text-center text-lg font-bold">
//                 {scanning ? 'Scanning...' : 'Start Scan'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           {/* <View style={styles.box2}>
//             {scanning ? (
//               <BarCodeScanner
//                 style={styles.camera}
//                 onBarCodeScanned={handleBarCodeScanned}
//                 barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
//               >
//                 <View style={styles.cameraContainer}>
//                   <Text style={styles.scanPrompt}>Scanning...</Text>
//                 </View>
//               </BarCodeScanner>
//             ) : (
//               <TouchableOpacity
//                 style={styles.loginButtonContainer}
//                 onPress={() => setScanning(true)}
//               >
//                 <View style={styles.loginButton}>
//                   <Text style={styles.loginButtonText}>Scan</Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//           </View> */}
//           {/* {loading && (
//             <ActivityIndicator size="large" color="#00ff00" />
//           )}
//           {validTicket !== null && (
//             <View style={styles.scanResultContainer}>
//               {validTicket ? (
//                 <Image source={require('../assets/check1.png')} style={styles.icon} />
//               ) : (
//                 <Image source={require('../assets/cross.png')} style={styles.icon} />
//               )}
//               <Text style={styles.scanResultText}>
//                 {validTicket ? 'Valid Ticket' : 'Invalid Ticket'}
//               </Text>
//             </View>
//           )} */}
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CameraView, Camera } from "expo-camera";
import axios from 'axios';

const DriverScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [validTicket, setValidTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);

  const navigator = useNavigation();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = async ({ type, data }) => {
    setScanning(false);
    setScanned(true);
    setLoading(true);

    try {
      const parsedData = JSON.parse(data);
      console.log('Parsed QR code data:', parsedData);
      const response = await axios.post('https://etix-mobile-app-deployed-1.onrender.com/ticketsRoutes/scanTicks/scanTicket', parsedData);

      if (response.status === 200) {
        setValidTicket(true);
        alert('Ticket is valid and paid');
      } else {
        setValidTicket(false);
        alert('Ticket validation failed');
      }
    } catch (err) {
      setValidTicket(false);
      alert('The ticket is not valid');
    } finally {
      setLoading(false);
      setScanData(null);
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const { width } = Dimensions.get('window');

  return (
    <View className='bg-black px-5'>
      <View className="relative flex-row w-full mt-6 items-center justify-center">
        <TouchableOpacity
          className="absolute left-0"
          onPress={() => { navigator.goBack(); }}
        >
          <FontAwesome name="chevron-left" size={18} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white">Check Point</Text>
      </View>
      <SafeAreaView>
        <ScrollView>
          <View className='mt-32 flex-1 items-center justify-center'>
            <View style={{ width: width * 0.8, height: width * 0.8 }} className="relative">
              <View className='flex items-center justify-center'>
                {scanning ? (
                  <CameraView
                    onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                    barcodeScannerSettings={{
                      barcodeTypes: ["qr", "pdf417"],
                    }}
                    style={StyleSheet.absoluteFillObject}
                  />
                ) : (
                  <Image source={require('../assets/images/qr.png')} />
                )}
              </View>
            </View>
          </View>
          <View className='my-24'>
            <TouchableOpacity
              className={`flex-row space-x-3 ${scanning ? 'bg-gray-500' : 'bg-green-500'} py-3 rounded-lg w-full justify-center items-center`}
              onPress={() => setScanning(true)}
              disabled={scanning}
            >
              <MaterialCommunityIcons name="qrcode-scan" size={22} color="white" />
              <Text className="text-white text-center text-lg font-bold">
                {scanning ? 'Scanning...' : 'Start Scan'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerr: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scrollView: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    // backgroundColor: '#032B44',
    height: '100%',
  },
  header: {
    backgroundColor: '#032B44',
    height: 120,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: '25%',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '900',
  },
  box1: {
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 120,
    height: 130,
  },
  box2: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  loginButtonContainer: {
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: '#032B24',
    padding: 15,
    borderRadius: 12,
    width: Dimensions.get('screen').width * 0.5,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  camera: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  scanPrompt: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  scanResultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
  },
  scanResultText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
});

export default DriverScreen;
