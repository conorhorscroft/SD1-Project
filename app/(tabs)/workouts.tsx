import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function WorkoutScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Workouts</Text>

        {/* Placeholder for most recent workoutout */}
        <View style={styles.placeholder}>
          <Text>Most Recent Workout Placeholder</Text>
        </View>

        {/* Placeholder for previous workouts */}
        <View style={styles.placeholder}>
          <Text>Previous Workouts Placeholder</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  placeholder: {
    width: "100%",
    height: 400,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
