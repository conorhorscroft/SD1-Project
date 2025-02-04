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
      color: (opacity = 1) => `rgba(255, 184, 77, ${opacity})`,
      strokeWidth: 2, // optional
    },
  ],
  legend: ["Number of Workouts per week"], // optional
};

const chartConfig = {
  backgroundGradientFrom: "#0a3d2e",
  backgroundGradientFromOpacity: 0.5,
  backgroundGradientTo: "#2E7D32",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(255, 184, 77, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
  strokeWidth: 3, // Slightly bolder lines for visibility
  barPercentage: 0.7, // Slightly wider bars
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Hello Conor,</Text>
        <Text style={styles.title}>Welcome to SlainteFit!</Text>

        <View style={styles.chartContainer}>
          <View style={styles.chartContainer}>
            <ProgressChart
              data={data}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
            />
          </View>

          <Text style={styles.chartLabel}>Progress Chart</Text>

          <View style={styles.chartContainer}>
            <LineChart
              data={dataTwo}
              width={screenWidth}
              height={275}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
            />
          </View>
          <Text style={styles.chartLabel}>Monthly Exercise</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: "flex-start",
    backgroundColor: "#2E7D32",
    borderRadius: 0,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#FFB84D",
  },
  profileButton: {
    position: "absolute",
    right: 30,
    zIndex: 10,
  },
  // chartCard: {
  //   backgroundColor: "#FFF",
  //   borderRadius: 12,
  //   padding: 20,
  //   marginVertical: 10,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 3 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },

  // chartContainer: {
  //   flex: 1,
  //   marginBottom: 10,
  // },
  chartLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFB84D",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  chartContainer: {
    backgroundColor: "#2E7D32",
    padding: 0,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    alignItems: "center",
    overflow: "hidden",
    paddingTop: 0,
  },
});
