import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useTheme } from "@/constants/theme/ThemeContext";
import { createThemedStyles } from "@/constants/theme/styles";
import {
  Calendar,
  BarChart,
  CheckCircle,
  LineChart,
  Info,
} from "lucide-react-native";

interface HealthDataResponseProps {
  logDate?: string;
  mood?: number;
  sleepHours?: number;
  screenTime?: number;
  hadFreshAir?: boolean;
  averages?: {
    mood: string;
    sleep: string;
    screenTime: string;
    outdoorsPercentage: string;
  } | null;
  suggestions?: string | null;
}

export const HealthDataResponse = ({
  logDate = "No date",
  mood = 0,
  sleepHours = 0,
  screenTime = 0,
  hadFreshAir = false,
  averages = null,
  suggestions = null,
}: HealthDataResponseProps) => {
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
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.text,
      marginVertical: 8,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 5,
    },
    text: {
      fontSize: 16,
      color: theme.colors.text,
      flex: 1,
    },
    icon: {
      marginRight: 10,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: 12,
    },
    suggestionContainer: {
      backgroundColor: theme.colors.card,
      padding: 12,
      borderRadius: 8,
      marginTop: 8,
    },
    suggestionText: {
      fontSize: 14,
      color: theme.colors.text,
      lineHeight: 20,
    },
    averageRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 3,
    },
    averageLabel: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    averageValue: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.colors.text,
    },
  });

  return (
    <ScrollView>
      <View style={localStyles.container}>
        <Text style={localStyles.sectionTitle}>Latest Health Log Entry</Text>

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

        {averages && (
          <>
            <View style={localStyles.divider} />
            <Text style={localStyles.sectionTitle}>Weekly Averages</Text>

            <View style={localStyles.row}>
              <LineChart
                color={theme.colors.accent}
                size={20}
                style={localStyles.icon}
              />
              <View style={{ flex: 1 }}>
                <View style={localStyles.averageRow}>
                  <Text style={localStyles.averageLabel}>Average Mood:</Text>
                  <Text style={localStyles.averageValue}>
                    {averages.mood} / 10
                  </Text>
                </View>

                <View style={localStyles.averageRow}>
                  <Text style={localStyles.averageLabel}>Average Sleep:</Text>
                  <Text style={localStyles.averageValue}>
                    {averages.sleep} hours
                  </Text>
                </View>

                <View style={localStyles.averageRow}>
                  <Text style={localStyles.averageLabel}>
                    Average Screen Time:
                  </Text>
                  <Text style={localStyles.averageValue}>
                    {averages.screenTime} hours
                  </Text>
                </View>

                <View style={localStyles.averageRow}>
                  <Text style={localStyles.averageLabel}>Outdoor Days:</Text>
                  <Text style={localStyles.averageValue}>
                    {averages.outdoorsPercentage}%
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}

        {suggestions && (
          <>
            <View style={localStyles.divider} />
            <Text style={localStyles.sectionTitle}>Weekly Insights</Text>

            <View style={localStyles.row}>
              <Info
                color={theme.colors.accent}
                size={20}
                style={localStyles.icon}
              />
              <View style={localStyles.suggestionContainer}>
                <Text style={localStyles.suggestionText}>{suggestions}</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default HealthDataResponse;
