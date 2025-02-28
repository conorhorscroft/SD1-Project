import React, { useState, useCallback } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { useAuth } from "@/hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import GoalsRadarChart from "@/components/GoalsRadarChart";
import { useTheme } from "@/constants/theme/ThemeContext";
import { createThemedStyles } from "@/constants/theme/styles";
import { createChartConfig } from "@/constants/theme/chartConfig";

// Placeholder data for charts
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

export default function HomeScreen() {
  // Get screenwidth for device based resizing
  const screenWidth = Dimensions.get("window").width;

  // Pull profile data from context
  const { user, fetchUser } = useAuth();

  // Theme variables
  const { theme, toggleTheme } = useTheme();
  const styles = createThemedStyles(theme);
  const chartConfig = createChartConfig(theme);

  // Dynamically refresh
  const [refresh, setRefresh] = useState(false);
  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      key={refresh ? "refresh-true" : "refresh-false"}
    >
      <View style={styles.scrollViewContent}>
        <Text style={styles.title}></Text>
        <Text style={styles.title}>Hello {user?.name},</Text>
        <Text style={styles.title}>Welcome to SlainteFit!</Text>
        <View style={styles.chartContainer}>
          <GoalsRadarChart />
          <Text style={styles.chartLabel}>Your Fitness Goals</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chartWrapper}>
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

            <View style={styles.chartWrapper}>
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
      </View>
    </ScrollView>
  );
}
