import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const WorkoutForm = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setRefreshKey((prev) => prev + 1);

      const interval = setInterval(() => {
        setRefreshKey((prev) => prev + 1);
      }, 2000);

      return () => clearInterval(interval);
    }, [])
  );

  const { token, user } = useAuth();

  const AuthDebugDisplay = () => {
    const [debugInfo, setDebugInfo] = useState({ token: null, userId: null });
    const { token, user } = useAuth();

    useEffect(() => {
      setDebugInfo({
        token: token,
        userId: user?.id,
      });
    }, [token, user]);

    return (
      <View style={styles.debugContainer}>
        <Text style={styles.debugTitle}>Debug Info:</Text>
        <ScrollView horizontal style={styles.debugScroll}>
          <Text style={styles.debugText}>User ID: {debugInfo.userId}</Text>
        </ScrollView>
        <ScrollView horizontal style={styles.debugScroll}>
          <Text style={styles.debugText}>Token: {debugInfo.token}</Text>
        </ScrollView>
      </View>
    );
  };

  const [formData, setFormData] = useState({
    exerciseName: "",
    date: new Date(),
    sets: "",
    reps: "",
    weight: "0",
    distance: "0",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showExercisePicker, setShowExercisePicker] = useState(false);

  const exerciseOptions = [
    "Push-up",
    "Pull-up",
    "Squat",
    "Deadlift",
    "Bench Press",
    "Running",
    "Cycling",
  ];

  const handleSubmit = async () => {
    console.log("handleSubmit function called");

    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    const requestData = {
      exerciseName: formData.exerciseName,
      date: formData.date.toISOString().split("T")[0],
      sets: parseInt(formData.sets),
      reps: parseInt(formData.reps),
      weight: parseFloat(formData.weight),
      distance: parseFloat(formData.distance),
    };

    console.log(
      "Request URL:",
      `https://sd1-backend.onrender.com/api/workouts/${user?.id}`
    );
    console.log("Request Data:", requestData);
    console.log("Headers:", { Authorization: `Bearer ${token}` });

    try {
      const response = await axios.post(
        `https://sd1-backend.onrender.com/api/workouts/${user?.id}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response Data:", response.data);

      setFormData({
        exerciseName: "",
        date: new Date(),
        sets: "",
        reps: "",
        weight: "0",
        distance: "0",
      });

      alert("Workout saved successfully!");
    } catch (error) {
      console.error("Error saving workout:", error);
      alert("Error saving workout. Please try again.");
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, date: selectedDate }));
    }
  };

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.exerciseItem}
      onPress={() => {
        setFormData((prev) => ({ ...prev, exerciseName: item }));
        setShowExercisePicker(false);
      }}
    >
      <Text style={styles.exerciseItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Workout</Text>
      <AuthDebugDisplay key={refreshKey} />
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Exercise</Text>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowExercisePicker(true)}
        >
          <Text style={styles.pickerButtonText}>
            {formData.exerciseName || "Select an exercise"}
          </Text>
        </TouchableOpacity>

        <Modal visible={showExercisePicker} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Exercise</Text>
              <SafeAreaView style={styles.exerciseList}>
                <FlatList
                  data={exerciseOptions}
                  renderItem={renderExerciseItem}
                  keyExtractor={(item) => item}
                />
              </SafeAreaView>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowExercisePicker(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{formData.date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={formData.date}
            mode="date"
            onChange={onDateChange}
          />
        )}
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Sets</Text>
        <TextInput
          style={styles.input}
          value={formData.sets}
          onChangeText={(value) =>
            setFormData((prev) => ({ ...prev, sets: value }))
          }
          keyboardType="numeric"
          placeholder="Number of sets"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Reps</Text>
        <TextInput
          style={styles.input}
          value={formData.reps}
          onChangeText={(value) =>
            setFormData((prev) => ({ ...prev, reps: value }))
          }
          keyboardType="numeric"
          placeholder="Number of reps"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          value={formData.weight}
          onChangeText={(value) =>
            setFormData((prev) => ({ ...prev, weight: value }))
          }
          keyboardType="numeric"
          placeholder="Weight in kg (0 if bodyweight)"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Distance (km)</Text>
        <TextInput
          style={styles.input}
          value={formData.distance}
          onChangeText={(value) =>
            setFormData((prev) => ({ ...prev, distance: value }))
          }
          keyboardType="numeric"
          placeholder="Distance in km"
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          console.log("Button Pressed");
          handleSubmit();
        }}
      >
        <Text style={styles.submitButtonText}>Save Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WorkoutForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  exerciseList: {
    maxHeight: 300,
  },
  exerciseItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  exerciseItemText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  debugContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  debugScroll: {
    marginBottom: 5,
  },
  debugText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#666",
  },
});
