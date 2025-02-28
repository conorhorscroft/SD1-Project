import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { NavigationProp } from "@react-navigation/native";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

type RootStackParamList = {
  login: undefined;
  profile: undefined;
  verify: undefined;
};

type LoginScreenProps = {
  navigation: NavigationProp<RootStackParamList, "verify">;
};

export default function Login({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerification = async () => {
    if (!email || !verificationCode) {
      setError("Please enter your email and verification code.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://sd1-backend.onrender.com/auth/verify",
        {
          email,
          verificationCode,
        }
      );

      if (response.status === 200) {
        // Account verified
        alert("Account successfully verified!");
        // Navigate to log-in page
        router.push("/signin");
      }
    } catch (err) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //TODO: implement button to re-send verification email

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.homebutton}
        onPress={() => router.replace("/(tabs)")}
      >
        <Icon name="home" size={30} color="#1B5E1E" />
      </TouchableOpacity>
      <Text style={styles.title}>Verify Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerification}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Verifying..." : "Verify"}
        </Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
