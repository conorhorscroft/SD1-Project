import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Profile() {
  const [name, setName] = useState("Joe Bloggs");
  const [email, setEmail] = useState("person@example.com");
  const [phone, setPhone] = useState("123-555-6576");
  const [weight, setWeight] = useState("80");
  const [height, setHeight] = useState("175");
  const [age, setAge] = useState(18); // Slider for Age
  const [experience, setExperience] = useState(3); // Slider for Experience Level

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone: {phone}</Text>
      <Text>Weight: {weight}kg</Text>
      <Text>Height: {height}cm</Text>
      <Text>Age: {age} years</Text>
      <Text>Experience Level: {experience}</Text>

      <Link href="/(misc)/signup" style={styles.link}>
        Create an Account
      </Link>
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
  link: {
    fontSize: 28,
    fontWeight: "bold",
    padding: 40,
  },
});
