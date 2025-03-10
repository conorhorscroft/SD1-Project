import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart } from "react-native-chart-kit";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";

export default function NutritionScreen() {
  const { token, user } = useAuth();

  const [foodTitle, setFoodTitle] = useState("");
  const [meals, setMeals] = useState([]);
  const [totalNutrition, setTotalNutrition] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [totalCalories, setTotalCalories] = useState(null);
  const [dailyCalories, setDailyCalories] = useState("");
  const [isDailyCaloriesSaved, setIsDailyCaloriesSaved] = useState(false);

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
        const newMeal = {
          title: foodTitle,
          calories: data.calories.value,
          protein: data.protein.value,
          carbs: data.carbs.value,
          fat: data.fat.value,
        };

        const savedMeal = await saveMealToBackend(newMeal);

        if (savedMeal) {
          setMeals([...meals, { ...newMeal, id: savedMeal.id }]); // Store backend ID
          setTotalNutrition(prev => ({
            calories: prev.calories + newMeal.calories,
            protein: prev.protein + newMeal.protein,
            carbs: prev.carbs + newMeal.carbs,
            fat: prev.fat + newMeal.fat
          }));
          setTotalCalories(prev => prev - newMeal.calories);
          setError("");
        }

      } else {
        setError("No nutrition data found for this food.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    }
  };


  const saveMealToBackend = async (meal) => {
    if (!token) {
      setError("User is not authenticated.");
      return;
    }

    const requestData = {
      date: new Date().toISOString().split("T")[0],
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fat,
      hydration: 0,
      userId: user?.id,
    };

    try {
      const response = await axios.post(
          "http://sd1-backend.onrender.com/api/nutrition/save-nutrition-data",
          requestData,
          { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data; // return saved meal with its ID

    } catch (err) {
      setError(`Failed to save meal data. ${err.message}`);
    }
  };

  const removeMeal = async (index) => {
    const mealToRemove = meals[index];

    try {
      if (mealToRemove.id) { // Only delete if ID exists
        await axios.delete(
            `http://sd1-backend.onrender.com/api/nutrition/delete-nutrition-data/${mealToRemove.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setMeals(meals.filter((_, i) => i !== index));
      setTotalNutrition(prev => ({
        calories: prev.calories - mealToRemove.calories,
        protein: prev.protein - mealToRemove.protein,
        carbs: prev.carbs - mealToRemove.carbs,
        fat: prev.fat - mealToRemove.fat
      }));
      setTotalCalories(prev => prev + mealToRemove.calories);
    } catch (err) {
      setError(`Failed to delete meal. ${err.message}`);
    }
  };

  // Function to save daily calories to the backend
  const saveDailyCalories = async () => {

    if (!token) {
      console.error("User is not authenticated");
      return;
    }


    if (!dailyCalories || isNaN(dailyCalories)) {
      setError("Please enter a valid number for calories");
      return;
    }

    const requestData = {
      totalCalories: dailyCalories
    };

    console.log(
        "Request URL:",
        `http://sd1-backend.onrender.com/api/nutrition/save-daily-calories/${user?.id}`
    );
    console.log("Request Data:", requestData);
    console.log("Headers:", { Authorization: `Bearer ${token}` });

    try {
      const response = await axios.post(
          `http://sd1-backend.onrender.com/api/nutrition/save-daily-calories/${user?.id}`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      console.log('Response Data:', response.data);

      // Since Axios automatically parses the response body, just use response.data
      if (response.status === 201) { // 201 is the standard success status code for creation
        setTotalCalories(dailyCalories);
        setSuccessMessage("Daily calories saved successfully!");
        setError("");
        setIsDailyCaloriesSaved(true);
      } else {
        setSuccessMessage("");
        setError(response.data.error || "Failed to save data. Please try again.");
      }
    } catch (err) {
      // If there is an error (network or server issue)
      setError("Failed to save data. Please try again." + err.message);
      setSuccessMessage("");
    }

  };

  const pieChartData = [
    { name: "Protein", population: totalNutrition.protein, color: "#FF6384", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Carbs", population: totalNutrition.carbs, color: "#36A2EB", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Fat", population: totalNutrition.fat, color: "#FFCE56", legendFontColor: "#7F7F7F", legendFontSize: 15 },
  ];

  return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.header}>Nutrition</Text>
            <TextInput style={styles.input} placeholder="Enter your daily calories" keyboardType="numeric" value={dailyCalories} onChangeText={setDailyCalories} />
            <Button title="Save Daily Calories" onPress={saveDailyCalories} />

            {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}



            <TextInput style={styles.input} placeholder="Enter food title" value={foodTitle} onChangeText={setFoodTitle} />
            <Button title="Get Nutrition Info" onPress={fetchNutritionData} disabled={!isDailyCaloriesSaved} />
            <Text style={styles.totalCaloriesText}>{isDailyCaloriesSaved ? `Total Calories Left: ${totalCalories} kcal` : null}</Text>
            {meals.length > 0 && (
                <View style={styles.mealsContainer}>
                  <Text style={styles.header}>Meals Added:</Text>
                  {meals.map((meal, index) => (
                      <View key={index} style={styles.mealItem}>
                        <Text style={styles.bullet}>• {meal.title}: {meal.calories} kcal</Text>
                        <TouchableOpacity onPress={() => removeMeal(index)}>
                          <Text style={styles.deleteButton}>X</Text>
                        </TouchableOpacity>
                      </View>
                  ))}
                </View>
            )}
            {meals.length > 0 && (
                <View style={styles.chartContainer}>
                  <Text style={styles.chartTitle}>Nutritional Breakdown</Text>
                  <PieChart data={pieChartData} width={300} height={220} accessor="population" backgroundColor="transparent" paddingLeft="15" chartConfig={{ backgroundGradientFrom: "#ff6600", backgroundGradientTo: "#ff6600", decimalPlaces: 2, color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})` }} />
                </View>
            )}

          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 20, alignItems: "center", justifyContent: "flex-start" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", height: 40, borderColor: "#ccc", borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 20 },
  totalCaloriesText: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  mealItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", paddingVertical: 5 },
  bullet: { fontSize: 18, textAlign: "left", flex: 1 },
  deleteButton: { fontSize: 18, color: "red", marginLeft: 10 },
  errorText: { color: "red", marginBottom: 10, fontSize: 16 },
  successText: { color: "green", marginBottom: 10, fontSize: 16 }
});