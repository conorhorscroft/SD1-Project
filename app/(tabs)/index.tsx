import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { useAuth } from "@/hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import GoalsRadarChart from "@/components/GoalsRadarChart";
import { useTheme } from "@/constants/theme/ThemeContext";
import { createThemedStyles } from "@/constants/theme/styles";
import { createChartConfig } from "@/constants/theme/chartConfig";

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

export default function HomeScreen() {
  const { user, fetchUser } = useAuth();
  const [refresh, setRefresh] = useState(false);

  // Theme variables
  const { theme, toggleTheme } = useTheme();
  const styles = createThemedStyles(theme);
  const chartConfig = createChartConfig(theme);

  useFocusEffect(
    useCallback(() => {
      fetchUser(); // Trigger re-fresh
    }, [])
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      key={refresh ? "refresh-true" : "refresh-false"}
    >
      <View style={styles.scrollViewContent}>
        <Text style={styles.title}>Hello {user?.name},</Text>
        <Text style={styles.title}>Welcome to SlainteFit!</Text>
        <View style={styles.chartContainer}>
          <GoalsRadarChart />
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
