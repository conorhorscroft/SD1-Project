import { Redirect, Tabs } from "expo-router"; // Navigation
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useAuth } from "@/hooks/useAuth"; // Authentication hook

export default function TabLayout() {
  const { token, isLoading } = useAuth();

  // Show nothing while checking authentication
  if (isLoading) {
    return null;
  }

  // Redirect to sign-in page if user is not authenticated (cannot access main app)
  if (!token) {
    return <Redirect href="/signin" />;
  }

  return (
    // Tabs for main screen
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#0B5D1E",
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#FFB84D",
        tabBarInactiveTintColor: "#FFFFFF",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={focused ? "#FFB84D" : "#FFFFFF"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: "Workouts",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "barbell" : "barbell-outline"}
              color={focused ? "#FFB84D" : "#FFFFFF"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: "Nutrition",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "nutrition" : "nutrition-outline"}
              color={focused ? "#FFB84D" : "#FFFFFF"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: "Health",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "heart" : "heart-outline"}
              color={focused ? "#FFB84D" : "#FFFFFF"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
