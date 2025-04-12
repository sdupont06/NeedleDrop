import { View, Image, Text } from "react-native";
import Slider from "@react-native-community/slider";

export default function HomeScreen() {
  return (
    <>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Image
          source={require("../../assets/images/react-logo.png")}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            width: "75%",
            height: "75%",
          }}
        ></Image>
        <Text
          style={{
            fontSize: 24,
          }}
        >
          Song Name
        </Text>
      </View>
      <View style={{ flex: 1 }}></View>
    </>
  );
}
