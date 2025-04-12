// index.js

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load your API key from environment variable or directly set it here
const API_KEY = 'AIzaSyDmxPwZnct2FbUlq_9td9Ucd1HEpMfz29k';

const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  // Use the Gemini 1.5 Pro model
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  // Create a prompt
  const prompt = "Explain quantum computing in simple terms.";

  // Send the prompt to the model
  const result = await model.generateContent(prompt);

  // Extract and log the output
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run().catch(console.error);
