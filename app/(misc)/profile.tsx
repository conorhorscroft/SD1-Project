import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useNavigation } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user, logout } = useAuth();

  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false, title: "Home" });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>User Profile</Text>

        {/* Profile Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Name: {user?.name}</Text>
          <Text style={styles.infoText}>Email: {user?.email}</Text>
          <Text style={styles.infoText}>Weight: {user?.weight}kg</Text>
          <Text style={styles.infoText}>Height: {user?.height}cm</Text>
          <Text style={styles.infoText}>Age: {user?.age} years</Text>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity style={styles.button}>
          <Link href="/(misc)/signup">
            <Text>Create an Account</Text>
          </Link>
        </TouchableOpacity>

        {/* Sign-in Button */}
        <TouchableOpacity style={styles.button}>
          <Link href="/(misc)/signin">
            <Text>Sign in</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  infoContainer: {
    marginBottom: 30,
  },
  infoText: {
    fontSize: 18,
    color: "#555",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
