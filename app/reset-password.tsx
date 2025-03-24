import { useLocalSearchParams, useRouter } from "expo-router"; // Enable deep linking to page
import { useState } from "react"; // Manage component state
import { View, Text, TextInput, Button, Alert } from "react-native"; // React Native UI components

// Page to handle password reset
export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams(); // Retrieve the reset token from the URL parameter
  const router = useRouter(); // Hook to enable navigation
  const [newPassword, setNewPassword] = useState(""); // State for new password input

  // Function to handle password reset request
  const handlePasswordReset = async () => {
    if (!newPassword) {
      Alert.alert("Please enter a new password"); // Alert if no password entered
      return;
    }

    try {
      const response = await fetch(
        // Call backend API endpoint
        `https://sd1-backend.onrender.com/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }), // Pass token and new password as JSON
        }
      );

      if (response.ok) {
        // Show success alert and navigate to root (will bring to log-in page as not authenticated)
        Alert.alert("Password reset successful!", "", [
          { text: "OK", onPress: () => router.push("/") },
        ]);
      } else {
        // Show error if fails
        Alert.alert("Error resetting password.");
      }
    } catch (error) {
      Alert.alert("Network error, please try again.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Prompt for user input */}
      <Text>Enter your new password:</Text>

      {/* Password input field */}
      <TextInput
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />

      {/* Button to submit new password */}
      <Button title="Reset Password" onPress={handlePasswordReset} />
    </View>
  );
}
