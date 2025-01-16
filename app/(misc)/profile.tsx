import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { Link } from "expo-router";


export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(18); // Slider for Age
  const [experience, setExperience] = useState(1); // Slider for Experience Level

  const handleSave = () => {
    // Add functionality to save or handle the user info here
    alert(
      `User Info: \nName: ${name} \nEmail: ${email} \nPhone: ${phone} \nAge: ${age} \nExperience Level: ${experience}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* Age Slider */}
      <Text>Age: {age}</Text>
      <Slider
        style={styles.slider}
        minimumValue={18}
        maximumValue={100}
        step={1}
        value={age}
        onValueChange={(value) => setAge(value)}
      />

      {/* Experience Level Slider */}
      <Text>Experience Level: {experience}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={experience}
        onValueChange={(value) => setExperience(value)}
      />

      <Button title="Save" onPress={handleSave} />
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  slider: {
    height: 40,
    marginVertical: 10,
  },
});
