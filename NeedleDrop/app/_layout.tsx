// import React, { useState } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import LoginPage from "./login";
// import TabLayout from "./(tabs)/_layout";
// import LoadingScreen from "./loading";
// //import { Stack } from "expo-router";

// const Stack = createNativeStackNavigator();
// export var isLoggedIn = 0;

// export function setLog() {
//   isLoggedIn = 1;
// }

// export default function RootLayout() {
//   const [isAppLoading, setIsAppLoading] = useState(true);

//   // Show the loading screen on app start
//   if (isAppLoading) {
//     return <LoadingScreen onFadeOutComplete={() => setIsAppLoading(false)} />;
//   }

//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="login"
//         component={LoginPage}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="home"
//         component={TabLayout}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./login";
import TabLayout from "./(tabs)/_layout";
import LoadingScreen from "./loading";
//import { Stack } from "expo-router";

const Stack = createNativeStackNavigator();
export var isLoggedIn = 0;

export function setLog() {
  isLoggedIn = 1;
}

// Create a separate component for the root layout with hooks
function RootLayoutContent() {
  const [isAppLoading, setIsAppLoading] = React.useState(true);

  // Show the loading screen on app start
  if (isAppLoading) {
    return <LoadingScreen onFadeOutComplete={() => setIsAppLoading(false)} />;
  }

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

// Main component that gets exported
export default function RootLayout() {
  return <RootLayoutContent />;
}
