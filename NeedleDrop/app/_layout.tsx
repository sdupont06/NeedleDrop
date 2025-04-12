import React, { useState } from "react";
// import { Stack } from "expo-router";
import "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./(tabs)/index";
import LoginPage from "./login";


const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth logic
  
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen name="(tabs)" component={(HomeScreen)} options={{ headerShown: false }} />
    ) : (
        console.log("Login"),
        <Stack.Screen 
          name="login" 
          options={{ headerShown: false }}
          children={() => <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />} 
        />
      )}
    </Stack.Navigator>
  );
}