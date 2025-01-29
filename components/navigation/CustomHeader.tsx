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
            <Ionicons name="person-circle" size={32} color="green" />
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
  profileButton: {
    position: "absolute",
    paddingTop: 0,
    marginTop: 0,
    // top: Platform.OS === "ios" ? 50 : StatusBar.currentHeight + 10 || 20,
    right: 30,
    zIndex: 10,
  },
});
