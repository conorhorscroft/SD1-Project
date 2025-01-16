import { StyleSheet, Text, View } from "react-native";
import React from "react";

const profile = () => {
  return (
    <View>
      <Text style={styles.text}>This is the profile page</Text>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  text: {
    color: "pink",
  },
});
