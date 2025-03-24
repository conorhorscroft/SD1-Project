import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native"; // React Native UI components
import axios from "axios"; // For HTTP GET/POST requests
import { router } from "expo-router"; // For page navigation
import { useAuth } from "@/hooks/useAuth"; // Authentication hook

// Log-in page
export default function Login() {
  // State variables to store email, password, loading status, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login function from authentication hook
  const { login } = useAuth();

  // function to handle user log-in
  const handleLogin = async () => {
    setLoading(true); // change loading state to true
    setError(""); // reset error message

    try {
      // send login request with email and password to backend API
      const response = await axios.post(
        "https://sd1-backend.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      // If successful, store user data and navigate to the index page
      if (response.status === 200) {
        await login(response.data);
        router.replace("/(tabs)");
      }
    } catch (err) {
      // If fails, update error message
      setError("Invalid credentials. Please try again.");
    } finally {
      // reset loading state
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Login Title */}
      <Text style={styles.title}>Login</Text>

      {/* Email Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {/* Show loading indicator while logging in */}
        <Text style={styles.buttonText}>
          {loading ? "Logging In..." : "Log In"}
        </Text>
      </TouchableOpacity>

      {/* Navigation Links */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/signup")}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/verify")}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Verify Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/forgot-password")}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Display error message if login fails */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F8F9FA",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  error: { color: "red", marginTop: 20, textAlign: "center" },
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
