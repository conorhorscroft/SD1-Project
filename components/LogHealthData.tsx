import Slider from "@react-native-community/slider";
import {
  Frown,
  Smile,
  Moon,
  Sun,
  Clock,
  Eye,
  ChevronUp,
  ChevronDown,
  Zap,
} from "lucide-react-native";
import {
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  Switch,
  StyleSheet,
} from "react-native";
import { useTheme } from "@/constants/theme/ThemeContext";
import { createThemedStyles } from "@/constants/theme/styles";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";

export const LogHealthData = () => {
  const screenWidth = Dimensions.get("window").width;

  const { token, user } = useAuth();

  // Theme variables
  const { theme } = useTheme();
  const baseStyles = createThemedStyles(theme);

  const stylesMain = createThemedStyles(theme);

  // Create StyleSheet for this component
  const styles = StyleSheet.create({
    container: {
      width: screenWidth,
    },
    // fullWidthButton: {
    //   backgroundColor: theme.colors.primary,
    //   padding: 15,
    //   borderRadius: 8,
    //   alignItems: "center",
    //   marginVertical: 10,
    //   width: screenWidth - 32,
    //   alignSelf: "center",
    // },
    toggleButtonContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    buttonText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
    },
    contentContainer: {
      paddingHorizontal: 16,
    },
    inputContainer: {
      marginBottom: 20,
      width: "100%",
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: theme.colors.text,
    },
    sliderWithIconsContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginVertical: 8,
    },
    sliderIcon: {
      marginHorizontal: 8,
    },
    slider: {
      flex: 1,
      height: 40,
    },
    sliderValue: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: "center",
      marginTop: 5,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      marginVertical: 8,
    },
    labelContainer: {
      flexDirection: "column",
      flex: 1,
    },
  });

  // Interface for health logging data
  interface HealthLogData {
    mood: number;
    sleepHours: number;
    hadFreshAir: boolean;
    screenTime: number;
  }

  // New state for health logging
  const [healthLog, setHealthLog] = useState<HealthLogData>({
    mood: 5,
    sleepHours: 8,
    hadFreshAir: false,
    screenTime: 4,
  });

  // state to control visibility of health log
  const [isHealthLogVisible, setHealthLogVisible] = useState(false);

  // Function to toggle health log visibility
  const toggleHealthLogVisibility = () => {
    setHealthLogVisible(!isHealthLogVisible);
  };

  // Function to save health log data
  const saveHealthLog = async () => {
    console.log("Saving health log:", healthLog);

    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    const logData = {
      date: new Date().toISOString().split("T")[0], // Get the current date in YYYY-MM-DD format
      mood: healthLog.mood,
      hoursOfSleep: healthLog.sleepHours,
      screenTime: healthLog.screenTime,
      timeOutdoors: healthLog.hadFreshAir,
    };

    try {
      const response = await axios.post(
        `https://sd1-backend.onrender.com/api/healthdata/${user?.id}`,
        logData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Health log saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving health log:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Toggle Button - Full Width */}
      <TouchableOpacity
        style={stylesMain.fullWidthButton}
        onPress={toggleHealthLogVisibility}
      >
        <View style={styles.toggleButtonContent}>
          <Text style={stylesMain.buttonText}>
            {isHealthLogVisible ? "Hide Health Data Log" : "Log Health Data"}{" "}
          </Text>
          {isHealthLogVisible ? (
            <ChevronUp color={theme.colors.text} size={20} />
          ) : (
            <ChevronDown color={theme.colors.text} size={20} />
          )}
        </View>
      </TouchableOpacity>

      {/* Conditional Rendering of Health Log Details */}
      {isHealthLogVisible && (
        <View style={styles.contentContainer}>
          {/* Mood Slider */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>How are you feeling today? (1-10)</Text>
            <View style={styles.sliderWithIconsContainer}>
              <Frown
                color={theme.colors.accent}
                size={24}
                style={styles.sliderIcon}
              />
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={healthLog.mood}
                onValueChange={(value) =>
                  setHealthLog((prev) => ({ ...prev, mood: value }))
                }
                minimumTrackTintColor={theme.colors.accent}
                maximumTrackTintColor="#ddd"
                thumbTintColor={theme.colors.accent}
              />
              <Smile
                color={theme.colors.accent}
                size={24}
                style={styles.sliderIcon}
              />
            </View>
            <Text style={styles.sliderValue}>{healthLog.mood}</Text>
          </View>

          {/* Sleep Hours Slider */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hours of Sleep (0-12)</Text>
            <View style={styles.sliderWithIconsContainer}>
              <Moon
                color={theme.colors.accent}
                size={24}
                style={styles.sliderIcon}
              />
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={12}
                step={0.5}
                value={healthLog.sleepHours}
                onValueChange={(value) =>
                  setHealthLog((prev) => ({ ...prev, sleepHours: value }))
                }
                minimumTrackTintColor={theme.colors.accent}
                maximumTrackTintColor="#ddd"
                thumbTintColor={theme.colors.accent}
              />
              <Sun
                color={theme.colors.accent}
                size={24}
                style={styles.sliderIcon}
              />
            </View>
            <Text style={styles.sliderValue}>{healthLog.sleepHours}</Text>
          </View>

          {/* Screen Time Slider */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Screen Time (hours)</Text>
            <View style={styles.sliderWithIconsContainer}>
              <Clock
                color={theme.colors.accent}
                size={24}
                style={styles.sliderIcon}
              />
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={16}
                step={0.5}
                value={healthLog.screenTime}
                onValueChange={(value) =>
                  setHealthLog((prev) => ({ ...prev, screenTime: value }))
                }
                minimumTrackTintColor={theme.colors.accent}
                maximumTrackTintColor="#ddd"
                thumbTintColor={theme.colors.accent}
              />
              <Eye
                color={theme.colors.accent}
                size={24}
                style={styles.sliderIcon}
              />
            </View>
            <Text style={styles.sliderValue}>{healthLog.screenTime}</Text>
          </View>

          {/* Fresh Air Switch - Horizontal Layout */}
          <View style={styles.inputContainer}>
            <View style={styles.switchContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>
                  Have you spent time outdoors today?
                </Text>
                <Text style={styles.label}>(fresh air or sunlight)</Text>
              </View>
              <Zap
                color={healthLog.hadFreshAir ? theme.colors.accent : "#767577"}
                size={24}
                style={{ marginHorizontal: 8 }}
              />
              <Switch
                trackColor={{
                  false: "#767577",
                  true: theme.colors.accent,
                }}
                thumbColor={healthLog.hadFreshAir ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) =>
                  setHealthLog((prev) => ({ ...prev, hadFreshAir: value }))
                }
                value={healthLog.hadFreshAir}
              />
            </View>
          </View>

          {/* Save Button - Full Width */}
          <TouchableOpacity
            style={stylesMain.fullWidthButton}
            onPress={saveHealthLog}
          >
            <Text style={stylesMain.buttonText}>Save Daily Log</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
