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
import axios from "axios";
import { useRouter } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState(18);
  const [experience, setExperience] = useState(1);
  const [strength, setStrength] = useState(1);
  const [endurance, setEndurance] = useState(1);
  const [weightLoss, setWeightLoss] = useState(1);
  const [health, setHealth] = useState(1);
  const [hoursAvailable, setHoursAvailable] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gender, setGender] = useState("");

  const handleSave = async () => {
    if (
      !name ||
      !email ||
      !phone ||
      !weight ||
      !height ||
      !gender ||
      !age ||
      !experience ||
      !strength ||
      !endurance ||
      !weightLoss ||
      !health ||
      !hoursAvailable ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://sd1-backend.onrender.com/auth/signup",
        {
          name,
          email,
          phone,
          weight,
          height,
          age,
          experience,
          strength,
          endurance,
          weightLoss,
          health,
          hoursAvailable,
          password,
          gender,
        }
      );

      if (response.status === 200) {
        alert("Account created successfully!");
        router.push("/verify");
      }
    } catch (err) {
      setError("Error creating account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Create User Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={"#888"}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"#888"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor={"#888"}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        placeholderTextColor={"#888"}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        placeholderTextColor={"#888"}
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <View style={styles.container}>
        <Text style={styles.label}>Select Gender:</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.option, gender === "Male" && styles.selectedOption]}
            onPress={() => setGender("Male")}
          >
            <Text
              style={[
                styles.optionText,
                gender === "Male" && styles.selectedOptionText,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              gender === "Female" && styles.selectedOption,
            ]}
            onPress={() => setGender("Female")}
          >
            <Text
              style={[
                styles.optionText,
                gender === "Female" && styles.selectedOptionText,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>

        {gender ? (
          <Text style={styles.selectedText}>Selected: {gender}</Text>
        ) : null}
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Age: {age}</Text>
        <Slider
          style={styles.slider}
          minimumValue={18}
          maximumValue={100}
          step={1}
          value={age}
          onValueChange={setAge}
        />

        <Text style={styles.sliderLabel}>Experience Level: {experience}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={experience}
          onValueChange={setExperience}
        />

        <Text style={styles.sectionTitle}>Set Your Goals Here!</Text>
        <Text style={styles.subtitle}>
          Move the slider between 1 - 10 to indicate how important each goal is.
        </Text>
        <Text style={styles.subtitleTwo}>
          (Don't worry, these can be changed later)
        </Text>

        <Text style={styles.sliderLabel}>Endurance: {endurance}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={endurance}
          onValueChange={setEndurance}
        />

        <Text style={styles.sliderLabel}>Strength: {strength}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={strength}
          onValueChange={setStrength}
        />

        <Text style={styles.sliderLabel}>Weight Loss: {weightLoss}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={weightLoss}
          onValueChange={setWeightLoss}
        />

        <Text style={styles.sliderLabel}>Health: {health}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={health}
          onValueChange={setHealth}
        />

        <Text style={styles.sliderLabel}>
          Hours Available: {hoursAvailable}
        </Text>
        <Text style={styles.subtitle}>
          How much time can you spare to workout each week?
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={20}
          step={0.5}
          value={hoursAvailable}
          onValueChange={setHoursAvailable}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"#888"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor={"#888"}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Signing Up..." : "Sign Up!"}
          onPress={handleSave}
          disabled={loading}
        />
        <View style={styles.buttonSpacing} />
        <Button
          title="Back to Sign in"
          onPress={() => router.push("/signin")}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  sliderContainer: {
    marginVertical: 10,
  },
  sliderLabel: {
    marginTop: 10,
    marginBottom: 5,
  },
  slider: {
    height: 40,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  subtitleTwo: {
    fontSize: 10,
    color: "#666",
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonSpacing: {
    height: 10,
  },
  error: {
    color: "red",
    marginTop: 20,
    textAlign: "center",
  },
  dropdownBtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  dropdownBtnTextStyle: {
    textAlign: "left",
    color: "#444",
    fontSize: 16,
  },
  dropdownStyle: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
  },
  dropdownRowTextStyle: {
    color: "#444",
    textAlign: "left",
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    color: "white",
  },
  selectedText: {
    marginTop: 16,
    fontSize: 16,
  },
});
