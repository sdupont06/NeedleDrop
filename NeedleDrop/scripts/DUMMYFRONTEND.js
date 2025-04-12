import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';

const accessToken = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // Replace with your actual token

const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
};

export default function App() {
  const [output, setOutput] = useState('');
  const [userId, setUserId] = useState('');
  const [playlistId, setPlaylistId] = useState('');

  const log = (label, data) => setOutput(`${label}:\n${JSON.stringify(data, null, 2)}`);

  const getCurrentUserProfile = async () => {
    const res = await fetch('https://api.spotify.com/v1/me', { headers });
    const data = await res.json();
    log('User Profile', data);
    setUserId(data.id);
  };

  const createPlaylist = async () => {
    const body = JSON.stringify({
      name: 'My Expo Playlist',
      description: 'Made with love 💚',
      public: false
    });

    const res = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers,
      body
    });

    const data = await res.json();
    log('Created Playlist', data);
    setPlaylistId(data.id);
  };

  const addTracksToPlaylist = async () => {
    const trackUris = ['spotify:track:4cOdK2wGLETKBW3PvgPWqT']; // Rick Astley 😆
    const body = JSON.stringify({ uris: trackUris });

    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'PUT',
      headers,
      body
    });

    log('Add Tracks Response', await res.json());
  };

  const removeTracksFromPlaylist = async () => {
    const trackUris = ['spotify:track:4cOdK2wGLETKBW3PvgPWqT'];
    const body = JSON.stringify({
      tracks: trackUris.map(uri => ({ uri }))
    });

    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'DELETE',
      headers,
      body
    });

    log('Remove Tracks Response', await res.json());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎧 Spotify Web API Demo</Text>
      
      <Button title="1️⃣ Get User Profile" onPress={getCurrentUserProfile} />
      <Button title="2️⃣ Create Playlist" onPress={createPlaylist} disabled={!userId} />
      <Button title="3️⃣ Add Tracks to Playlist" onPress={addTracksToPlaylist} disabled={!playlistId} />
      <Button title="4️⃣ Remove Tracks from Playlist" onPress={removeTracksFromPlaylist} disabled={!playlistId} />

      <Text style={styles.label}>Output:</Text>
      <Text style={styles.output}>{output}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  label: {
    marginTop: 30,
    fontWeight: 'bold'
  },
  output: {
    fontFamily: 'Courier',
    marginTop: 10
  }
});






// PART TWO (2)

import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
const scopes = ['user-read-email', 'playlist-modify-public', 'playlist-modify-private'];

export default function App() {
  const [accessToken, setAccessToken] = React.useState(null);

  const promptAsync = AuthSession.useAuthRequest(
    {
      clientId,
      redirectUri,
      scopes,
      responseType: 'code',
      usePKCE: true,
    },
    discovery
  )[1];

  const handleLogin = async () => {
    const result = await promptAsync();
    if (result.type === 'success') {
      const code = result.params.code;

      // Exchange code for token
      const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&code_verifier=${AuthSession.generateRandom(43)}`
      });

      const data = await res.json();
      console.log('Access Token:', data.access_token);
      setAccessToken(data.access_token);
    } else {
      console.log('Login canceled or failed:', result);
    }
  };

  return (
    <View style={{ padding: 40 }}>
      <Button title="Login with Spotify" onPress={handleLogin} />
      {accessToken && <Text>Access Token: {accessToken}</Text>}
    </View>
  );
}
