import Slider from "@react-native-community/slider";
import { Frown, Smile } from "lucide-react-native";
import { TouchableOpacity, View, Dimensions, Text, Switch } from "react-native";
import { useTheme } from "@/constants/theme/ThemeContext";
import { createThemedStyles } from "@/constants/theme/styles";
import { createChartConfig } from "@/constants/theme/chartConfig";
import { useState } from "react";

export const LogHealthData = () => {
  const screenWidth = Dimensions.get("window").width;

  // Theme variables
  const { theme, toggleTheme } = useTheme();
  const styles = createThemedStyles(theme);
  const chartConfig = createChartConfig(theme);

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

  // Function to save health log data
  const saveHealthLog = () => {
    // TODO: Implement local storage or backend API call
    console.log("Saving health log:", healthLog);
    // Example of how you might save to AsyncStorage
    // await AsyncStorage.setItem('healthLog', JSON.stringify(healthLog));
  };

  return (
    <View>
      <Text style={styles.title}>Log Some Health Data</Text>
      {/* Mood Slider */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>How are you feeling today? (1-10)</Text>
        <View style={styles.sliderWithIconsContainer}>
          <Frown
            color={theme.dark ? theme.colors.accent : theme.colors.accent}
            size={24}
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
            minimumTrackTintColor={
              theme.dark ? theme.colors.accent : theme.colors.accent
            }
            maximumTrackTintColor="#ddd"
            thumbTintColor={
              theme.dark ? theme.colors.accent : theme.colors.accent
            }
          />
          <Smile
            color={theme.dark ? theme.colors.accent : theme.colors.accent}
            size={24}
          />
        </View>
        <Text style={styles.sliderValue}>{healthLog.mood}</Text>
      </View>

      {/* Sleep Hours Slider */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hours of Sleep (0-12)</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={12}
          step={0.5}
          value={healthLog.sleepHours}
          onValueChange={(value) =>
            setHealthLog((prev) => ({ ...prev, sleepHours: value }))
          }
          minimumTrackTintColor={
            theme.dark ? theme.colors.accent : theme.colors.accent
          }
          maximumTrackTintColor="#ddd"
          thumbTintColor={
            theme.dark ? theme.colors.accent : theme.colors.accent
          }
        />
        <Text style={styles.sliderValue}>{healthLog.sleepHours}</Text>
      </View>

      {/* Screen Time Slider */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Screen Time (hours)</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={16}
          step={0.5}
          value={healthLog.screenTime}
          onValueChange={(value) =>
            setHealthLog((prev) => ({ ...prev, screenTime: value }))
          }
          minimumTrackTintColor={
            theme.dark ? theme.colors.accent : theme.colors.accent
          }
          maximumTrackTintColor="#ddd"
          thumbTintColor={
            theme.dark ? theme.colors.accent : theme.colors.accent
          }
        />
        <Text style={styles.sliderValue}>{healthLog.screenTime}</Text>
      </View>

      {/* Fresh Air Switch */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Have you spent time outdoors today?</Text>
        <Text style={styles.label}>(fresh air or sunlight)</Text>
        <Switch
          trackColor={{
            false: "#767577",
            true: theme.dark ? theme.colors.accent : theme.colors.accent,
          }}
          thumbColor={healthLog.hadFreshAir ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) =>
            setHealthLog((prev) => ({ ...prev, hadFreshAir: value }))
          }
          value={healthLog.hadFreshAir}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={saveHealthLog}>
        <Text style={styles.buttonText}>Save Daily Log</Text>
      </TouchableOpacity>
    </View>
  );
};
