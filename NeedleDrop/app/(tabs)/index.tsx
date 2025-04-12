import { View, Image, Text } from "react-native";

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
    </>
  );
}
