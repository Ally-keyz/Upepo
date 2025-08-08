// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
// import { ScrollView } from 'react-native-gesture-handler';
// import { useNavigation, useRoute } from '@react-navigation/native';


// const Seat = ({ status, onPress, seatIndex }) => {
//     const getColor = () => {
//         switch (status) {
//             case 'available':
//                 return '#D3D3D3';
//             case 'selected':
//                 return '#FFA500';
//             case 'filled':
//                 return '#0000FF';
//             default:
//                 return '#D3D3D3';
//         }
//     };

//     return (
//         <TouchableOpacity
//             onPress={status === 'filled' ? null : onPress}
//             className={`px-2 py-1 ${seatIndex === 2 ? 'ml-20' : ''}`}
//             disabled={status === 'filled'}
//         >
//             <MaterialIcons name="chair" size={30} color={getColor()} />
//         </TouchableOpacity>
//     );
// };

// const Seats = () => {
//     const route = useRoute();

//     const { origin, destination, agency } = route.params;
//     console.log("The params in seats are: ", origin, destination, agency);



//     const navigator = useNavigation();
//     const rows = 10;
//     const cols = 4;
//     const initialSeats = Array.from({ length: rows }, () => Array(cols).fill('available'));

//     const [seats, setSeats] = useState(initialSeats);
//     const [selectedSeat, setSelectedSeat] = useState(null);

//     const handleSeatSelect = (rowIndex, seatIndex) => {
//         const newSeats = [...seats];
//         const currentStatus = newSeats[rowIndex][seatIndex];

//         newSeats.forEach((row, rIndex) => {
//             row.forEach((seat, sIndex) => {
//                 if (seat === 'selected') {
//                     newSeats[rIndex][sIndex] = 'available';
//                 }
//             });
//         });

//         if (currentStatus === 'available') {
//             newSeats[rowIndex][seatIndex] = 'selected';
//             setSelectedSeat({ row: rowIndex + 1, col: String.fromCharCode(65 + seatIndex) }); // Store selected seat as row and col (e.g., 8D)
//         } else if (currentStatus === 'selected') {
//             newSeats[rowIndex][seatIndex] = 'available';
//             setSelectedSeat(null);
//         }
//         setSeats(newSeats);
//     };

//     const name = "Elissa DUSABE"

//     return (
//         <ScrollView>
//             <View className="px-4">
//                 <View className="relative flex-row w-full mt-8 items-center justify-center">
//                     <TouchableOpacity
//                         className="absolute left-0"
//                         onPress={() => { navigator.goBack() }}
//                     >
//                         <FontAwesome name="chevron-left" size={20} color="black" />
//                     </TouchableOpacity>
//                     <Text className="text-xl font-bold">Select Seat</Text>
//                 </View>
//                 <View className="mt-7">
//                     <View className="border border-blue-500 rounded p-4 mb-4">
//                         <View className="flex-row items-center justify-between">
//                             <Text className="text-lg font-bold">{name}</Text>
//                             <FontAwesome name="check-circle" size={20} color="#FFA500" />
//                         </View>
//                         <View className="flex-row items-center mt-2">
//                             <Text className="text-gray-500 font-semibold">Your seat</Text>
//                             <Text className="text-gray-500 mx-2">•</Text>
//                             <Text className="text-gray-700 font-bold">{selectedSeat ? `${selectedSeat.row}${selectedSeat.col}` : 'Select a seat'}</Text>
//                         </View>
//                     </View>
//                     <View className="flex-row justify-around mt-4">
//                         <View className="flex-row items-center">
//                             <MaterialIcons name="chair" size={24} color="#D3D3D3" />
//                             <Text className="ml-2">Available</Text>
//                         </View>
//                         <View className="flex-row items-center">
//                             <MaterialIcons name="chair" size={24} color="#FFA500" />
//                             <Text className="ml-2">Selected</Text>
//                         </View>
//                         <View className="flex-row items-center">
//                             <MaterialIcons name="chair" size={24} color="#0000FF" />
//                             <Text className="ml-2">Filled</Text>
//                         </View>
//                     </View>
//                 </View>
//                 <View className="flex-row justify-center mb-2 mt-3">
//                     {['A', 'B', 'C', 'D'].map((col, index) => (
//                         <Text key={index} className={`w-10 mr-1 text-lg font-bold text-center ${col === 'C' ? 'ml-20' : ''}`}>
//                             {col}
//                         </Text>
//                     ))}
//                 </View>
//                 {seats.map((row, rowIndex) => (
//                     <View key={rowIndex} className="flex-row justify-center mb-2">
//                         {row.map((seat, seatIndex) => (
//                             <Seat
//                                 key={seatIndex}
//                                 status={seat}
//                                 onPress={() => handleSeatSelect(rowIndex, seatIndex)}
//                                 style={seatIndex === 2 ? { marginRight: 16 } : {}}
//                                 seatIndex={seatIndex}
//                             />
//                         ))}
//                         <Text className="absolute ml-3 mt-1 text-lg font-bold">{rowIndex + 1}</Text>
//                     </View>
//                 ))}
//                 <TouchableOpacity
//                     className={`p-3 my-4 ${!selectedSeat ? 'bg-gray-400' : 'bg-blue-500'}`}
//                     onPress={() => navigator.navigate('Tickets', { origin, destination, agency })}
//                     disabled={!selectedSeat}
//                 >
//                     <Text className="text-center text-white">Book a ticket</Text>
//                 </TouchableOpacity>
//             </View>
//         </ScrollView>
//     );
// };

