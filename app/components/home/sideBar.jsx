import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const SideBar = ({ toggleOffCanvas, offCanvasStyle }) => {
    const navigator = useNavigation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("token");
            navigator.navigate("Login");
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    return (
        <Animated.View style={[styles.offCanvas, offCanvasStyle]}>
            <View
                style={{
                    height: Dimensions.get("window").height * 0.17,
                    width: "100%",
                    alignSelf: "center",
                    borderRadius: 5,
                    position: "absolute",
                    top: "0%",
                    left: "0%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#035B94",
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "900",
                        position: "absolute",
                        top: "34%",
                        left: "3%",
                    }}
                >
                    Menu
                </Text>
                <TouchableOpacity
                    onPress={toggleOffCanvas}
                    style={styles.closeButton}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        color={"white"}
                        size={23}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => navigator.navigate("Schedule")}
                style={{
                    height: "4%",
                    width: "63%",
                    alignSelf: "center",
                    backgroundColor: "#E5EDF0",
                    borderRadius: 5,
                    position: "absolute",
                    top: "20%",
                    left: "4%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View fadeDuration={2000}>
                    <Text style={{ fontSize: 17, fontWeight: "900", color: "#032B44" }}>
                        Schedule
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    height: "4%",
                    width: "63%",
                    alignSelf: "center",
                    backgroundColor: "#032B25",
                    borderRadius: 5,
                    position: "absolute",
                    top: "25%",
                    left: "4%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View fadeDuration={3000}>
                    <Text style={{ fontSize: 17, fontWeight: "900", color: "white" }}>
                        History
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    height: "4%",
                    width: "63%",
                    alignSelf: "center",
                    backgroundColor: "#032B05",
                    borderRadius: 5,
                    position: "absolute",
                    top: "30%",
                    left: "4%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View fadeDuration={4000}>
                    <Text style={{ fontSize: 17, fontWeight: "900", color: "white" }}>
                        Booked Tickets
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleLogout}
                style={{
                    height: "4%",
                    width: "63%",
                    alignSelf: "center",
                    backgroundColor: "#035B94",
                    borderRadius: 5,
                    position: "absolute",
                    top: "35%",
                    left: "4%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View fadeDuration={4000}>
                    <Text style={{ fontSize: 17, fontWeight: "900", color: "white" }}>
                        Log Out
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default SideBar


const styles = StyleSheet.create({
    offCanvas: {
        position: "absolute",
        top: "0%",
        bottom: "0%",
        width: Dimensions.get("window").width * 0.8,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderLeftWidth: 1,
        borderLeftColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get("window").width * 2,
        zIndex: 1,
    },
    closeButton: {
        position: "absolute",
        padding: 5,
        left: "80%",
        top: "36%",
    }
});