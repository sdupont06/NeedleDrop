import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./(tabs)/index";
import LoginPage from "./login";
import LoadingScreen from "./loading";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isAppLoading) {
    return <LoadingScreen onFadeOutComplete={() => setIsAppLoading(false)} />;
  }

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen
            name="Login"
            children={() => (
              <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
            )}
          />
        )}
      </Stack.Navigator>
  );
}
