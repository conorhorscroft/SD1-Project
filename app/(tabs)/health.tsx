import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AppleHealthKit, {
  HealthKitPermissions,
  HealthValue,
} from "react-native-health";
import useHealthData from "@/hooks/useHealthData";

export default function HealthScreen() {
  const { steps, distance, flights } = useHealthData();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health</Text>

      {/* Placeholder for daily steps chart */}
      <View style={styles.placeholder}>
        {/* <Value label="Steps" value={steps.toString()} />
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />
        <Value label="Flights Climbed" value={flights.toString()} /> */}
        <Text>Daily Steps Chart Placeholder</Text>
      </View>

      {/* Placeholder for water intake chart */}
      <View style={styles.placeholder}>
        <Text>Water Intake Chart Placeholder</Text>
      </View>
    </View>
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
