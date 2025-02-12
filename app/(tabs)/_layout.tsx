import { router, Tabs, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";

import { useAuth } from "@/hooks/useAuth";

export default function TabLayout() {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      router.replace("/signin");
    }
  }, [isLoading, token, router]);

  if (isLoading || !token) return null;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#2E7D32",
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
          tabBarIcon: ({ color, focused }) => (
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
          tabBarIcon: ({ color, focused }) => (
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
          tabBarIcon: ({ color, focused }) => (
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
          tabBarIcon: ({ color, focused }) => (
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
