import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
 

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileButton}>
        <Link href="/(misc)/profile">
        <Ionicons name="person-circle" size={32} color="black" />
        </Link>
      </TouchableOpacity>
      <Text style={styles.title}>Welcome to SlainteFit!</Text>
      <View style={styles.placeholder}>
        <Text>Graphics Here</Text>
      </View>
      <View style={styles.placeholder}>
        <Text>More Info here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  placeholder: {
    width: "100%",
    height: 300,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  profileButton: {
    position: "absolute",
    top: 20,
    right: 20, 
    zIndex: 10, 
  },
});
