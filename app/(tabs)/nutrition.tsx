import React, { useState } from "react";
  import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";

  export default function NutritionScreen() {
    const [foodTitle, setFoodTitle] = useState("");
 
    // State to store the nutrition data received from the API
    const [nutritionData, setNutritionData] = useState(null);
   
    // State to store any error messages
    const [error, setError] = useState("");
  
    // Function to fetch nutrition data based on food title
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
       
        // If the response is successful, update the nutritionData state
        if (data && data.calories) {
          setNutritionData(data);
          setError(""); // Clear any previous errors
        } else {
          setError("No nutrition data found for this food.");
        }
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      }
    };
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.header}>Nutrition</Text>
  
            {/* Input field for food title */}
            <TextInput
              style={styles.input}
              placeholder="Enter food title (e.g., Chicken Breast)"
              value={foodTitle}
              onChangeText={setFoodTitle}
            />
  
            {/* Button to trigger the API request */}
            <Button title="Get Nutrition Info" onPress={fetchNutritionData} />
  
            {/* Display error message */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
  
            {/* Display nutrition data */}
            {nutritionData ? (
              <View style={styles.nutritionContainer}>
                <Text style={styles.nutritionText}>Calories: {nutritionData.calories.value} {nutritionData.calories.unit}</Text>
                <Text style={styles.nutritionText}>Fat: {nutritionData.fat.value} {nutritionData.fat.unit}</Text>
                <Text style={styles.nutritionText}>Protein: {nutritionData.protein.value} {nutritionData.protein.unit}</Text>
                <Text style={styles.nutritionText}>Carbs: {nutritionData.carbs.value} {nutritionData.carbs.unit}</Text>
              </View>
            ) : null}
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
  });