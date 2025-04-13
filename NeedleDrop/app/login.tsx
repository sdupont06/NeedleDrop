import React, { useEffect } from "react";
import { Image } from "react-native";
import { useGlobalSearchParams, useRouter } from 'expo-router';
import * as api from '../scripts/getToken';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as AuthSession from "expo-auth-session";

const CLIENT_ID = "e3b3f9ba66c040b397b57f5d9b4da3e3";

const REDIRECT_URI = AuthSession.makeRedirectUri({
  scheme: "NeedleDrop",
  path: "127.0.0.1:8081"
});

// console.log(REDIRECT_URI);

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
  const router = useRouter();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SCOPES,
      redirectUri: "exp://127.0.0.1:8081",
      responseType: "code",
    },
    discovery
  );
  const glob = useGlobalSearchParams();
  // console.log(glob.code);

  useEffect(() => {
    // const access_token = 2;
    // Alert.alert("Login Successful", `Token: ${access_token}`);
    // onLoginSuccess();
    if (glob.code != null) {
      const access_token = api.getAccessToken("exp://127.0.0.1:8081", glob.code);
      console.log(access_token);
      Alert.alert("Login Successful", 'Token: ${access_token}');
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
    backgroundColor: "#fff",
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
