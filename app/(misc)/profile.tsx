import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link, useNavigation } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { User, Mail, Scale, Ruler, Calendar, Star } from "lucide-react-native";

export default function Profile() {
  const { user, logout } = useAuth();

  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false, title: "Home" });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Profile Information */}
        <View style={styles.card}>
          <Text style={styles.heading}>Profile Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <User size={20} color="#4A90E2" />
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.infoText}>{user?.name}</Text>
            </View>
            <View style={styles.row}>
              <Mail size={20} color="#4A90E2" />
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.infoText}>{user?.email}</Text>
            </View>
            <View style={styles.row}>
              <Scale size={20} color="#4A90E2" />
              <Text style={styles.label}>Weight:</Text>
              <Text style={styles.infoText}>{user?.weight} kg</Text>
            </View>
            <View style={styles.row}>
              <Ruler size={20} color="#4A90E2" />
              <Text style={styles.label}>Height:</Text>
              <Text style={styles.infoText}>{user?.height} cm</Text>
            </View>
            <View style={styles.row}>
              <Calendar size={20} color="#4A90E2" />
              <Text style={styles.label}>Age:</Text>
              <Text style={styles.infoText}>{user?.age} years</Text>
            </View>
            <View style={styles.row}>
              <Star size={20} color="#4A90E2" />
              <Text style={styles.label}>Experience:</Text>
              <Text style={styles.infoText}>{user?.experience}</Text>
            </View>
          </View>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
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
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginLeft: 8,
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
});
