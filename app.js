let mediaRecorder;
let audioChunks = [];
let isVoiceInputActive = false;
const CHATBOT_API_URL = 'http://localhost:3000/api/chatbot';
const VOICE_PROCESS_API_URL = 'http://localhost:3000/api/process-voice';

const audioPlayer = document.getElementById('audio-player');
const startRecordButton = document.getElementById('start-record-button');
const stopRecordButton = document.getElementById('stop-record-button');
const micButton = document.getElementById('mic-button');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatLog = document.getElementById('chat-log');

// Initialize microphone recording
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            audioChunks = [];
            sendAudioToBackend(audioBlob); // Send audio to backend for transcription
        };
    })
    .catch(error => {
        console.error('Error accessing microphone:', error);
        alert('Could not access microphone. Please check your permissions.');
    });

// Toggle recording state when mic button is clicked
micButton.addEventListener('click', () => {
    const micIcon = micButton.querySelector('i');
    if (isRecording) {
        mediaRecorder.stop(); // Stop recording
        micButton.classList.remove('recording');
        micIcon.classList.remove('bi-mic-fill');
        micIcon.classList.add('bi-mic'); // Reset icon to idle state
        isRecording = false;
    } else {
        audioChunks = [];
        mediaRecorder.start(); // Start recording
        micButton.classList.add('recording');
        micIcon.classList.remove('bi-mic');
        micIcon.classList.add('bi-mic-fill'); // Change icon to recording state
        isRecording = true;
    }
});

// Send audio to backend for transcription
function sendAudioToBackend(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    appendMessage('You (Voice):', 'Processing...', 'user-message');

    fetch(VOICE_PROCESS_API_URL, {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                appendMessage('Bot:', data.response, 'bot-message');
                if (data.audioBase64) {
                    playAudio(data.audioBase64);
                } else {
                    audioPlayer.style.display = 'none';
                }
            } else if (data.error) {
                appendMessage('Error (Voice):', data.error, 'bot-message');
            } else {
                appendMessage('Error (Voice):', 'Could not process voice input.', 'bot-message');
            }
        })
        .catch(error => {
            console.error('Error sending audio:', error);
            appendMessage('Error (Voice):', 'Failed to send audio to backend.', 'bot-message');
        });
}

// Send text message to backend
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('You:', message, 'user-message');
    userInput.value = '';

    fetch(CHATBOT_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                appendMessage('Companion:', data.response, 'bot-message');
            } else if (data.error) {
                appendMessage('Error:', data.error, 'bot-message');
            }
        })
        .catch(error => {
            console.error('Error sending message:', error);
            appendMessage('Error:', 'Could not communicate with the chatbot.', 'bot-message');
        });
}

// Append messages to the chat log
function appendMessage(sender, text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(className);
    messageDiv.innerHTML = `<strong>${sender}</strong> ${text}`;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Play audio response from the bot
function playAudio(base64Audio) {
    const audioBlob = base64ToBlob(base64Audio, 'audio/mpeg'); // Adjust MIME type if needed
    const audioUrl = URL.createObjectURL(audioBlob);
    audioPlayer.src = audioUrl;
    audioPlayer.style.display = 'block';
    audioPlayer.play();
}

// Convert Base64 to Blob
function base64ToBlob(base64, mimeType) {
    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
}

// Event listeners for sending messages
sendButton.addEventListener('click', () => {
    if (!isVoiceInputActive) {
        sendMessage();
    }
});

userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && !isVoiceInputActive) {
        sendMessage();
    }
});