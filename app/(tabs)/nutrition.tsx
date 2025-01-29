import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NutritionScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Nutrition</Text>

        {/* Placeholder for todays nutrition */}
        <View style={styles.placeholder}>
          <Text>Today's Nutrition Placeholder</Text>
        </View>

        {/* Placeholder for previous days */}
        <View style={styles.placeholder}>
          <Text>Previous Days Nutrition Placeholder</Text>
        </View>
      </View>
    </ScrollView>
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
  placeholder: {
    width: "100%",
    height: 400,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
