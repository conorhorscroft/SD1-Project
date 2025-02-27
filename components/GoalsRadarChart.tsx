import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { View, Text, StyleSheet } from "react-native";
import { RadarChart } from "@salmonco/react-native-radar-chart";
import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "@/constants/theme/types";
import { useTheme } from "@/constants/theme/ThemeContext";

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

  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {theme.dark ? (
        <LinearGradient
          colors={["#0a3d2e", "#2E7D32"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <RadarChart
            data={data}
            maxValue={10}
            gradientColor={{
              startColor: "#0a3d2e",
              endColor: "#2E7D32",
              count: 5,
            }}
            stroke={["#FF9F42", "#FFB84D", "#FFBB58", "#FF8C42", "#FFB84D"]}
            strokeWidth={[0.5, 0.5, 0.5, 0.5, 1]}
            strokeOpacity={[1, 1, 1, 1, 0.13]}
            labelColor="#FFB84D"
            labelSize={10}
            labelDistance={1.22}
            dataFillColor="#FF9F42"
            dataFillOpacity={0.5}
            dataStroke="#FFB84D"
            dataStrokeWidth={2}
            isCircle
          />
        </LinearGradient>
      ) : (
        <View style={styles.container}>
          <RadarChart
            data={data}
            maxValue={10}
            gradientColor={{
              startColor: "#0a3d2e",
              endColor: "#2E7D32",
              count: 5,
            }}
            stroke={["#FF9F42", "#FFB84D", "#FFBB58", "#FF8C42", "#FFB84D"]}
            strokeWidth={[0.5, 0.5, 0.5, 0.5, 1]}
            strokeOpacity={[1, 1, 1, 1, 0.13]}
            labelColor="#2E7D32"
            labelSize={10}
            labelDistance={1.22}
            dataFillColor="#FF9F42"
            dataFillOpacity={0.5}
            dataStroke="#FFB84D"
            dataStrokeWidth={2}
            isCircle
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#1B6033",
    padding: 0,
    borderRadius: 20,
    shadowColor: "#0a3d2e",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 10,
    marginTop: 15,
    marginBottom: 15,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    marginTop: 15,
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
