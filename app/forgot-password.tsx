import React, { useState } from "react"; // For managing component state
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native"; // React Native UI components
import axios from "axios"; // For making HTTP GET/POST requests
import { router } from "expo-router"; // For navigation
import Icon from "react-native-vector-icons/FontAwesome"; // UI Icons

// Handles Password reset function
export default function ForgotPassword() {
  // State variables
  const [email, setEmail] = useState(""); // Stores email input
  const [loading, setLoading] = useState(false); // Track if request in progress
  const [message, setMessage] = useState(""); // Store success message
  const [error, setError] = useState(""); // Store error message

  // Function to handle password reset request
  const handlePasswordReset = async () => {
    if (!email) {
      // If no email entered, show error
      setError("Please enter your email.");
      return;
    }

    setLoading(true); // Initialise loading state
    setError(""); // Clear previous errors
    setMessage(""); // Clear previous messages

    try {
      // Send password reset request to backend API
      const response = await axios.post(
        `https://sd1-backend.onrender.com/password/request-reset?email=${email}`
      );

      if (response.status === 200) {
        setMessage("Password reset link sent! Check your email."); // Success Message
      }
    } catch (err) {
      setError("Error sending reset link. Please try again."); // Error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <View style={styles.container}>
      {/* Home button */}
      <TouchableOpacity
        style={styles.homebutton}
        onPress={() => router.replace("/(tabs)")}
      >
        <Icon name="home" size={30} color="#1B5E1E" />
      </TouchableOpacity>

      {/* Page Title */}
      <Text style={styles.title}>Forgot Password</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Reset Request Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handlePasswordReset}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Sending..." : "Send Reset Link"}{" "}
          {/* Button text changes based on loading state*/}
        </Text>
      </TouchableOpacity>

      {/* Display error or success message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {message ? <Text style={styles.success}>{message}</Text> : null}
    </View>
  );
}

// Local component styling
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
