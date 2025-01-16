import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";

const CustomHeader = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.header}>SlainteFit </Text>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
     flex: 1,
     textAlign: "center",
     fontSize: 16,
     padding: 10,
     color: "green",
     backgroundColor: "gold",
  }

})

