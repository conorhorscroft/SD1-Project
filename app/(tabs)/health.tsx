import React, { useEffect, useState, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import AppleHealthKit, {
  HealthKitPermissions,
  HealthValue,
  HealthInputOptions,
  HealthUnit,
} from "react-native-health";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

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

const chartConfig = {
  backgroundGradientFrom: "#0a3d2e",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#2E7D32",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(255, 184, 77, ${opacity})`,
  strokeWidth: 4,
  barPercentage: 0.6,
  useShadowColorFromDataset: false,
};

export default function HealthScreen() {
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [flights, setFlights] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(0);
  const [stepsData, setStepsData] = useState<number[]>(new Array(7).fill(0)); // Store steps for each day

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

  const getLastSevenDays = () => {
    const dates = [];
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of day

    for (let i = 6; i >= 0; i--) {
      const endDate = new Date(today);
      endDate.setDate(today.getDate() - i);
      endDate.setHours(23, 59, 59, 999);

      const startDate = new Date(endDate);
      startDate.setHours(0, 0, 0, 0);

      dates.push({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        label: startDate.toLocaleDateString("en-US", { weekday: "short" }),
      });
    }

    return dates;
  };

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

      // Fetch active energy burned
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

      // Fetch weekly steps
      const options = {
        startDate: new Date(
          new Date().setDate(new Date().getDate() - 6)
        ).toISOString(), // 1 week ago
        endDate: new Date().toISOString(), // today
      };

      AppleHealthKit.getDailyStepCountSamples(
        options,
        (err: Object, results: Array<Object>) => {
          if (err) {
            console.error("Error fetching weekly steps:", err);
            return;
          }
          console.log("Raw step data:", results);

          const weeklySteps = new Array(7).fill(0);

          results.forEach(({ startDate, value }) => {
            const date = new Date(startDate); //convert ISO string to Date object
            const dayIndex = date.getDay(); // Get day index (0 = Sunday...)

            // Shift Sunday (0) to index 6 for a Monday–Sunday format
            const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;

            weeklySteps[adjustedIndex] += value; // Sum up values per day
          });

          setStepsData(weeklySteps);
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
      <View style={styles.chartContainer}>
        <View style={styles.chartWrapper}>
          <ProgressChart
            data={{ labels: ["Energy burned"], data: [energy / 2500] }}
            width={screenWidth - 40}
            height={200}
            strokeWidth={12}
            radius={42}
            chartConfig={chartConfig}
            hideLegend={true}
          />
          <Text style={styles.chartLabel}>{`Energy Burned\n${Math.round(
            energy
          )} Kcal`}</Text>
        </View>
        <View style={styles.barChart}>
          <BarChart
            // style={graphStyle}
            data={{
              labels: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              datasets: [
                {
                  data: stepsData,
                  // data: [1245, 5049, 4093, 9059],
                },
              ],
            }}
            width={screenWidth - 20}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </View>

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
  chartContainer: {
    backgroundColor: "#2E7D32",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    alignItems: "center",
    overflow: "hidden",
    paddingTop: 0,
  },
  chartWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  chartLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFB84D",
    textAlign: "center",
    marginRight: 50,
    marginLeft: -80,
  },
  barChart: {},
});
