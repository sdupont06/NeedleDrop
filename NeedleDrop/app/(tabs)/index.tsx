import { View, Image, Text, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export interface Song {
  id: string;
  title: string;
  artist: string;
}

export const likedSongs: Song[] = [];

export default function HomeScreen() {
  let [curSongIndex, setCurSongIndex] = useState(0);
  let [paused, setPaused] = useState(false);

  const translateX = useSharedValue(0);

  const likeSong = () => {
    let unique = true;
    likedSongs.forEach((item) => {
      if (item.id === songs[curSongIndex].id) {
        unique = false;
      }
    });
    if (unique) {
      likedSongs.unshift(songs[curSongIndex]);
      saveLikedSongs();
    }
  };

  const saveLikedSongs = async () => {
    await AsyncStorage.setItem("likedSongs", JSON.stringify(likedSongs)).catch(
      (e) => console.log(e)
    );
    // await AsyncStorage.setItem("likedSongs", "");
  };

  const images = [
    require("../../assets/images/react-logo.png"),
    require("../../assets/images/icon.png"),
    require("../../assets/images/needledrop_icon.png"),
  ];

  const songs = [
    {
      id: "1",
      title: "React Logo!",
      artist: "idk lol",
    },
    {
      id: "2",
      title: "nothing!",
      artist: "nobody",
    },
    {
      id: "3",
      title: "NeedleDrop!",
      artist: "Sam!",
    },
  ];

  const nextSong = () => {
    setCurSongIndex((curSongIndex + 1) % songs.length);
  };

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > 100) {
        runOnJS(likeSong)();
        translateX.value = -500;
        runOnJS(nextSong)();
      } else if (event.translationX < -100) {
        translateX.value = 500;
        runOnJS(nextSong)();
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
            source={images[curSongIndex]}
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
          {songs[curSongIndex].title}
        </Text>
        <Text>{songs[curSongIndex].artist}</Text>
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
        <TouchableOpacity style={styles.sideActionButtons}>
          <Ionicons name="close-outline" size={30} color="#74B4AD"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pauseButton}
          onPress={() => setPaused(!paused)}
        >
          <Ionicons
            name={paused ? "pause-outline" : "play"}
            size={40}
            color="#513D30"
          ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideActionButtons}>
          <Ionicons name="heart-outline" size={30} color="#D2695E"></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}></View>
    </>
  );
}

const styles = StyleSheet.create({
  pauseButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
  },
  sideActionButtons: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    alignSelf: "center",
  },
});
