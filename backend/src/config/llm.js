// import Groq from "groq-sdk"

// const groq = new Groq({
//     apiKey:process.env.GROQ_API_KEY,
// })

// export default groq;

// Save as: config/llm.js  (replaces config/groq.js)
import OpenAI from "openai";

// Client is created lazily so process.env is already loaded by dotenv
// no matter in which order your files are imported.
let client;

export const getLLM = () => {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.LLM_API_KEY,
      baseURL: process.env.LLM_BASE_URL,
    });
  }
  return client;
};

export const LLM_MODEL = process.env.LLM_MODEL || "gemini-3.8-flash";