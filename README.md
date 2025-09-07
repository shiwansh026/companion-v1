# CompanionV1 - AI Mental Wellness Companion

![CompanionV1 Logo](logo.png)

**CompanionV1** is an AI-powered mental wellness companion that provides 24/7 emotional support through both text and voice interactions. Built with cutting-edge AI technology, it offers a safe space for users to express their thoughts, track their mental well-being, and receive personalized therapeutic support.

## 🌟 Features

### 🤖 AI-Powered Therapy
- **Personal Mental Therapist**: Dedicated AI companion trained to provide empathetic, therapeutic conversations
- **Mental Health Assessment**: Intelligent detection of mental health states with severity indexing (1-10 scale)
- **Pre-Therapeutic Sessions**: Free trial sessions to help users get comfortable with AI therapy

### 💬 Multi-Modal Communication
- **Text Chat**: Traditional text-based conversations with the AI therapist
- **Voice Chat**: Real-time voice interactions with speech-to-text and text-to-speech capabilities
- **Session Tracking**: Comprehensive logging and progress monitoring of therapy sessions

### 🧠 Mental Health Enhancement
- **Personalized Strategies**: Tailored mental wellness tools and exercises
- **Progress Insights**: Detailed session logs and improvement tracking over time
- **24/7 Availability**: Round-the-clock support whenever you need it

## 🚀 Technology Stack

### Backend
- **Node.js** with Express.js framework
- **Google Gemini AI** for conversational intelligence
- **IBM Watson Speech-to-Text** for voice transcription
- **Hume AI** for text-to-speech synthesis
- **CORS** enabled for cross-origin requests

### Frontend
- **Vanilla JavaScript** for dynamic interactions
- **HTML5** with responsive design
- **CSS3** with modern styling
- **Bootstrap Icons** for UI elements
- **Font Awesome** for additional icons

### AI Services
- **Google Generative AI (Gemini 2.0 Flash)** - Core conversation engine
- **IBM Watson Speech-to-Text** - Voice input processing
- **Hume AI TTS** - Voice response generation
- **Google Cloud Speech** - Alternative speech processing

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- API keys for the following services:
  - Google Gemini AI API
  - IBM Watson Speech-to-Text API
  - Hume AI API
  - Google Cloud Speech API (optional)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/CompanionV1.git
   cd CompanionV1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   HUME_AI_API_KEY=your_hume_ai_api_key_here
   IBM_SPEECH_TO_TEXT_API_KEY=your_ibm_api_key_here
   IBM_SPEECH_TO_TEXT_URL=your_ibm_service_url_here
   IBM_SPEECH_TO_TEXT_MODEL=en-US_Multimedia
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`
   - The main landing page will be available at `index.html`
   - The chat interface will be available at `index2.html`

## 🎯 Usage

### Getting Started
1. **Landing Page**: Visit the main page to learn about CompanionV1's features
2. **Start Chatting**: Click "Start Chatting Now" to begin your therapy session
3. **Choose Mode**: Select between text chat or voice chat based on your preference

### Text Chat
- Type your messages in the input field
- Press Enter or click Send to submit
- The AI will respond with empathetic, therapeutic guidance

### Voice Chat
- Click the microphone button to start recording
- Speak your message clearly
- The system will transcribe your speech and provide both text and audio responses

### Session Management
- All conversations are logged for progress tracking
- Access previous sessions through the sidebar menu
- Monitor your mental health journey over time

## 🔧 API Endpoints

### Chatbot API
- **POST** `/api/chatbot`
  - Processes text messages and returns AI responses
  - Body: `{ "message": "your message here" }`

### Voice Processing API
- **POST** `/api/process-voice`
  - Handles audio uploads, transcription, and voice response generation
  - Accepts audio files in WebM format
  - Returns both text response and audio response

## 🏗️ Project Structure

```
CompanionV1/
├── agent.js                 # Main server file with API endpoints
├── app.js                   # Frontend JavaScript for chat interface
├── index.html              # Landing page
├── index2.html             # Chat interface page
├── script.js               # Landing page JavaScript
├── speech-to-text-service.js # Google Cloud Speech service
├── style.css               # Chat interface styles
├── styles.css              # Landing page styles
├── logo.png                # Application logo
├── poster.png              # Hero section image
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🤝 Contributing

We welcome contributions to CompanionV1! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex functionality
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

- **Email**: support@mindease.ai
- **Phone**: (800) 555-1234
- **Address**: 123 Wellness St, San Francisco, CA

## ⚠️ Important Notes

### Mental Health Disclaimer
CompanionV1 is designed to provide emotional support and should not replace professional mental health care. For severe mental health concerns (index 8-10), the system will recommend consulting with qualified mental health professionals.

### Privacy & Security
- All conversations are processed securely
- Audio data is not stored permanently
- User privacy is our top priority

## 🔮 Future Enhancements

- [ ] User authentication and account management
- [ ] Advanced mood tracking and analytics
- [ ] Integration with wearable devices
- [ ] Multi-language support
- [ ] Mobile application
- [ ] Group therapy sessions
- [ ] Integration with healthcare providers

## 🙏 Acknowledgments

- **Google** for Gemini AI capabilities
- **IBM** for Watson Speech-to-Text services
- **Hume AI** for emotional intelligence and TTS
- **Open Source Community** for various libraries and tools

---

**Made with ❤️ for mental wellness**

*CompanionV1 - Your compassionate AI mental wellness companion, available 24/7 to support your emotional well-being.*