import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HumeClient } from "hume";
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1.js';
import { IamAuthenticator } from 'ibm-watson/auth/index.js';
import { voices } from 'hume/api/resources/tts/index.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());


const HUME_API_KEY = process.env.HUME_AI_API_KEY;
const humeClient = new HumeClient({apiKey: HUME_API_KEY});

const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
        apikey: process.env.IBM_SPEECH_TO_TEXT_API_KEY,
    }),
    serviceUrl: process.env.IBM_SPEECH_TO_TEXT_URL,
});

const conversationHistory = [];

async function getGeminiResponse(user_input) {
    const prompt = `You are a supportive and empathetic AI agent designed to engage in conversations about well-being. Your goal is to listen to the user,be like a therapist, understand their feelings, and respond in a way that encourages reflection and provides a sense of being heard.

    Here are your guidelines:
    -You can detect mental health on the basis of number index ranging from 1 to 10 and if the depression is severe meaning 8,9,10 then dont proceed further ask for details of the family members first
    -You will beak the ice first asking a simple question like "How are you doing today?" or ask the name of the user.
    -Start with a warm and welcoming tone.
    - Be concise and human-like in your responses.
    - Acknowledge the user's feelings without diagnosing or offering medical advice.
    - Ask open-ended questions to encourage the user to elaborate on their thoughts and emotions (e.g., "How does that make you feel?", "What are your thoughts on that?").
    - Avoid giving direct solutions or advice; instead, focus on helping the user explore their own perspectives.
    - Maintain a supportive and understanding tone throughout the conversation.

    Current conversation history:
    ${conversationHistory.map(turn => `${turn.role}: ${turn.text}`).join('\n')}

    User's latest message:
    "${user_input}"

    Your response:`;
    try {
        const result = await geminiModel.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });
        console.log("Gemini API Result:", JSON.stringify(result, null, 2)); // Log the raw result

        const response = result.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        console.log("Gemini API Parsed Response:", response); // Log the parsed response

        return response || "I'm not sure how to respond to that right now.";
    } catch (error) {
        console.error("Error generating response:", error);
        return "There was an error processing your request.";
    }
}



app.post('/api/process-voice', async (req, res) => {
    try {
        if (!req.files || !req.files.audio) {
            return res.status(400).json({ error: 'No audio file uploaded.' });
        }
        const audioData = req.files.audio.data;
        const mimetype = req.files.audio.mimetype;

        const recognizeParams = {
            audio: audioData,
            contentType: mimetype,
            model: process.env.IBM_SPEECH_TO_TEXT_MODEL || 'en-US_Multimedia',
            timestamps: false,
        };

        speechToText.recognize(recognizeParams)
            .then(async speechRecognitionResults => { // Added async here
                const transcription = speechRecognitionResults.result?.results?.[0]?.alternatives?.[0]?.transcript;
                if (transcription) {
                    console.log("Transcribed Text (IBM):", transcription);
                    const botResponseText = await getGeminiResponse(transcription);
                    let audioBase64 = null;

                    try {
                        const ttsPayload = {
                            utterances: [{
                                voice:{id:"755c613d-016d-427b-8ed1-5d6a6d9dde24"},
                                text: botResponseText,
                            }],
                            format: { type: "mp3" }
                        };
                        const synthesisResponse = await humeClient.tts.synthesizeJson(ttsPayload);
                        if (synthesisResponse?.generations?.[0]?.audio) {
                            audioBase64 = synthesisResponse.generations[0].audio;
                        } else {
                            console.error("Hume AI TTS failed or no audio in response.");
                        }
                    } catch (ttsError) {
                        console.error("Error during Hume AI TTS:", ttsError);
                        return res.status(500).json({ error: 'Error during TTS processing.' }); // Return here to stop further execution
                    }

                    res.json({ response: botResponseText, audioBase64: audioBase64 });
                } else {
                    res.json({ error: 'Could not transcribe audio using IBM Speech to Text.' });
                }
            })
            .catch(err => {
                console.error('Error transcribing audio with IBM Speech to Text:', err);
                res.status(500).json({ error: 'Error during speech-to-text with IBM.' });
            });

    } catch (error) {
        console.error("Error processing voice input:", error);
        res.status(500).json({ error: 'Failed to process voice input.' });
    }
});

const client = new HumeClient({ apiKey: HUME_API_KEY});

app.post('/api/chatbot', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    try {
        const botResponseText = await getGeminiResponse(userMessage);

        conversationHistory.push({ role: 'user', text: userMessage });
        conversationHistory.push({ role: 'model', text: botResponseText });

        res.json({ response: botResponseText });
    } catch (error) {
        console.error('Error processing chatbot message:', error);
        res.status(500).json({ error: 'Failed to process chatbot message.' });
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
