import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { useAuth } from "@/hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import GoalsRadarChart from "@/components/GoalsRadarChart";
import { useTheme } from "@/constants/theme/ThemeContext";
import { createThemedStyles } from "@/constants/theme/styles";

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["Swim", "Bike", "Run"],
  data: [0.4, 0.6, 0.8],
};

const dataTwo = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(255, 184, 77, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ["Number of Workouts per week"],
};

const chartConfig = {
  backgroundGradientFrom: "#0a3d2e",
  backgroundGradientFromOpacity: 0.5,
  backgroundGradientTo: "#2E7D32",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(255, 184, 77, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.7,
};

export default function HomeScreen() {
  const { user, fetchUser } = useAuth();
  const [refresh, setRefresh] = useState(false);

  // Theme variables
  const { theme, toggleTheme } = useTheme();
  const styles = createThemedStyles(theme);

  useFocusEffect(
    useCallback(() => {
      fetchUser(); // Trigger re-fresh
    }, [])
  );

  return (
    <ScrollView key={refresh ? "refresh-true" : "refresh-false"}>
      <View style={styles.container}>
        <Text style={styles.title}>Hello {user?.name},</Text>
        <Text style={styles.title}>Welcome to SlainteFit!</Text>
        <View style={styles.chartContainer}>
          <GoalsRadarChart />
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
