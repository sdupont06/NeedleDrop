import React, { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./login";
import TabLayout from "./(tabs)/_layout";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth logic
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isLoggedIn && segments[0] !== "login") {
      // Redirect to login if not logged in
      router.replace("/login");
    } else if (isLoggedIn && segments[0] === "login") {
      // Redirect to tabs if logged in
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, segments]);

  const onLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
        initialParams={onLoginSuccess}
      ></Stack.Screen>
    </Stack>
  );
}
