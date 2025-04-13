import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./login";
import TabLayout from "./(tabs)/_layout";
//import { Stack } from "expo-router";

const Stack = createNativeStackNavigator();
export var isLoggedIn = 0;

export function setLog() {
  isLoggedIn = 1;
}

export default function RootLayout() {
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
