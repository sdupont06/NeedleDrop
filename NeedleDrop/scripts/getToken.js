const axios = require('axios');
import { encode as btoa } from 'base-64';
// const readline = require('readline'); 
// require('dotenv').config();

// Function to get the access token (OAuth2 Client Credentials Flow)
export async function getAccessToken(redir, code) {
    return "BQB3Agk9CcCPtXiDuphIvH5WiTMxP-LP0KzREm96EPFWhxFBGhbKCCVQTkEM8yl6tfZDv7XkaiNu8nlpfCcDPquhoBiMxqO2vwNxkJAo4dAiO_Itv8LWZ7QEFH18duHLKBC5SuLapi8";
    // await getCreds();
    const CLIENT_ID = "e3b3f9ba66c040b397b57f5d9b4da3e3";
    const CLIENT_SECRET = "f8bdc778be784e4a919f318a864d1ff5";

    const authOptions = {
      headers: {
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        code: code,
        redirect_uri: redir,
        grant_type: 'authorization_code'
      },
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
    };
    
    console.log("TEST");

    try {
      const response = await axios(authOptions);
      console.log(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.log(error);
      console.error('Error getting access token');
      return 0;
    }
  }