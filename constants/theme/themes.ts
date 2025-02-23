import { Theme } from "./types";

export const lightTheme: Theme = {
  dark: false,
  colors: {
    // background: "#FFF",
    // text: "#1B1B1B",
    // primary: "#2E7D32",
    // secondary: "#81C784",
    // accent: "#FFC107",
    // shadow: "rgba(0, 0, 0, 0.2)",
    background: "#F8F9FA",
    text: "#1B1B1B",
    primary: "#2E7D32",
    secondary: "#81C784",
    accent: "#FFB84D",
    shadow: "rgba(0, 0, 0, 0.1)",
    chartBackground: "#2E7D32",
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    background: "#2E7D32",
    text: "#FFFFFF",
    primary: "#1B4D1E",
    secondary: "#388E3C",
    accent: "#FFB84D",
    shadow: "#000000",
  },
};
