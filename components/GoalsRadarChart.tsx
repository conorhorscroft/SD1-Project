import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { View, Text, StyleSheet } from "react-native";
import { RadarChart } from "@salmonco/react-native-radar-chart";

const GoalsRadarChart = () => {
  const { user, fetchUser } = useAuth();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  const data = [
    { label: "Strength", value: user.strength ?? 0 },
    { label: "Endurance", value: user.endurance ?? 0 },
    { label: "Weight Loss", value: user.weightLoss ?? 0 },
    { label: "Health", value: user.health ?? 0 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Fitness Goals</Text>
      <RadarChart
        data={data}
        maxValue={10}
        gradientColor={{
          startColor: "#FFB84D",
          endColor: "#FF9F42",
          count: 5,
        }}
        stroke={["#FF9F42", "#FFB84D", "#FFBB58", "#FF8C42", "#FFB84D"]}
        strokeWidth={[0.5, 0.5, 0.5, 0.5, 1]}
        strokeOpacity={[1, 1, 1, 1, 0.13]}
        labelColor="#FFB84D"
        dataFillColor="#FF9F42"
        dataFillOpacity={0.8}
        dataStroke="#FFB84D"
        dataStrokeWidth={2}
        isCircle
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2E7D32",
    padding: 25,
    borderRadius: 25,
    shadowColor: "#0a3d2e",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: 15,
    color: "#FFB84D",
    letterSpacing: 0.5,
  },
  chartLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFB84D",
  },
});

export default GoalsRadarChart;
