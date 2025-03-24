import { useState, useEffect } from "react";
import AppleHealthKit, {
  HealthKitPermissions,
  HealthValue,
} from "react-native-health";

// Define permissions required to read data from Apple HealthKit
const PERMISSIONS = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
    ],
  },
} as HealthKitPermissions;

// Define structure of health data to be returned
interface HealthData {
  loading: boolean;
  steps: number;
  distance: number;
  flights: number;
  energy: number;
  stepsData: number[];
  chartLabels: string[];
  distanceData: number[];
  refreshData: () => Promise<void>;
}

// Fetch and manage health data and return as interface above
function useHealthData(): HealthData {
  // State variables for storing health data
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [flights, setFlights] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(0);
  const [stepsData, setStepsData] = useState<number[]>(new Array(7).fill(0));
  const [chartLabels, setChartLabels] = useState<string[]>([]); // Labels for chart (days of week)
  const [distanceData, setDistanceData] = useState<number[]>(
    new Array(7).fill(0)
  );

  // Helper function to process weekly data and labels
  const prepareDynamicLabelsAndData = (
    results: Array<any>,
    dataType: "steps" | "distance"
  ) => {
    // Set labels for last 7 days
    const daysOfWeek = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
    const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });

    // Initialise array for storing processed data
    const weeklyData = new Array(7).fill(0);

    // Process results and map to each day
    results.forEach(({ startDate, value }) => {
      const date = new Date(startDate);
      const matchingDayIndex = lastSevenDays.findIndex(
        (day) =>
          day.toISOString().split("T")[0] === date.toISOString().split("T")[0]
      );

      if (matchingDayIndex !== -1) {
        weeklyData[matchingDayIndex] +=
          dataType === "distance" ? Number((value / 1000).toFixed(2)) : value; // Convert from m to km
      }
    });

    // Map last seven days to corresponding label
    const dynamicLabels = lastSevenDays.map((day) => daysOfWeek[day.getDay()]);
    return { labels: dynamicLabels, processedData: weeklyData };
  };

  // Fetch data from HealthKit
  const fetchHealthData = async () => {
    try {
      setLoading(true);

      // Fetch current day's data
      AppleHealthKit.getStepCount(
        { date: new Date().toISOString() },
        (err, results: HealthValue) => {
          if (!err) setSteps(results.value);
        }
      );

      AppleHealthKit.getDistanceWalkingRunning(
        { date: new Date().toISOString() },
        (err, results: HealthValue) => {
          if (!err) setDistance(results.value);
        }
      );

      AppleHealthKit.getFlightsClimbed(
        { date: new Date().toISOString() },
        (err, results: HealthValue) => {
          if (!err) setFlights(results.value);
        }
      );

      // Define variable for last 7 days date range
      const options = {
        startDate: new Date(
          new Date().setDate(new Date().getDate() - 6)
        ).toISOString(),
        endDate: new Date().toISOString(),
      };

      // Fetch weekly data
      AppleHealthKit.getDailyStepCountSamples(
        options,
        (err: Object, results: Array<Object>) => {
          if (!err) {
            const { labels, processedData } = prepareDynamicLabelsAndData(
              results,
              "steps"
            );
            setChartLabels(labels);
            setStepsData(processedData);
          }
        }
      );

      AppleHealthKit.getDailyDistanceWalkingRunningSamples(
        options,
        (err: Object, results: Array<Object>) => {
          if (!err) {
            const { processedData } = prepareDynamicLabelsAndData(
              results,
              "distance"
            );
            setDistanceData(processedData);
          }
        }
      );

      // Fetch energy data
      AppleHealthKit.getActiveEnergyBurned(
        {
          startDate: new Date(2025, 0, 21).toISOString(),
          endDate: new Date().toISOString(),
        },
        (err, results: HealthValue[]) => {
          if (!err && results?.length > 0) {
            setEnergy(results[0].value);
          }
        }
      );
    } catch (error) {
      console.error("Error fetching HealthKit data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Runs when component mounts, initialises HealthKit
  useEffect(() => {
    AppleHealthKit.initHealthKit(PERMISSIONS, (err) => {
      if (!err) fetchHealthData(); // If successful, fetch data
    });
  }, []);

  return {
    loading,
    steps,
    distance,
    flights,
    energy,
    stepsData,
    chartLabels,
    distanceData,
    refreshData: fetchHealthData,
  };
}

export default useHealthData;
