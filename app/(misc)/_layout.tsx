import React, { useEffect } from "react";
import { Stack, useNavigation, useRouter } from "expo-router";

import { useAuth } from "@/hooks/useAuth";

export default function MiscLayout() {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitle: "Back",
      title: "",
    });
  }, [navigation]);

  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      router.replace("/signin");
    }
  }, [isLoading, token, router]);

  if (isLoading || !token) return null;

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
          name="updateprofile"
          options={{
            headerShown: false,
            title: "Profile",
            headerBackTitle: "Home",
          }}
        />
      </Stack>
    </>
  );
}
