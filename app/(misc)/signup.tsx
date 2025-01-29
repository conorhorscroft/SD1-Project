import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useRouter } from "expo-router";

export default function SignUp({ navigation }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState(18); // Slider for Age
  const [experience, setExperience] = useState(1); // Slider for Experience Level
  const [password, setPassword] = useState(""); // Password field
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password field
  const [loading, setLoading] = useState(false); // Correctly initializing loading state
  const [error, setError] = useState("");

  // function to handle POST request for account creation
  const handleSave = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/user", {
        name,
        email,
        phone,
        weight,
        height,
        age,
        experience,
        password,
      });

      if (response.status === 201) {
        alert("Account created successfully!");
        router.push("/signin");
      }
    } catch (err) {
      setError("Error creating account. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when request finishes
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create User Profile</Text>

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
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Height"
        value={height}
        onChangeText={setHeight}
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

      {/* Password Fields */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Button
        title={loading ? "Signing Up..." : "Sign Up!"}
        onPress={handleSave}
        disabled={loading}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
  button: {
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    marginTop: 20,
    textAlign: "center",
  },
});
