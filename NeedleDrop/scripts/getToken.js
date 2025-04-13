const axios = require('axios');
import { encode as btoa } from 'base-64';
// const readline = require('readline'); 
// require('dotenv').config();

// Function to get the access token (OAuth2 Client Credentials Flow)
export async function getAccessToken(redir, code) {
    // await getCreds();
    const CLIENT_ID = "e3b3f9ba66c040b397b57f5d9b4da3e3";
    const CLIENT_SECRET = "f8bdc778be784e4a919f318a864d1ff5";
    const encoded = btoa("${CLIENT_ID}:${CLIENT_SECRET}");

    const authOptions = {
        
      headers: {
        'Authorization': 'Basic ${encoded}',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        code: code,
        redirect_uri: redir,
        grant_type: 'client_credentials'
      },
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
    };
  
    try {
      const response = await axios(authOptions);
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error.response);
      return 0;
    }
  }