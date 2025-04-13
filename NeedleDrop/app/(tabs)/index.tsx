import { View, Image, Text, Button, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
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
import { useFocusEffect } from "expo-router";

export interface Song {
  name: string;
  image: string;
  preview: string;
  url: string;
}

let likedSongs: Song[] = [];

export default function HomeScreen({}) {
  let [curSongIndex, setCurSongIndex] = useState(0);
  let [paused, setPaused] = useState(true);
  let [sound, setSound] = useState<Audio.Sound | null>(null);
  const [duration, setDuration] = useState(1);
  const [position, setPosition] = useState(1);

  const translateX = useSharedValue(0);

  const likeSong = () => {
    let unique = true;
    likedSongs.forEach((item) => {
      if (item.name === songs[curSongIndex].name) {
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

  const getLikedSongs = async () => {
    const value = await AsyncStorage.getItem("likedSongs").catch((e) => {
      console.log(e);
    });
    if (value != null) {
      likedSongs = JSON.parse(value);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getLikedSongs();
    }, [])
  );

  useEffect(() => {
    playSound();
  }, [curSongIndex]);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const songs = require("../../scripts/songs.json");

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: songs[curSongIndex].preview,
      },
      { shouldPlay: true }
    );
    setSound(sound);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setPosition(status.positionMillis || 0);
        setDuration(status.durationMillis || 1);
      }
      if (status.isLoaded && status.didJustFinish) {
        sound.replayAsync(); // Restart the clip
      }
    });

    setPaused(false);
    await sound.playAsync();
  }

  const togglePlayback = async () => {
    if (sound) {
      if (paused) {
        await sound.playAsync();
      } else {
        await sound.pauseAsync();
      }
      setPaused(!paused);
    }
  };

  const nextSong = async () => {
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

  const handleSliderValueChange = async (value: number) => {
    const newPos = value * duration;
    await sound?.setPositionAsync(newPos);
  };

  return (
    <View style={{ flex: 1 }}>
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
            source={{ uri: songs[curSongIndex].path }}
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
          value={position / duration}
          onValueChange={(value) => handleSliderValueChange(value)}
          tapToSeek={true}
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
          onPress={() => togglePlayback()}
        >
          <Ionicons
            name={paused ? "play" : "pause-outline"}
            size={40}
            color="#513D30"
          ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideActionButtons}>
          <Ionicons name="heart-outline" size={30} color="#D2695E"></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
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
