import React, { useEffect } from "react";
import { Image } from "react-native";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  makeRedirectUri,
  useAuthRequest,
  ResponseType,
} from "expo-auth-session";

const CLIENT_ID = "e3b3f9ba66c040b397b57f5d9b4da3e3";

const REDIRECT_URI = makeRedirectUri({
  scheme: "NeedleDrop",
  preferLocalhost: true,
  // path: "(tabs)",
});

const SCOPES = [
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
];

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SCOPES,
      redirectUri: "http://127.0.0.1:8081",
      responseType: ResponseType.Token,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      Alert.alert("Login Successful", `Token: ${access_token}`);
      onLoginSuccess();
    }
  }, [response]);
  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
      <Image
        source={require("../assets/images/needledrop_icon.png")}
        style={styles.logo}
        />
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity
          onPress={() => promptAsync()}
          disabled={!request}
          style={styles.spotifyButton}
        >
          <Text style={styles.spotifyButtonText}>Login With Spotify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f4e5b1",
    justifyContent: "space-between",
  },
  logo: {
    width: 600,
    height: 600,
    marginBottom: 0,
    resizeMode: "contain",
  },  
  logoSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  buttonSection: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
  },
  spotifyButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 7,
  },
  spotifyButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
