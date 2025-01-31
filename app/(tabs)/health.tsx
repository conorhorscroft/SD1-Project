import React, { useEffect, useState } from "react";

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
import { SafeAreaView } from "react-native-safe-area-context";
// import useHealthData from "@/hooks/useHealthData";

/* Permission options */
const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
    ],
    // write: [AppleHealthKit.Constants.Permissions.Steps],
  },
} as HealthKitPermissions;

export default function HealthScreen() {
  // const { steps, distance, flights } = useHealthData();

  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [flights, setFlights] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(0);

  useEffect(() => {
    // Request HealthKit permissions
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.error("HealthKit permissions error:", err);
        return;
      }

      // Fetch data after permissions are granted
      fetchHealthData();
    });
  }, []);

  const fetchHealthData = async () => {
    try {
      setLoading(true);

      // Fetch step count
      AppleHealthKit.getStepCount(
        { date: new Date().toISOString() },
        (err, results: HealthValue) => {
          if (err) {
            console.error("Error fetching steps:", err);
            return;
          }
          setSteps(results.value);
        }
      );

      // Fetch distance walked/running
      AppleHealthKit.getDistanceWalkingRunning(
        { date: new Date().toISOString() },
        (err, results: HealthValue) => {
          if (err) {
            console.error("Error fetching distance:", err);
            return;
          }
          setDistance(results.value);
        }
      );

      // Fetch flights climbed
      AppleHealthKit.getFlightsClimbed(
        { date: new Date().toISOString() },
        (err, results: HealthValue) => {
          if (err) {
            console.error("Error fetching flights:", err);
            return;
          }
          setFlights(results.value);
        }
      );
      AppleHealthKit.getActiveEnergyBurned(
        {
          startDate: new Date(2025, 0, 21).toISOString(), // Start date
          endDate: new Date().toISOString(), // End date
        },
        (err, results: HealthValue[]) => {
          if (err) {
            console.error("Error fetching Active Energy:", err);
            return;
          }

          // Check if the results are valid and contain energy data
          if (results && results.length > 0 && results[0].value !== undefined) {
            setEnergy(results[0].value);
          } else {
            console.log("No data found for Active Energy.");
            setEnergy(0); // Set a default value
          }
        }
      );
    } catch (error) {
      console.error("Error fetching HealthKit data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Health Stats from Today</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {/* Steps */}
            <View style={styles.dataBlock}>
              <Text style={styles.label}>Steps</Text>
              <Text style={styles.value}>{steps.toString()}</Text>
            </View>

            {/* Distance */}
            <View style={styles.dataBlock}>
              <Text style={styles.label}>Distance</Text>
              <Text style={styles.value}>
                {(distance / 1000).toFixed(2)} km
              </Text>
            </View>

            {/* Flights Climbed */}
            <View style={styles.dataBlock}>
              <Text style={styles.label}>Flights Climbed</Text>
              <Text style={styles.value}>{flights.toString()}</Text>
            </View>

            {/* Energy Burned */}
            <View style={styles.dataBlock}>
              <Text style={styles.label}>Energy Burned</Text>
              <Text style={styles.value}>
                {energy !== undefined
                  ? Math.round(energy).toString() + " Kcal"
                  : "0 Kcal"}
              </Text>
            </View>
          </>
        )}
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
  dataBlock: {
    width: "100%",
    backgroundColor: "#e0e0e0",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
});
