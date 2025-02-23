// theme/styles.ts
import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "./types";

export const createThemedStyles = (theme: Theme) => {
  const screenWidth = Dimensions.get("window").width;

  return StyleSheet.create({
    // Main ScrollView style
    scrollView: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    // ScrollView content container style
    scrollViewContent: {
      flexGrow: 1,
      alignItems: "center",
      paddingBottom: 20,
    },
    // Chart styles
    chartContainer: {
      padding: 10,
      alignItems: "center",
      width: "100%",
    },
    chartWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      overflow: "hidden",
      marginVertical: 10,
      backgroundColor: theme.dark ? "transparent" : "#FFFFFF",
      ...(theme.dark
        ? {}
        : {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }),
    },
    chartLabel: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.dark ? theme.colors.accent : theme.colors.accent,
      textAlign: "center",
      marginRight: 50,
      marginLeft: -80,
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.dark ? theme.colors.accent : theme.colors.accent,
      textAlign: "center",
      marginTop: 15,
      marginBottom: 15,
    },
    // Exercise section styles
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
      color: theme.colors.accent,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.accent,
      marginBottom: 20,
    },
    webviewContainer: {
      width: "100%",
      height: 380,
      borderRadius: 10,
      overflow: "hidden",
    },
    webview: {
      flex: 1,
      marginBottom: -80,
    },
    exerciseSection: {
      width: "100%",
      marginTop: 20,
    },
    // Button styles
    button: {
      backgroundColor: theme.dark ? theme.colors.buttonBackground : "#FFF",
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
      marginBottom: 15,
      width: "95%",
    },
    buttonText: {
      color: theme.colors.accent,
      fontSize: 16,
      textAlign: "center",
    },
  });
};
