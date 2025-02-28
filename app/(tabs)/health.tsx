import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart, BarChart, ProgressChart } from "react-native-chart-kit";
import useHealthData from "@/hooks/useHealthData";
import { HealthAdviceSection } from "@/components/HealthAdviceSection";
import { WebView } from "react-native-webview";
import { useTheme } from "@/constants/theme/ThemeContext";
import { createThemedStyles } from "@/constants/theme/styles";
import { createChartConfig } from "@/constants/theme/chartConfig";
import { useAuth } from "@/hooks/useAuth";

const screenWidth = Dimensions.get("window").width;

export default function HealthScreen() {
  const { loading, energy, stepsData, chartLabels, distanceData } =
    useHealthData();
  const [isVisible, setIsVisible] = useState(false);

  const { user, fetchUser } = useAuth();

  // Assign default values if unavailable
  const endurance = user?.endurance ?? 0;
  const strength = user?.strength ?? 0;
  const weightLoss = user?.weightLoss ?? 0;
  const hoursAvailable = user?.hoursAvailable ?? 0;
  const weight = user?.weight ?? 70;
  const height = user?.height ?? 160;
  const age = user?.age ?? 18;

  // Calculate BMR based on revised Harris-Benedict equation
  let basalMetabolicRate;
  let calorieTarget;
  let activityMultiplier;

  if (user?.gender === "Male") {
    basalMetabolicRate =
      13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
  } else {
    basalMetabolicRate = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
  }

  // Determine activity multiplier based on hours available
  if (hoursAvailable <= 1) {
    activityMultiplier = 1.2;
  } else if (hoursAvailable <= 4) {
    activityMultiplier = 1.375;
  } else if (hoursAvailable <= 9) {
    activityMultiplier = 1.55;
  } else if (hoursAvailable <= 14) {
    activityMultiplier = 1.725;
  } else {
    activityMultiplier = 1.9;
  }

  // Initial calorie target based on BMR and activity level
  calorieTarget = basalMetabolicRate * activityMultiplier;

  // Adjust for training focus
  const totalFocus = endurance + strength + weightLoss;
  const enduranceRatio = endurance / totalFocus;
  const strengthRatio = strength / totalFocus;
  const weightLossRatio = weightLoss / totalFocus;

  // Endurance adjustment
  if (endurance > strength && endurance > weightLoss) {
    calorieTarget *= 1 + enduranceRatio * 0.15;
  }

  // Strength adjustment
  if (strength > endurance && strength > weightLoss) {
    calorieTarget *= 1 + strengthRatio * 0.15;
  }

  // Weight loss adjustment (caloric deficit)
  if (weightLoss > endurance && weightLoss > strength) {
    calorieTarget *= 1 - weightLossRatio * 0.3;
  }

  // Final calorie target (round to nearest 50)
  calorieTarget = Math.round(calorieTarget / 50) * 50;

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  // Theme variables
  const { theme, toggleTheme } = useTheme();
  const styles = createThemedStyles(theme);
  const chartConfig = createChartConfig(theme);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      <HealthAdviceSection />

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
      <View style={styles.chartContainer}>
        <View style={styles.chartWrapper}>
          <ProgressChart
            data={{ labels: ["Energy burned"], data: [energy / calorieTarget] }} // TODO: Update this with calorie goal dynamically pulled from profile
            width={screenWidth - 100}
            height={200}
            strokeWidth={18}
            radius={50}
            chartConfig={chartConfig}
            hideLegend={true}
          />
          <Text style={styles.chartLabel}>
            {`Energy Burned\n${Math.round(
              energy
            )} Kcal\n(Target: ${calorieTarget})`}
          </Text>
        </View>

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
