import React from "react";
import { Stack, useNavigation } from "expo-router";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function MiscLayout() {
  const colorScheme = useColorScheme();

  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitle: "Home",
      title: "",
    });
  }, [navigation]);

  return (
    <>
      <Stack>
        <Stack.Screen
          name="profile"
          options={{
            headerShown: true,
            title: "Profile",
            headerBackTitle: "Home",
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
