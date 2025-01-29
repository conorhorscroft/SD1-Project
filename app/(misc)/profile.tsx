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

export default function Profile() {
  const [name, setName] = useState("Joe Bloggs");
  const [email, setEmail] = useState("person@example.com");
  const [phone, setPhone] = useState("123-555-6576");
  const [weight, setWeight] = useState("80");
  const [height, setHeight] = useState("175");
  const [age, setAge] = useState(18); // Slider for Age
  const [experience, setExperience] = useState(3); // Slider for Experience Level

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
          <Text style={styles.infoText}>Name: {name}</Text>
          <Text style={styles.infoText}>Email: {email}</Text>
          <Text style={styles.infoText}>Phone: {phone}</Text>
          <Text style={styles.infoText}>Weight: {weight}kg</Text>
          <Text style={styles.infoText}>Height: {height}cm</Text>
          <Text style={styles.infoText}>Age: {age} years</Text>
          <Text style={styles.infoText}>Experience Level: {experience}</Text>
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
