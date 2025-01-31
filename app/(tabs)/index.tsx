import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["Swim", "Bike", "Run"], // optional
  data: [0.4, 0.6, 0.8],
};

const dataTwo = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ["Number of Workouts per week"], // optional
};

const chartConfig = {
  backgroundGradientFrom: "#ffffff", // Start of gradient (white background)
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#f2f2f2", // Soft light gray
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Garmin-like blue
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
  strokeWidth: 3, // Slightly bolder lines for visibility
  barPercentage: 0.7, // Slightly wider bars
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to SlainteFit!</Text>

        <View style={styles.chartContainer}>
          <View style={styles.chartCard}>
            <Text style={styles.chartLabel}>Progress Chart</Text>
            <ProgressChart
              data={data}
              width={screenWidth - 70}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
            />
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartLabel}>Monthly Exercise</Text>
            <LineChart
              data={dataTwo}
              width={screenWidth - 60}
              height={256}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333333",
  },
  profileButton: {
    position: "absolute",
    right: 30,
    zIndex: 10,
  },
  chartCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  chartLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
  chartContainer: {
    flex: 1,
    marginBottom: 10,
  },
});
