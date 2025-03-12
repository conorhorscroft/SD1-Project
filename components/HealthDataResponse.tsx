import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "@/constants/theme/ThemeContext";
import { createThemedStyles } from "@/constants/theme/styles";
import { Calendar, BarChart, CheckCircle } from "lucide-react-native";

export const HealthDataResponse = ({
  logDate,
  mood,
  sleepHours,
  screenTime,
  hadFreshAir,
}) => {
  const { theme } = useTheme();
  const screenWidth = Dimensions.get("window").width;
  const styles = createThemedStyles(theme);

  const localStyles = StyleSheet.create({
    container: {
      width: screenWidth - 32,
      backgroundColor: theme.colors.background,
      padding: 16,
      borderRadius: 10,
      alignSelf: "center",
      marginVertical: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 5,
    },
    text: {
      fontSize: 16,
      color: theme.colors.text,
    },
    icon: {
      marginRight: 10,
    },
  });

  return (
    <View style={localStyles.container}>
      <View style={localStyles.row}>
        <Calendar
          color={theme.colors.accent}
          size={20}
          style={localStyles.icon}
        />
        <Text style={localStyles.text}>Date: {logDate}</Text>
      </View>
      <View style={localStyles.row}>
        <BarChart
          color={theme.colors.accent}
          size={20}
          style={localStyles.icon}
        />
        <Text style={localStyles.text}>Mood: {mood} / 10</Text>
      </View>
      <View style={localStyles.row}>
        <BarChart
          color={theme.colors.accent}
          size={20}
          style={localStyles.icon}
        />
        <Text style={localStyles.text}>Sleep: {sleepHours} hours</Text>
      </View>
      <View style={localStyles.row}>
        <BarChart
          color={theme.colors.accent}
          size={20}
          style={localStyles.icon}
        />
        <Text style={localStyles.text}>Screen Time: {screenTime} hours</Text>
      </View>
      <View style={localStyles.row}>
        <CheckCircle
          color={hadFreshAir ? theme.colors.accent : "#767577"}
          size={20}
          style={localStyles.icon}
        />
        <Text style={localStyles.text}>
          Time Outdoors: {hadFreshAir ? "Yes" : "No"}
        </Text>
      </View>
    </View>
  );
};

export default HealthDataResponse;
