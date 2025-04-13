import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, Image } from "react-native";
import { Menu, Provider } from "react-native-paper";
import { Song } from ".";
import { useFocusEffect } from "expo-router";

type ItemProps = {
  name: string;
  imageurl: string;
  removeLiked: (title: string) => void;
};

function Item(props: ItemProps) {
  let [visible, setVisible] = useState(false);

  return (
    <View style={styles.item}>
      <View>
        <Image
          source={{ uri: props.imageurl }}
          style={{
            resizeMode: "contain",
            width: 40,
            height: 40,
          }}
        />
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.songname}>{props.name}</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Ionicons
              name="menu-outline"
              size={24}
              onPress={() => setVisible(true)}
            />
          }
        >
          <Menu.Item onPress={() => {}} title="Add to Playlist" />
          <Menu.Item onPress={() => {}} title="Share" />
          <Menu.Item
            onPress={() => {
              props.removeLiked(props.name);
            }}
            title="Remove from Liked Songs"
          />
        </Menu>
      </View>
    </View>
  );
}

export default function LikedSongsPage() {
  let [likedSongs, setLikedSongs] = useState<Song[]>([]);

  const getLikedSongs = async () => {
    const value = await AsyncStorage.getItem("likedSongs").catch((e) => {
      console.log(e);
    });
    if (value != null) {
      setLikedSongs(JSON.parse(value));
    }
  };

  const saveLikedSongs = async () => {
    await AsyncStorage.setItem("likedSongs", JSON.stringify(likedSongs)).catch(
      (e) => console.log(e)
    );
  };

  const removeLiked = (name: string) => {
    likedSongs = likedSongs.filter((song) => song.name != name);
    setLikedSongs(likedSongs);
    saveLikedSongs();
  };

  useFocusEffect(
    useCallback(() => {
      getLikedSongs();
    }, [])
  );

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 24, paddingBottom: 10 }}>
          Liked Songs
        </Text>
        <FlatList
          data={likedSongs}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              imageurl={item.image}
              removeLiked={removeLiked}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#f4e5b1",
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#D6C89B",
    alignItems: "center",
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 16,
    borderWidth: 1,
    opacity: 0.8,
  },
  songname: {
    fontSize: 20,
  },
  artistname: {
    fontSize: 14,
  },
});
