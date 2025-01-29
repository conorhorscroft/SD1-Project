import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomHeader = () => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>SlainteFit</Text>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gold",
    paddingTop: 5,
    marginBottom: 0,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
  },
});
