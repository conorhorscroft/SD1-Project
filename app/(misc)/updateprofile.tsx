import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { router } from "expo-router";
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
import Slider from "@react-native-community/slider";

export default function UpdateProfile() {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    weight: user?.weight?.toString() || "",
    height: user?.height?.toString() || "",
    age: user?.age?.toString() || "",
    gender: user?.gender || "",
    experience: user?.experience || 0,
    strength: user?.strength || 0,
    endurance: user?.endurance || 0,
    weightLoss: user?.weightLoss || 0,
    health: user?.health || 0,
    hoursAvailable: user?.hoursAvailable || 0,
  });

  const handleUpdate = async () => {
    Alert.alert(
      "Confirm Update",
      "Are you sure you want to update your profile?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Update",
          onPress: async () => {
            try {
              // Convert string values to numbers where needed
              const updatedData = {
                ...formData,
                age: parseInt(formData.age),
                weight: parseFloat(formData.weight),
                height: parseFloat(formData.height),
                experience: formData.experience,
                strength: formData.strength,
              };

              await updateUser(updatedData);
              Alert.alert("Success", "Profile updated successfully!");
              router.replace("/profile");
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to update profile. Please try again."
              );
              console.error("Failed to update profile:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.homebutton}
              onPress={() => router.back()}
            >
              <Icon name="arrow-left" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.heading}>Update Profile</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.inputRow}>
              <User size={20} color="#4A90E2" />
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="Enter your name"
              />
            </View>

            <View style={styles.inputRow}>
              <Mail size={20} color="#4A90E2" />
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputRow}>
              <Phone size={20} color="#4A90E2" />
              <Text style={styles.label}>Phone:</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
                placeholder="Enter your phone number"
              />
            </View>

            <View style={styles.inputRow}>
              <Scale size={20} color="#4A90E2" />
              <Text style={styles.label}>Weight:</Text>
              <TextInput
                style={styles.input}
                value={formData.weight}
                onChangeText={(text) =>
                  setFormData({ ...formData, weight: text })
                }
                placeholder="Enter your weight"
                keyboardType="numeric"
              />
              <Text style={styles.unit}>kg</Text>
            </View>

            <View style={styles.inputRow}>
              <Ruler size={20} color="#4A90E2" />
              <Text style={styles.label}>Height:</Text>
              <TextInput
                style={styles.input}
                value={formData.height}
                onChangeText={(text) =>
                  setFormData({ ...formData, height: text })
                }
                placeholder="Enter your height"
                keyboardType="numeric"
              />
              <Text style={styles.unit}>cm</Text>
            </View>

            <View style={styles.inputRow}>
              <User size={20} color="#4A90E2" />
              <Text style={styles.label}>Gender:</Text>
              <TextInput
                style={styles.input}
                value={formData.gender}
                onChangeText={(text) =>
                  setFormData({ ...formData, gender: text })
                }
                placeholder="Enter your gender"
              />
            </View>

            <View style={styles.inputRow}>
              <Calendar size={20} color="#4A90E2" />
              <Text style={styles.label}>Age:</Text>
              <TextInput
                style={styles.input}
                value={formData.age}
                onChangeText={(text) => setFormData({ ...formData, age: text })}
                placeholder="Enter your age"
                keyboardType="numeric"
              />
              <Text style={styles.unit}>years</Text>
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Star size={20} color="#4A90E2" />
                <Text style={styles.label}>Experience:</Text>
                <Text style={styles.experienceValue}>
                  {formData.experience}
                </Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={1}
                value={formData.experience}
                onValueChange={(value) =>
                  setFormData({ ...formData, experience: value })
                }
                minimumTrackTintColor="#4A90E2"
                maximumTrackTintColor="#ddd"
                thumbTintColor="#4A90E2"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>Beginner</Text>
                <Text style={styles.sliderLabel}>Expert</Text>
              </View>
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <BicepsFlexed size={20} color="#4A90E2" />
                <Text style={styles.label}>Strength Goal:</Text>
                <Text style={styles.experienceValue}>{formData.strength}</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={1}
                value={formData.strength}
                onValueChange={(value) =>
                  setFormData({ ...formData, strength: value })
                }
                minimumTrackTintColor="#4A90E2"
                maximumTrackTintColor="#ddd"
                thumbTintColor="#4A90E2"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>Not so Important</Text>
                <Text style={styles.sliderLabel}>Very Important</Text>
              </View>
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Bike size={20} color="#4A90E2" />
                <Text style={styles.label}>Endurance Goal:</Text>
                <Text style={styles.experienceValue}>{formData.endurance}</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={1}
                value={formData.endurance}
                onValueChange={(value) =>
                  setFormData({ ...formData, endurance: value })
                }
                minimumTrackTintColor="#4A90E2"
                maximumTrackTintColor="#ddd"
                thumbTintColor="#4A90E2"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>Not so Important</Text>
                <Text style={styles.sliderLabel}>Very Important</Text>
              </View>
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Weight size={20} color="#4A90E2" />
                <Text style={styles.label}>Weight Loss Goal:</Text>
                <Text style={styles.experienceValue}>
                  {formData.weightLoss}
                </Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={1}
                value={formData.weightLoss}
                onValueChange={(value) =>
                  setFormData({ ...formData, weightLoss: value })
                }
                minimumTrackTintColor="#4A90E2"
                maximumTrackTintColor="#ddd"
                thumbTintColor="#4A90E2"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>Not so Important</Text>
                <Text style={styles.sliderLabel}>Very Important</Text>
              </View>
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <HeartPulse size={20} color="#4A90E2" />
                <Text style={styles.label}>Health Goal:</Text>
                <Text style={styles.experienceValue}>{formData.health}</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={1}
                value={formData.health}
                onValueChange={(value) =>
                  setFormData({ ...formData, health: value })
                }
                minimumTrackTintColor="#4A90E2"
                maximumTrackTintColor="#ddd"
                thumbTintColor="#4A90E2"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>Not so Important</Text>
                <Text style={styles.sliderLabel}>Very Important</Text>
              </View>
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Hourglass size={20} color="#4A90E2" />
                <Text style={styles.label}>Hours Per Week Available:</Text>
                <Text style={styles.experienceValue}>
                  {formData.hoursAvailable}
                </Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={20}
                step={0.5}
                value={formData.hoursAvailable}
                onValueChange={(value) =>
                  setFormData({ ...formData, hoursAvailable: value })
                }
                minimumTrackTintColor="#4A90E2"
                maximumTrackTintColor="#ddd"
                thumbTintColor="#4A90E2"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>Less</Text>
                <Text style={styles.sliderLabel}>More</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Save Changes</Text>
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginLeft: 8,
    width: 100,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
  },
  unit: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
  sliderContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sliderHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#666",
  },
  experienceValue: {
    fontSize: 16,
    color: "#4A90E2",
    marginLeft: 8,
  },
});
