// speech-to-text-service.js
import speech from '@google-cloud/speech';

// Creates a client
const speechClient = new speech.SpeechClient(); // Changed client to speechClient

async function transcribeAudio(audioData) {
  const audioBytes = audioData.toString('base64');
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: 'WEBM_OPUS', // Adjust based on your frontend's audio format
    sampleRateHertz: 48000, // Adjust based on your audio settings
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  try {
    const [operation] = await speechClient.longRunningRecognize(request); // Using speechClient
    const [response] = await operation.promise();
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    return transcription;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return null;
  }
}

export default { transcribeAudio };