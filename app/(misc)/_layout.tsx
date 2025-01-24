import React from "react";
import { Stack } from "expo-router";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function MiscLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="profile"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="signin"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