// export default Seats;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Seat = ({ status, onPress }) => {
    const getColor = () => {
        switch (status) {
            case 'available':
                return '#D3D3D3';
            case 'selected':
                return '#FFA500';
            case 'filled':
                return '#0000FF';
            default:
                return '#D3D3D3';
        }
    };

    return (
        <TouchableOpacity
            onPress={status === 'filled' ? null : onPress}
            className="px-2 py-1"
            disabled={status === 'filled'}
        >
            <MaterialIcons name="chair" size={30} color={getColor()} />
        </TouchableOpacity>
    );
};

const Seats = () => {
    const route = useRoute();
    const { origin, destination, agency } = route.params;

    const navigator = useNavigation();

    const TOTAL_SEATS = 64;
    const rows = Math.ceil(TOTAL_SEATS / 5); // 5 seats max in the last row

    const initialSeats = Array.from({ length: rows }, (_, rowIndex) => {
        if (rowIndex === 0) {
            return ['available', 'available', null, null, 'available'];
        }
        if (rowIndex === rows - 1) {
            return ['available', 'available', 'available', 'available', 'available'];
        }
        return ['available', 'available', null, 'available', 'available'];
    });

    const [seats, setSeats] = useState(initialSeats);
    const [selectedSeat, setSelectedSeat] = useState(null);

    const handleSeatSelect = (rowIndex, seatIndex) => {
        const newSeats = [...seats];
        const currentStatus = newSeats[rowIndex][seatIndex];

        newSeats.forEach((row, rIndex) => {
            row.forEach((seat, sIndex) => {
                if (seat === 'selected') {
                    newSeats[rIndex][sIndex] = 'available';
                }
            });
        });

        if (currentStatus === 'available') {
            newSeats[rowIndex][seatIndex] = 'selected';
            setSelectedSeat({ row: rowIndex + 1, col: String.fromCharCode(65 + seatIndex) });
        } else if (currentStatus === 'selected') {
            newSeats[rowIndex][seatIndex] = 'available';
            setSelectedSeat(null);
        }
        setSeats(newSeats);
    };

    const name = "Elissa DUSABE";

    return (
        <ScrollView>
            <View className="px-4">
                <View className="relative flex-row w-full mt-8 items-center justify-center">
                    <TouchableOpacity
                        className="absolute left-0"
                        onPress={() => navigator.goBack()}
                    >
                        <FontAwesome name="chevron-left" size={20} color="black" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold">Select Seat</Text>
                </View>
                <View className="mt-7">
                    <View className="border border-blue-500 rounded p-4 mb-4">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-lg font-bold">{name}</Text>
                            <FontAwesome name="check-circle" size={20} color="#FFA500" />
                        </View>
                        <View className="flex-row items-center mt-2">
                            <Text className="text-gray-500 font-semibold">Your seat</Text>
                            <Text className="text-gray-500 mx-2">•</Text>
                            <Text className="text-gray-700 font-bold">{selectedSeat ? `${selectedSeat.row}${selectedSeat.col}` : 'Select a seat'}</Text>
                        </View>
                    </View>
                    <View className="flex-row justify-center mb-2 mt-3">
                        {['A', 'B', 'C', 'D', 'E'].map((col, index) => (
                            <Text key={index} className="w-10 text-lg font-bold text-center">
                                {col}
                            </Text>
                        ))}
                    </View>
                    {seats.map((row, rowIndex) => (
                        <View key={rowIndex} className="flex-row justify-center mb-2">
                            {row.map((seat, seatIndex) =>
                                seat !== null ? (
                                    <Seat
                                        key={seatIndex}
                                        status={seat}
                                        onPress={() => handleSeatSelect(rowIndex, seatIndex)}
                                    />
                                ) : (
                                    <View key={seatIndex} style={{ width: 40, height: 40 }} />
                                )
                            )}
                            {/* Show row numbers except for the last row */}
                            {rowIndex !== rows - 1 && (
                                <Text className="absolute ml-3 mt-1 text-lg font-bold">
                                    {rowIndex + 1}
                                </Text>
                            )}
                        </View>
                    ))}
                    <TouchableOpacity
                        className={`p-3 my-4 ${!selectedSeat ? 'bg-gray-400' : 'bg-blue-500'}`}
                        onPress={() => navigator.navigate('Tickets', { origin, destination, agency })}
                        disabled={!selectedSeat}
                    >
                        <Text className="text-center text-white">Book a ticket</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Seats;

