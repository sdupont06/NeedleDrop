import React, { useState } from "react";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./(tabs)/index";

import LoginPage from "./login";
import TabLayout from "./(tabs)/_layout";
//import { Stack } from "expo-router";

const Stack = createNativeStackNavigator();
export var isLoggedIn = 0;

export function setLog() {
  isLoggedIn = 1;
}

export default function RootLayout() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth logic

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home"
        component={TabLayout}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
