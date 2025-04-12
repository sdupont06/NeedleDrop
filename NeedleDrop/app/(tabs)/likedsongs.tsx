import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, Image } from "react-native";
import { Menu, Provider } from "react-native-paper";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    artist: "artist",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    artist: "artist",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    artist: "artist",
  },
];

type ItemProps = { title: string; artist: string };

function Item(props: ItemProps) {
  let [visible, setVisible] = useState(false);

  return (
    <View style={styles.item}>
      <View>
        <Image
          source={require("../../assets/images/needledrop_icon.png")}
          style={{
            resizeMode: "contain",
            width: 50,
            height: 50,
          }}
        />
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.songname}>{props.title}</Text>
        <Text style={styles.artistname}>{props.artist}</Text>
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
          <Menu.Item onPress={() => {}} title="Remove from Liked Songs" />
        </Menu>
      </View>
    </View>
  );
}

export default function LikedSongsPage() {
  return (
    <Provider>
      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item title={item.title} artist={item.artist} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#74B4AD",
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 16,
    borderWidth: 1,
    opacity: 0.8,
  },
  songname: {
    fontSize: 24,
  },
  artistname: {
    fontSize: 16,
  },
});
