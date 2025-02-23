import { Theme } from "./types";

export const createChartConfig = (theme: Theme) => ({
  backgroundGradientFrom: theme.dark
    ? "#0a3d2e" // Dark mode
    : "#FFFFFF", // Light mode
  backgroundGradientFromOpacity: theme.dark ? 0.5 : 1,
  backgroundGradientTo: theme.dark ? "#2E7D32" : "#FFFFFF",
  backgroundGradientToOpacity: theme.dark ? 0.5 : 1,
  color: (opacity = 1) =>
    theme.dark
      ? `rgba(255, 184, 77, ${opacity})`
      : `rgba(255, 184, 77, ${opacity})`,
  strokeWidth: 6,
  barPercentage: 0.4,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,

  labelColor: (opacity = 1) =>
    theme.dark
      ? `rgba(255, 255, 255, ${opacity})`
      : `rgba(0, 0, 0, ${opacity})`,
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: theme.dark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
  },
});
