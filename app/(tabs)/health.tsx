import React, { useEffect, useState } from "react";

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
} from "react-native-health";

import { LineChart, BarChart, ProgressChart } from "react-native-chart-kit";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { env } from "../../constants/config";

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
  backgroundGradientFromOpacity: 0.5,
  backgroundGradientTo: "#2E7D32",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(255, 184, 77, ${opacity})`,
  strokeWidth: 6,
  barPercentage: 0.4,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
};

export default function HealthScreen() {
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [flights, setFlights] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(0);
  const [stepsData, setStepsData] = useState<number[]>(new Array(7).fill(0)); // Store steps for each day
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [distanceData, setDistanceData] = useState<number[]>(
    new Array(7).fill(0)
  ); // Store distance for each day

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

  const prepareDynamicLabelsAndData = (
    results: Array<any>,
    dataType: "steps" | "distance"
  ): { labels: string[]; processedData: number[] } => {
    const daysOfWeek = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];

    // Get the last 7 days, starting from today and going backwards
    const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i)); // This ensures current day is the last bar
      return d;
    });

    // Initialize data array
    const weeklyData = new Array(7).fill(0);

    // Process results
    results.forEach(({ startDate, value }) => {
      const date = new Date(startDate);
      // Find the matching day in the last seven days
      const matchingDayIndex = lastSevenDays.findIndex(
        (day) =>
          day.toISOString().split("T")[0] === date.toISOString().split("T")[0]
      );

      if (matchingDayIndex !== -1) {
        weeklyData[matchingDayIndex] +=
          dataType === "distance" ? Number((value / 1000).toFixed(2)) : value;
      }
    });

    // Create dynamic labels with current day last
    const dynamicLabels = lastSevenDays.map((day) => daysOfWeek[day.getDay()]);

    // console.log("Processed Labels:", dynamicLabels);

    return { labels: dynamicLabels, processedData: weeklyData };
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

      // Fetch daily steps

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
          // console.log("Raw step data:", results);

          const { labels, processedData: steps } = prepareDynamicLabelsAndData(
            results,
            "steps"
          );

          setChartLabels(labels);
          setStepsData(steps);
        }
      );

      // Fetch daily distance walked/ran

      AppleHealthKit.getDailyDistanceWalkingRunningSamples(
        options,
        (err: Object, results: Array<Object>) => {
          if (err) {
            console.error("Error fetching weekly distance:", err);
            return;
          }
          // console.log("Raw distance data:", results);

          const { labels, processedData: distance } =
            prepareDynamicLabelsAndData(results, "distance");

          setDistanceData(distance);
        }
      );
    } catch (error) {
      console.error("Error fetching HealthKit data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Define interface for API response
  interface HealthAdviceResponse {
    advice: string;
    disclaimer: string;
  }

  // Define Class to handle AI interactions
  export class HealthAdvisor {
    private genAI: GoogleGenerativeAI;
    private model: any;

    // Takes API key to initialise Gemini
    constructor(apiKey: string) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({
        // best text model
        model: "gemini-pro",
        // safety settings to prevent inappropriate conten
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      });
    }

    // takes users profile and specific health topic they want advice on
    async generateAdvice(
      profile: UserProfile,
      concernOrGoal: string
      // returns our health advice response interface
    ): Promise<HealthAdviceResponse> {
      try {
        // Create a structured prompt
        const prompt = `As a wellness guide, provide general lifestyle and wellness advice for a ${
          profile.age
        } year old person with the following profile:
            
            ${profile.lifestyle ? `- Lifestyle: ${profile.lifestyle}` : ""}
            ${
              profile.fitnessLevel
                ? `- Fitness Level: ${profile.fitnessLevel}`
                : ""
            }
            ${
              profile.healthGoals?.length
                ? `- Health Goals: ${profile.healthGoals.join(", ")}`
                : ""
            }
            
            They are seeking advice about: ${concernOrGoal}
            
            Provide practical, general wellness suggestions. Format the response in JSON with these fields:
            - advice: containing specific, actionable recommendations
            - disclaimer: appropriate medical disclaimers
            
            Keep suggestions general and emphasize consulting healthcare professionals for medical concerns.`;

        const result = await this.model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Parse the JSON response
        try {
          const jsonResponse = JSON.parse(text);
          return {
            advice: jsonResponse.advice,
            disclaimer: jsonResponse.disclaimer,
          };
        } catch (parseError) {
          // If JSON parsing fails, return the raw text with a default disclaimer
          return {
            advice: text,
            disclaimer:
              "This is general wellness information and not medical advice. Always consult healthcare professionals for medical concerns.",
          };
        }
      } catch (error) {
        console.error("Error generating health advice:", error);
        throw new Error("Failed to generate health advice");
      }
    }
  }

  return (
    <ScrollView>
      <View style={styles.chartContainer}>
        <View style={styles.chartWrapper}>
          <ProgressChart
            data={{ labels: ["Energy burned"], data: [energy / 2500] }}
            width={screenWidth}
            height={200}
            strokeWidth={18}
            radius={50}
            chartConfig={chartConfig}
            hideLegend={true}
          />
          <Text style={styles.chartLabel}>{`Energy Burned\n${Math.round(
            energy
          )} Kcal`}</Text>
        </View>

        <Text style={styles.chartTitle}>Daily Steps</Text>
        <View style={styles.chartWrapper}>
          <BarChart
            // style={graphStyle}
            data={{
              labels:
                chartLabels.length > 0
                  ? chartLabels
                  : ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  data: stepsData,
                  // data: [1245, 5049, 4093, 9059],
                },
              ],
            }}
            width={screenWidth}
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            verticalLabelRotation={25}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {/* Distance */}

            <Text style={styles.chartTitle}>Distance Walked/Ran</Text>

            {/* New LineChart for Distance */}
            <View style={styles.chartWrapper}>
              <LineChart
                data={{
                  labels:
                    chartLabels.length > 0
                      ? chartLabels
                      : ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
                  datasets: [
                    {
                      data: distanceData,
                    },
                  ],
                }}
                width={screenWidth}
                height={250}
                yAxisLabel="km "
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                bezier
              />
            </View>
            {/* 
            <View style={styles.dataBlock}>
              <Text style={styles.label}>Distance</Text>
              <Text style={styles.value}>
                {(distance / 1000).toFixed(2)} km
              </Text>
            </View> */}

            {/* Flights Climbed */}
            {/* <View style={styles.dataBlock}>
              <Text style={styles.label}>Flights Climbed</Text>
              <Text style={styles.value}>{flights.toString()}</Text>
            </View> */}
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
    padding: 0,
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
    borderRadius: 20,
    overflow: "hidden",
  },
  chartLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFB84D",
    textAlign: "center",
    marginRight: 50,
    marginLeft: -80,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFB84D",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
    paddingTop: 10,
  },
});
