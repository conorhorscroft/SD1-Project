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
import useCalorieTarget from "@/hooks/useCalorieTarget";

export default function HealthScreen() {
  // Pull healthkit data from useHealthData hook
  const { loading, energy, stepsData, chartLabels, distanceData } =
    useHealthData();

  // Variable for hiding and closing health advice section
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  const screenWidth = Dimensions.get("window").width;

  // Theme variables
  const { theme, toggleTheme } = useTheme();
  const styles = createThemedStyles(theme);
  const chartConfig = createChartConfig(theme);

  // Pull Calorie Target from hook
  const calorieTarget = useCalorieTarget();

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
