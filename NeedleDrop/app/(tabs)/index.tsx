import { View, Image, Text, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function HomeScreen({ navigation }: { navigation: NativeStackNavigationProp<any> }) {
  let [curImageIndex, setCurImageIndex] = useState(0);
  let [paused, setPaused] = useState(false);

  const translateX = useSharedValue(0);

  const images = [
    require("../../assets/images/react-logo.png"),
    require("../../assets/images/icon.png"),
  ];

  const nextImage = () => {
    console.log(curImageIndex);
    setCurImageIndex((curImageIndex + 1) % images.length);
  };

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > 100) {
        translateX.value = -500;
        runOnJS(nextImage)();
      } else if (event.translationX < -100) {
        translateX.value = 500;
        runOnJS(nextImage)();
        console.log(curImageIndex);
      }
      translateX.value = withSpring(0);
    });

  return (
    <>
      <GestureHandlerRootView

        style={{
          flex: 5,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          paddingTop: 50,
        }}
      >
        <GestureDetector gesture={swipeGesture}>
          <Animated.Image
            source={images[curImageIndex]}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              width: "75%",
              height: "85%",
              transform: [{ translateX: translateX }],
            }}
          ></Animated.Image>
        </GestureDetector>
      </GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
          }}
        >
          Slut Me Out 3
        </Text>
        <Text>NLE Choppa</Text>
        <Slider
          style={{ width: "75%", height: "10%" }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#8a8a8a"
          maximumTrackTintColor="#dcdcdc"
          thumbImage={require("../../assets/images/thumbicon.png")}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "20%",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "darkgray",
            borderWidth: 1,
            borderRadius: 50,
            padding: 10,
            alignSelf: "center",
          }}
        >
          <Ionicons name="close-outline" size={30} color="darkgreen"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "darkgray",
            borderWidth: 1,
            borderRadius: 50,
            padding: 10,
          }}
          onPress={() => setPaused(!paused)}
        >
          <Ionicons
            name={paused ? "pause-outline" : "play-outline"}
            size={40}
            color="darkgreen"
          ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "darkgray",
            borderWidth: 1,
            borderRadius: 50,
            padding: 10,
            alignSelf: "center",
          }}
        >
          <Ionicons name="heart-outline" size={30} color="darkgreen"></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}></View>
    </>
  );
}
