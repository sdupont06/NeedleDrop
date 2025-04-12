import { View, Image, Text } from "react-native";
import Slider from "@react-native-community/slider";

export default function HomeScreen() {
  return (
    <>
      <View
        style={{
          flex: 1,
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
            height: "40%",
          }}
        ></Image>
        <Text
          style={{
            fontSize: 24,
          }}
        >
          Song Name
        </Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#8a8a8a"
          maximumTrackTintColor="#dcdcdc"
          thumbImage={require("../../assets/images/react-logo.png")}
        />
      </View>
    </>
  );
}
