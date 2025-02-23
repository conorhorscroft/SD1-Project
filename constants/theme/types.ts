export type ThemeColors = {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  shadow: string;
  chartBackground: string;
  buttonBackground: string;
  chartGradientFrom: string;
  chartGradientTo: string;
  chartAccent: string;
};

export type Theme = {
  name: "light" | "dark" | "system";
  dark: boolean;
  colors: ThemeColors;
};
