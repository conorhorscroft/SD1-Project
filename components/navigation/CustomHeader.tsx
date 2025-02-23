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
import { useTheme } from "@/constants/theme/ThemeContext";

const CustomHeader = () => {
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme } = useTheme();

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>SlainteFit</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Link href="/(misc)/profile">
            <Ionicons name="person-circle" size={32} color="#FFB84D" />
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Ionicons
            name={
              theme.name === "light"
                ? "sunny"
                : theme.name === "dark"
                ? "moon"
                : "sync"
            }
            size={24}
            color="#FFB84D"
          />
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
    marginBottom: -35,
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
  themeButton: {
    position: "absolute",
    left: 20,
    zIndex: 10,
  },
});
