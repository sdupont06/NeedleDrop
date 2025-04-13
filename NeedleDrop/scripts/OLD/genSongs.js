const { GoogleGenerativeAI } = require('@google/generative-ai');
const spotifyPreviewFinder = require('spotify-preview-finder');

// const axios = require('axios');
// const { stringify } = require('querystring');

// Login page passes global auth token 
const API_KEY = 'AIzaSyDmxPwZnct2FbUlq_9td9Ucd1HEpMfz29k';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
const CLIENT_ID = "e3b3f9ba66c040b397b57f5d9b4da3e3";
const CLIENT_SECRET = "f8bdc778be784e4a919f318a864d1ff5";
process.env.SPOTIFY_CLIENT_ID = CLIENT_ID;
process.env.SPOTIFY_CLIENT_SECRET = CLIENT_SECRET;

// Welcome page gives a few genres and moods to choose
// Chosen genre will recommend first few songs from Gemini
async function welcome(genre, mood) {
  // Create a prompt
  const prompt = "Generate 5 songs (follow the number strictly, do not go above or below the amount) from the following genre and mood: " + genre + ", " + mood +
  ".\nProvide the response for each song with no enumeration and ONLY in the format of the Song Name per line, no gaps between lines";

  // Send the prompt to the model
  const result = await model.generateContent(prompt);

  // Extract and log the output
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

// Funcion to get preview URLS for songs
async function getPreview(songName) {
  try {
    // Get preview URLs for a song (limit is optional, default is 5)
    const result = await spotifyPreviewFinder(songName, 1);
    
    let ret = {
      name: "",
      url: "",
      preview: "",
      artist: ""
    };

    if (result.success) {
      result.results.forEach(song => {
        // console.log(`\nSong: ${song.name}`);
        ret.name = song.name;
        // console.log(`Spotify URL: ${song.spotifyUrl}`);
        ret.url = song.spotifyUrl;
        // console.log('Preview URLs:');
        ret.preview = song.previewUrls;
        // song.previewUrls.forEach(url => console.log(`- ${url}`));
      });
      // console.log(ret);
      return ret;
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function getArtist(songId, accessToken) {
  const trackUrl = `https://api.spotify.com/v1/tracks/${songId}`;

  try {
      const response = await axios.get(trackUrl, {
      headers: {
          'Authorization': `Bearer ${accessToken}`,
      },
      });

      const track = response.data;
      const previewUrl = track.preview_url;

      if (previewUrl) {
      console.log('Preview URL:', previewUrl);
      } else {
      console.log('No preview URL available for this track.');
      }
      const ret = track.artists.map(artist => artist.name).join(', ');
      return ret;
  } catch (error) {
      console.error('Error getting track by ID:', error.response.data);
  }
}

// Main execution
async function main(accessToken) {
    // Get output from Gemini using user input for genre and mood
    const geminiOutput = await welcome("Rap", "Festive Events");
    const songTitles = geminiOutput.split('\n');

    const ret = [];
    // For each song title in the list, gets the preview info from Spotify
    for (const title of songTitles) {
      if(!title) { break; }

      const song = await getPreview(title);
      const id = song.url.split("https://api.spotify.com/v1/tracks/");
      song.artist = getArtist(id, accessToken)

      ret.push(song);
    }
    // Stringify 
    const jsonString = JSON.stringify(ret);

    return jsonString;
}

async function genFirstSongs(){
    console.log(await main("BQB3Agk9CcCPtXiDuphIvH5WiTMxP-LP0KzREm96EPFWhxFBGhbKCCVQTkEM8yl6tfZDv7XkaiNu8nlpfCcDPquhoBiMxqO2vwNxkJAo4dAiO_Itv8LWZ7QEFH18duHLKBC5SuLapi8"));
    console.log("HeyITS A ME MARIO\nLOOOK AT THIS ==============");
}

genFirstSongs();