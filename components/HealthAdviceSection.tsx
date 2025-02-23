// components/HealthAdviceSection.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { useHealthAdvice } from "@/hooks/useHealthAdvice";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/constants/theme/ThemeContext";

export const HealthAdviceSection = () => {
  const { getAdvice } = useHealthAdvice();
  const [concernOrGoal, setConcernOrGoal] = useState("");
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAdviceVisible, setIsAdviceVisible] = useState(true);
  const { theme } = useTheme();

  const fetchAdvice = async () => {
    if (!concernOrGoal.trim()) {
      alert("Please enter some text.");
      return;
    }

    setLoading(true);
    setAdvice(null); // Clear previous advice when fetching new advice
    setIsAdviceVisible(true);

    try {
      const response = await getAdvice(concernOrGoal);
      setAdvice(response.advice);
    } catch (error) {
      setAdvice("Failed to fetch advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeAdvice = () => {
    setIsAdviceVisible(false); // Hide the advice section
    setAdvice(null);
  };

  return (
    <>
      {theme.dark ? ( // Conditional rendering based on theme
        <LinearGradient
          colors={["#0a3d2e", "#2E7D32"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <Text style={styles.title}>
            Personalised Health {"\n"}& Wellness Advice
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Weight Loss, Muscle Gain, Better Sleep..."
            value={concernOrGoal}
            onChangeText={setConcernOrGoal}
            placeholderTextColor="#FFB84D"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={fetchAdvice}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Loading..." : "Get Advice"}
            </Text>
          </TouchableOpacity>

          {isAdviceVisible && advice && (
            <View style={styles.adviceContainer}>
              <Markdown style={markdownStyles}>{advice}</Markdown>

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeAdvice}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>
            Personalised Health {"\n"}& Wellness Advice
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Weight Loss, Muscle Gain, Better Sleep..."
            value={concernOrGoal}
            onChangeText={setConcernOrGoal}
            placeholderTextColor="#0a3d2e"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={fetchAdvice}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Loading..." : "Get Advice"}
            </Text>
          </TouchableOpacity>

          {isAdviceVisible && advice && (
            <View style={styles.adviceContainer}>
              <Markdown style={markdownStyles}>{advice}</Markdown>

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeAdvice}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: "rgb(27, 94, 30)",
    borderRadius: 15,
    margin: 10,
    color: "#FFB84D",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFB84D",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    color: "#FFB84D",
    borderWidth: 1,
    borderColor: "#FFB84D",
  },
  loading: {
    color: "#FFB84D",
    marginTop: 10,
  },
  adviceContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#2E7D32",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFB84D",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#FFB84D",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const markdownStyles = {
  body: { color: "#fff" },
  heading1: { color: "#FFB84D" },
  heading2: { color: "#FFB84D" },
  strong: { color: "#FFB84D" },
  bullet_list: { color: "#fff" },
};
