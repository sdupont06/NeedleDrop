// app/_layout.tsx
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import LoadingScreen from "./loading";

export default function Layout() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  const handleFadeOutComplete = () => {
    setIsAppLoading(false);
  };

  useEffect(() => {
    // fallback in case fade callback fails
    const timeout = setTimeout(() => setIsAppLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (isAppLoading) {
    return <LoadingScreen onFadeOutComplete={handleFadeOutComplete} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
