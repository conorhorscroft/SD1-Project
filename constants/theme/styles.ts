import { StyleSheet } from "react-native";
import { Theme } from "./types";

export const createThemedStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      justifyContent: "flex-start",
      backgroundColor: theme.colors.background,
      borderRadius: 0,
      paddingTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
      color: theme.colors.accent,
    },
    profileButton: {
      position: "absolute",
      right: 30,
      zIndex: 10,
    },
    chartLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.accent,
      textAlign: "center",
      marginTop: 10,
      marginBottom: 10,
    },
    chartContainer: {
      backgroundColor: theme.colors.background,
      padding: 0,
      borderRadius: 20,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      alignItems: "center",
      overflow: "hidden",
      paddingTop: 0,
    },
    text: {
      color: theme.colors.text,
      fontSize: 16,
    },
    heading: {
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: "bold",
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
  });
