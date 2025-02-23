export type ThemeColors = {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  shadow: string;
  chartBackground: string;
};

export type Theme = {
  dark: boolean;
  colors: ThemeColors;
};
