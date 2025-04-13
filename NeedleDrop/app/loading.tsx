import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function LoadingScreen({
  onFadeOutComplete,
}: {
  onFadeOutComplete: () => void;
}) {
  const opacity = useSharedValue(0);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  const gifStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    const timer = setTimeout(() => setShouldFadeOut(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shouldFadeOut) {
      opacity.value = withTiming(0, { duration: 500 });
      const finishTimer = setTimeout(() => {
        onFadeOutComplete();
      }, 500);
      return () => clearTimeout(finishTimer);
    }
  }, [shouldFadeOut]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/loading.gif")}
        style={[styles.gif, gifStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#f4e5b1", // ✅ stays visible
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  gif: {
    width: 600,
    height: 600,
    resizeMode: "contain",
  },
});
