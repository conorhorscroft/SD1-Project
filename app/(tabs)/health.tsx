import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { LineChart, BarChart, ProgressChart } from "react-native-chart-kit";
import useHealthData from "@/hooks/useHealthData";
import { HealthAdviceSection } from "@/components/HealthAdviceSection";
import { WebView } from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;

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
  const { loading, energy, stepsData, chartLabels, distanceData } =
    useHealthData();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <ScrollView style={styles.container}>
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
            data={{ labels: ["Energy burned"], data: [energy / 2500] }} // TODO: Update this with calorie goal dynamically pulled from profile
            width={screenWidth - 100}
            height={200}
            strokeWidth={18}
            radius={50}
            chartConfig={chartConfig}
            hideLegend={true}
          />
          <Text style={styles.chartLabel}>
            {`Energy Burned\n${Math.round(energy)} Kcal`}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E7D32",
  },
  chartContainer: {
    padding: 10,
    alignItems: "center",
  },
  chartWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 10,
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFB84D",
  },
  subtitle: {
    fontSize: 14,
    color: "#FFB84D",
    marginBottom: 20,
  },
  webviewContainer: {
    width: "100%",
    height: 380,
    borderRadius: 10,
    overflow: "hidden",
  },
  webview: {
    flex: 1,
    marginBottom: -80,
  },
  exerciseSection: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "rgb(27, 94, 30)",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
    width: "95%",
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "#FFB84D",
    fontSize: 16,
    textAlign: "center",
  },
});
