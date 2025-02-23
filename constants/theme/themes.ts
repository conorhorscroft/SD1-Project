import { Theme } from "./types";

export const lightTheme: Theme = {
  name: "light",
  dark: false,
  colors: {
    background: "#F8F9FA", // Almost white background
    text: "#1B1B1B", // Dark text
    primary: "#2E7D32", // Dark green
    secondary: "#81C784", // Light green
    accent: "#FFB84D", // Original gold
    shadow: "rgba(0, 0, 0, 0.1)",
    chartBackground: "#2E7D32",
    buttonBackground: "#1B5E1E",
    chartGradientFrom: "#0a3d2e",
    chartGradientTo: "#2E7D32",
    chartAccent: "#FFB84D",
  },
};

export const darkTheme: Theme = {
  name: "dark",
  dark: true,
  colors: {
    background: "#2E7D32", // Original dark green
    text: "#FFFFFF",
    primary: "#1B4D1E",
    secondary: "#388E3C",
    accent: "#FFB84D", // Original gold
    shadow: "#000000",
    chartBackground: "#2E7D32",
    buttonBackground: "#1B5E1E",
    chartGradientFrom: "#0a3d2e",
    chartGradientTo: "#2E7D32",
    chartAccent: "#FFB84D",
  },
};
