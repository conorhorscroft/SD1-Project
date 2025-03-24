import { Slot } from "expo-router"; // acts as placeholder for current page
import CustomHeader from "@/components/navigation/CustomHeader"; // custom header for navigation
import { AuthProvider, useAuth } from "@/hooks/useAuth"; //Authentication provider and hook for managing auth state
import { ActivityIndicator, View } from "react-native"; // Native UI elements
import React from "react";
import { ThemeProvider } from "../constants/theme/ThemeContext"; // Theme provider for applying global styling

function RootLayoutContent() {
  const { isLoading } = useAuth(); // Get authentication loading state

  // If still loading, display loading indicator
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  // Once loaded, render custom header and current page
  return (
    <>
      <CustomHeader />
      <Slot />
    </>
  );
}

// Wrap the app in providers for auth and theme
export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
