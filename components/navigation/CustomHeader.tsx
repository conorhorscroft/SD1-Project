import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Link } from "expo-router";

const CustomHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>SlainteFit</Text>
        <TouchableOpacity
          style={[
            styles.profileButton,
            // { top: Platform.OS === "web" ? 20 : insets.top - 43 || 20 },
          ]}
        >
          <Link href="/(misc)/profile">
            <Ionicons name="person-circle" size={32} color="#FFB84D" />
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E7D32",
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 0,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  profileButton: {
    position: "absolute",
    paddingTop: 0,
    marginTop: 0,
    // top: Platform.OS === "ios" ? 50 : StatusBar.currentHeight + 10 || 20,
    right: 20,
    zIndex: 10,
  },
});
