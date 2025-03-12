import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        `https://sd1-backend.onrender.com/password/request-reset?email=${email}`
      );

      if (response.status === 200) {
        setMessage("Password reset link sent! Check your email.");
      }
    } catch (err) {
      setError("Error sending reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.homebutton}
        onPress={() => router.replace("/(tabs)")}
      >
        <Icon name="home" size={30} color="#1B5E1E" />
      </TouchableOpacity>

      <Text style={styles.title}>Forgot Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handlePasswordReset}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {message ? <Text style={styles.success}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1B5E1E",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  error: { color: "red", marginTop: 20, textAlign: "center" },
  success: { color: "green", marginTop: 20, textAlign: "center" },
  homebutton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderWidth: 2,
    borderColor: "#1B5E1E",
    borderRadius: 8,
    padding: 2,
    marginBottom: 15,
    marginRight: 330,
  },
  button: {
    backgroundColor: "#1B5E1E",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginRight: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
