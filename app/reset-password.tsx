import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordReset = async () => {
    if (!newPassword) {
      Alert.alert("Please enter a new password");
      return;
    }

    try {
      const response = await fetch(
        `https://sd1-backend.onrender.com/auth/reset-password`, //TODO: update URL
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      if (response.ok) {
        Alert.alert("Password reset successful!", "", [
          { text: "OK", onPress: () => router.push("/") },
        ]);
      } else {
        Alert.alert("Error resetting password.");
      }
    } catch (error) {
      Alert.alert("Network error, please try again.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter your new password:</Text>
      <TextInput
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />
      <Button title="Reset Password" onPress={handlePasswordReset} />
    </View>
  );
}
