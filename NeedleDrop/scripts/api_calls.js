//  Basic Setup and Utilities
const fetch = require('node-fetch');

const accessToken = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // Replace with a real OAuth token

// Reusable headers
const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
};


// GET Request – Get Current User’s Profile
// Purpose: Retrieve profile details of the current user.
async function getCurrentUserProfile() {
  const url = 'https://api.spotify.com/v1/me';

  try {
    const res = await fetch(url, { headers });
    const data = await res.json();
    console.log('User Profile:', data);
  } catch (err) {
    console.error('Error fetching user profile:', err);
  }
}


// POST Request – Create a New Playlist
// Purpose: Create a new playlist for a user.
async function createPlaylist(userId, playlistName) {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

  const body = JSON.stringify({
    name: playlistName,
    description: 'Created with the Spotify Web API',
    public: false
  });

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    const data = await res.json();
    console.log('Created Playlist:', data);
  } catch (err) {
    console.error('Error creating playlist:', err);
  }
}


// PUT Request – Add Tracks to a Playlist
// Purpose: Add songs to an existing playlist.
async function addTracksToPlaylist(playlistId, trackUris) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const body = JSON.stringify({ uris: trackUris });

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers,
      body
    });

    if (res.status === 201 || res.status === 200) {
      console.log('Tracks added successfully');
    } else {
      console.error('Failed to add tracks:', await res.text());
    }
  } catch (err) {
    console.error('Error adding tracks:', err);
  }
}


// DELETE Request – Remove Tracks from Playlist
// Purpose: Remove specific tracks from a playlist.
async function removeTracksFromPlaylist(playlistId, trackUris) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const body = JSON.stringify({
    tracks: trackUris.map(uri => ({ uri }))
  });

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers,
      body
    });

    if (res.status === 200) {
      console.log('Tracks removed successfully');
    } else {
      console.error('Failed to remove tracks:', await res.text());
    }
  } catch (err) {
    console.error('Error removing tracks:', err);
  }
}



// Example Run (if you hardcode the values):
(async () => {
    await getCurrentUserProfile();
    await createPlaylist('spotify_user_id_here', 'My Cool Playlist');
    await addTracksToPlaylist('playlist_id_here', ['spotify:track:4cOdK2wGLETKBW3PvgPWqT']);
    await removeTracksFromPlaylist('playlist_id_here', ['spotify:track:4cOdK2wGLETKBW3PvgPWqT']);
  })();
  