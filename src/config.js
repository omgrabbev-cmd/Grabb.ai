// ============================================================
//  n8n Webhook Configuration
//  All variables you need to customise for your n8n workflow
// ============================================================

export const N8N_CONFIG = {
    // 🔗 Your n8n webhook URL
    WEBHOOK_URL: import.meta.env.VITE_N8N_WEBHOOK_URL || '',

    // 🔑 Optional bearer token / API key sent as Authorization header
    API_KEY: import.meta.env.VITE_N8N_API_KEY || '',

    // 🏷️  Name of the field n8n expects for the user message
    MESSAGE_FIELD: 'message',

    // 🏷️  Name of the field n8n expects for the session / conversation ID
    SESSION_FIELD: 'sessionId',

    // 🏷️  Name of the field n8n expects for extra metadata (optional)
    METADATA_FIELD: 'metadata',

    // ⏱️  Request timeout in milliseconds
    TIMEOUT_MS: 30000,

    // 📤 HTTP method — 'POST' | 'GET'
    METHOD: 'POST',
};

// ============================================================
//  AI Persona  —  what the user sees in the UI
// ============================================================
export const AI_PERSONA = {
    name: 'Aria',
    tagline: 'Powered by n8n',
    greeting: "Hi! I'm Aria, your AI assistant. How can I help you today?",
    avatar: '🤖',
};

// ============================================================
//  Suggested starter prompts shown on the welcome screen
// ============================================================
export const SUGGESTIONS = [
    { icon: '💡', label: 'Explain a concept', text: 'Can you explain how machine learning works in simple terms?' },
    { icon: '✍️', label: 'Write something', text: 'Write a professional email to schedule a meeting.' },
    { icon: '🔍', label: 'Analyse data', text: 'Help me analyse the pros and cons of this business idea.' },
    { icon: '🛠️', label: 'Debug code', text: 'Review my code and suggest improvements.' },
];
