import { Slot } from "expo-router";
import "react-native-reanimated";
import CustomHeader from "@/components/navigation/CustomHeader";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { ActivityIndicator, View } from "react-native";
import React from "react";
import { ThemeProvider } from "../constants/theme/ThemeContext";

function RootLayoutContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <>
      <CustomHeader />
      <Slot />
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
