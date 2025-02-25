import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart } from "react-native-chart-kit";

export default function NutritionScreen() {
  const [foodTitle, setFoodTitle] = useState("");
  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState("");
  const [dailyCalories, setDailyCalories] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to fetch nutrition data
  const fetchNutritionData = async () => {
    if (!foodTitle) {
      setError("Please enter a food title");
      return;
    }

    try {
      const response = await fetch(
          `https://api.spoonacular.com/recipes/guessNutrition?title=${foodTitle}&apiKey=dee086824191403c849a245d183b3172`
      );
      const data = await response.json();

      if (data && data.calories) {
        setNutritionData(data);
        setError(""); // Clear previous errors
      } else {
        setError("No nutrition data found for this food.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    }
  };

  // Function to save daily calories to the backend
  const saveDailyCalories = async () => {
    if (!dailyCalories || isNaN(dailyCalories)) {
      setError("Please enter a valid number for calories");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/save-daily-calories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile_id: 2, // Default profile_id as 1
          total_calories: dailyCalories,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Daily calories saved successfully!");
        setError("");
      } else {
        setSuccessMessage("");
        setError(data.error || "Failed to save data. Please try again.");
      }
    } catch (err) {
      setError("Failed to save data. Please try again."+ err);
      setSuccessMessage("");
    }
  };

  const pieChartData = nutritionData
      ? [
        {
          name: "Protein",
          population: nutritionData.protein.value,
          color: "#FF6384",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
        {
          name: "Carbs",
          population: nutritionData.carbs.value,
          color: "#36A2EB",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
        {
          name: "Fat",
          population: nutritionData.fat.value,
          color: "#FFCE56",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
      ]
      : [];

  return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.header}>Nutrition</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter food title (e.g., Chicken Breast)"
                value={foodTitle}
                onChangeText={setFoodTitle}
            />

            <Button title="Get Nutrition Info" onPress={fetchNutritionData} />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {nutritionData ? (
                <View style={styles.nutritionContainer}>
                  <Text style={styles.nutritionText}>Calories: {nutritionData.calories.value} {nutritionData.calories.unit}</Text>
                  <Text style={styles.nutritionText}>Fat: {nutritionData.fat.value} {nutritionData.fat.unit}</Text>
                  <Text style={styles.nutritionText}>Protein: {nutritionData.protein.value} {nutritionData.protein.unit}</Text>
                  <Text style={styles.nutritionText}>Carbs: {nutritionData.carbs.value} {nutritionData.carbs.unit}</Text>
                </View>
            ) : null}

            <TextInput
                style={styles.input}
                placeholder="Enter your daily calories"
                keyboardType="numeric"
                value={dailyCalories}
                onChangeText={setDailyCalories}
            />
            <Button title="Save Daily Calories" onPress={saveDailyCalories} />

            {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {nutritionData && (
                <View style={styles.chartContainer}>
                  <Text style={styles.chartTitle}>Nutritional Breakdown</Text>
                  <PieChart
                      data={pieChartData}
                      width={300}
                      height={220}
                      chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#ff6600",
                        backgroundGradientTo: "#ff6600",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        },
                      }}
                      accessor="population"
                      backgroundColor="transparent"
                      paddingLeft="15"
                  />
                </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  nutritionContainer: {
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  nutritionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 16,
  },
  successText: {
    color: "green",
    marginBottom: 10,
    fontSize: 16,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
