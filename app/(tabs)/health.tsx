import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native"; // React Native UI components
import { LineChart, BarChart, ProgressChart } from "react-native-chart-kit"; // Charting library
import useHealthData from "@/hooks/useHealthData"; // Hook for pulling apple healthkit data
import { HealthAdviceSection } from "@/components/HealthAdviceSection"; // Component for AI generated health advice
import { WebView } from "react-native-webview"; // Library to display webpage within app
import { useTheme } from "@/constants/theme/ThemeContext"; // Global theme context
import { createThemedStyles } from "@/constants/theme/styles"; // Theme styles
import { createChartConfig } from "@/constants/theme/chartConfig"; // Display details for charting
import useCalorieTarget from "@/hooks/useCalorieTarget"; // Dynamic calorie target hook
import { LogHealthData } from "@/components/LogHealthData"; // Component to log health data
import useHealthDataResponse from "@/hooks/useHealthDataResponse"; // Hook to pull health data from backend and process data
import HealthDataResponse from "@/components/HealthDataResponse"; // Component to display health data information

// Page to show and enter health information for a user
export default function HealthScreen() {
  // Pull healthkit data from useHealthData hook
  const { loading, energy, stepsData, chartLabels, distanceData } =
    useHealthData();

  // Variable for hiding and closing health advice section
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility
  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  // Set screenwidth based on device size
  const screenWidth = Dimensions.get("window").width;

  // Theme variables
  const { theme, toggleTheme } = useTheme();
  const styles = createThemedStyles(theme);
  const chartConfig = createChartConfig(theme);

  // Pull Calorie Target from hook
  const calorieTarget = useCalorieTarget();

  // Pull healthdata and suggestions from hook
  const { healthData, suggestions, averages } = useHealthDataResponse();

  // Obtain the latest data log entry
  const latestEntry =
    healthData.length > 0 ? healthData[healthData.length - 1] : null;

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      {/** Personalised AI advice section */}
      <HealthAdviceSection />

      {/** Users latest health data with averages and suggestions */}
      <HealthDataResponse
        logDate={latestEntry?.date}
        mood={latestEntry?.mood}
        sleepHours={latestEntry?.hoursOfSleep}
        screenTime={latestEntry?.screenTime}
        hadFreshAir={latestEntry?.timeOutdoors}
        averages={averages}
        suggestions={suggestions}
      />
      {/** Allow users to log more health data */}
      <LogHealthData />

      {/** Mindfullness / breathing section */}
      <TouchableOpacity
        style={styles.button}
        onPress={toggleVisibility}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading
            ? "Loading..."
            : isVisible
            ? "Press to close breathing exercise"
            : "Feeling Stressed?\n Tap to Reveal a Breathing Exercise!"}
        </Text>
      </TouchableOpacity>

      {isVisible && (
        <View style={styles.exerciseSection}>
          <Text style={styles.title}>Guided Breathing Exercise</Text>
          <Text style={styles.subtitle}>Follow the animation to relax</Text>

          <View style={styles.webviewContainer}>
            <WebView
              source={{ uri: "https://www.calm.com/breathe" }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              style={styles.webview}
            />
          </View>
        </View>
      )}

      {/** Charting of applehealthkit data */}
      <View style={styles.chartContainer}>
        <View style={styles.chartWrapper}>
          <ProgressChart
            data={{
              labels: ["Energy burned"],
              data: [energy / calorieTarget || 0],
            }}
            width={screenWidth - 100}
            height={200}
            strokeWidth={18}
            radius={50}
            chartConfig={chartConfig}
            hideLegend={true}
          />

          {/** Dynamically calculated Calorie target */}
          <Text style={styles.chartLabel}>
            {`Energy Burned\n${Math.round(
              energy
            )} Kcal\n(Target: ${calorieTarget})`}
          </Text>
        </View>
        <Text style={styles.subtitle}>
          Your Calorie target is dynamically calculated based on your calculated
          BMR (Basal Metabolic Rate) and your fitness goals!
        </Text>

        <Text style={styles.chartTitle}>Daily Steps</Text>
        <View style={styles.chartWrapper}>
          <BarChart
            data={{
              labels:
                chartLabels.length > 0
                  ? chartLabels
                  : ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
              datasets: [{ data: stepsData }],
            }}
            width={screenWidth}
            height={250}
            chartConfig={chartConfig}
            verticalLabelRotation={25}
          />
        </View>

        <Text style={styles.chartTitle}>Distance Walked/Ran</Text>
        <View style={styles.chartWrapper}>
          <LineChart
            data={{
              labels:
                chartLabels.length > 0
                  ? chartLabels
                  : ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
              datasets: [{ data: distanceData }],
            }}
            width={screenWidth}
            height={250}
            yAxisLabel="km "
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            bezier
          />
        </View>
      </View>
    </ScrollView>
  );
}
