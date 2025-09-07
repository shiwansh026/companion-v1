const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
const footerContact = document.getElementById('footer-contact');
const contactLink = document.getElementById('contact-link');


 document.addEventListener('DOMContentLoaded', function() {
    
    const accountBtn = document.getElementById('account-btn');
    const accountModal = document.getElementById('account-modal');
    const closeModal = document.querySelector('.close-modal');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    
    
    accountBtn.addEventListener('click', function(e) {
        e.preventDefault();
        accountModal.style.display = 'block';
     
        loginSection.style.display = 'block';
        signupSection.style.display = 'none';
    });
    
    
    closeModal.addEventListener('click', function() {
        accountModal.style.display = 'none';
    });
    

    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
    });
    
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupSection.style.display = 'none';
        loginSection.style.display = 'block';
    });
 
    window.addEventListener('click', function(e) {
        if (e.target === accountModal) {
            accountModal.style.display = 'none';
        }
    });
});
footerContact.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(contactModal);
});

contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(contactModal);
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        closeModal(modal);
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});


document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login functionality would be implemented here');
    closeModal(loginModal);
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Signup functionality would be implemented here');
    closeModal(signupModal);
});

document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    closeModal(contactModal);
});



document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });
}); 

const voiceChatBtn = document.getElementById('voice-chat-btn');

voiceChatBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {

        window.location.href = 'chat.html?mode=voice';
    } else {
        alert('Voice chat is not supported in your browser. Please use Chrome or Edge.');
    }
});
if (window.location.search.includes('mode=voice')) {

    initVoiceChat();
}

function initVoiceChat() {

    const chatInput = document.querySelector('.chatbot-input input');
    const sendBtn = document.querySelector('.chatbot-input button');
    

    sendBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        recognition.start();
        sendBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        sendBtn.style.backgroundColor = '#ff4757';
    });
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        sendBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        sendBtn.style.backgroundColor = '#5d78ff';
    
        sendMessageToBot(transcript);
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        sendBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        sendBtn.style.backgroundColor = '#5d78ff';
    };
    
    recognition.onend = () => {
        sendBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        sendBtn.style.backgroundColor = '#5d78ff';
    };
}

function sendMessageToBot(message) {

    const messagesContainer = document.querySelector('.chatbot-messages');
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = message;
    messagesContainer.appendChild(userMessage);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    
    simulateBotResponse(message);
}

function simulateBotResponse(message) {

    setTimeout(() => {
        const messagesContainer = document.querySelector('.chatbot-messages');
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot-message');
        
       
        const response = generateBotResponse(message.toLowerCase());
        botMessage.textContent = response;
        
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
}

function generateBotResponse(message) {

    if (message.includes('hello') || message.includes('hi')) {
        return "Hello there! How can I help you today?";
    } else if (message.includes('how are you')) {
        return "I'm an AI, so I don't have feelings, but I'm here to help you!";
    } else if (message.includes('stress') || message.includes('anxious')) {
        return "I understand you're feeling stressed. Would you like to try some breathing exercises?";
    } else {
        return "I'm here to listen. Can you tell me more about how you're feeling?";
    }
}