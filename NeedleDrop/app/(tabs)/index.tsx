import { View, Image, Text, Button, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <>
      <View
        style={{
          flex: 5,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          paddingTop: 50,
        }}
      >
        <Image
          source={require("../../assets/images/react-logo.png")}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            width: "75%",
            height: "65%",
          }}
        ></Image>
        <Text
          style={{
            fontSize: 24,
          }}
        >
          slut me out 3
        </Text>
        <Text>nle choppa</Text>
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
        >
          <Ionicons name="pause-outline" size={40} color="darkgreen"></Ionicons>
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
