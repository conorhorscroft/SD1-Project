import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link, router, useNavigation } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import {
  User,
  Mail,
  Scale,
  Ruler,
  Calendar,
  Star,
  Phone,
  BicepsFlexed,
  Bike,
  Weight,
  HeartPulse,
  Hourglass,
} from "lucide-react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.homebutton}
              onPress={() => router.replace("/(tabs)")}
            >
              <Icon name="home" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.heading}>Profile Information</Text>
          </View>
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
              <Phone size={20} color="#4A90E2" />
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.infoText}>{user?.phone}</Text>
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
              <User size={20} color="#4A90E2" />
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.infoText}>{user?.gender} </Text>
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
            <View style={styles.row}>
              <BicepsFlexed size={20} color="#4A90E2" />
              <Text style={styles.label}>Strength Goal:</Text>
              <Text style={styles.infoText}>{user?.strength}</Text>
            </View>
            <View style={styles.row}>
              <Bike size={20} color="#4A90E2" />
              <Text style={styles.label}>Endurance Goal:</Text>
              <Text style={styles.infoText}>{user?.endurance}</Text>
            </View>
            <View style={styles.row}>
              <Weight size={20} color="#4A90E2" />
              <Text style={styles.label}>Weight Loss Goal:</Text>
              <Text style={styles.infoText}>{user?.weightLoss}</Text>
            </View>
            <View style={styles.row}>
              <HeartPulse size={20} color="#4A90E2" />
              <Text style={styles.label}>Health Goal:</Text>
              <Text style={styles.infoText}>{user?.health}</Text>
            </View>
            <View style={styles.row}>
              <Hourglass size={20} color="#4A90E2" />
              <Text style={styles.label}>Hours per week Goal:</Text>
              <Text style={styles.infoText}>{user?.hoursAvailable}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonrow}>
          <TouchableOpacity style={styles.button}>
            <Link href="/updateprofile">
              <Text style={styles.buttonText}>Update Profile Details</Text>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
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
    marginLeft: 10,
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
  buttonrow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    padding: 10,
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
  homebutton: {
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    padding: 2,
    marginBottom: 15,
    marginRight: 10,
  },
});
