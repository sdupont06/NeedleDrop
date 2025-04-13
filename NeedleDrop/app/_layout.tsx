import React, { useState } from "react";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./login";
import LoadingScreen from "./loading";
import TabLayout from "./(tabs)/_layout";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isAppLoading) {
    return <LoadingScreen onFadeOutComplete={() => setIsAppLoading(false)} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="login" />
      )}
    </Stack>
  );
}
