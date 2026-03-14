import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import WelcomeScreen from './components/WelcomeScreen';
import ConfigModal from './components/ConfigModal';
import { useChat } from './hooks/useChat';
import { N8N_CONFIG, AI_PERSONA } from './config';

// ── Helpers ──────────────────────────────────────────────────────────────────

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createSession(id) {
  return { id, title: 'New Chat', createdAt: new Date() };
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  // ── Runtime config from localStorage ──
  const [webhookSet, setWebhookSet] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    // Restore saved config into the runtime object on mount
    const savedUrl = localStorage.getItem('n8n_webhook_url');
    const savedKey = localStorage.getItem('n8n_api_key');
    const savedName = localStorage.getItem('ai_bot_name');

    if (savedUrl) { N8N_CONFIG.WEBHOOK_URL = savedUrl; setWebhookSet(true); }
    if (savedKey) N8N_CONFIG.API_KEY = savedKey;
    if (savedName) AI_PERSONA.name = savedName;

    // Show config on first load if no webhook set
    if (!savedUrl && !N8N_CONFIG.WEBHOOK_URL) setShowConfig(true);
  }, []);

  // ── Sessions (sidebar history) ──
  const [sessions, setSessions] = useState(() => {
    const id = generateId();
    return [createSession(id)];
  });
  const [activeSessionId, setActiveSessionId] = useState(() => sessions[0].id);

  // ── Chat state via custom hook ──
  const { messages, isLoading, send, clearMessages } = useChat(activeSessionId);

  // Update session title from first user message
  const titledRef = useRef(false);
  useEffect(() => {
    if (!titledRef.current && messages.length > 0 && messages[0].role === 'user') {
      const title = messages[0].text.slice(0, 36) + (messages[0].text.length > 36 ? '…' : '');
      setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, title } : s));
      titledRef.current = true;
    }
  }, [messages, activeSessionId]);

  // ── New chat ──
  const handleNewChat = useCallback(() => {
    const id = generateId();
    setSessions(prev => [createSession(id), ...prev]);
    setActiveSessionId(id);
    clearMessages();
    titledRef.current = false;
  }, [clearMessages]);

  // ── Select existing session ──
  const handleSelectSession = useCallback((id) => {
    setActiveSessionId(id);
    clearMessages();
    titledRef.current = false;
  }, [clearMessages]);

  // ── Config modal ──
  const handleCloseConfig = useCallback(() => {
    setShowConfig(false);
    const url = localStorage.getItem('n8n_webhook_url') || N8N_CONFIG.WEBHOOK_URL;
    setWebhookSet(!!url);
  }, []);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        activeId={activeSessionId}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        webhookSet={webhookSet}
        onOpenConfig={() => setShowConfig(true)}
      />

      {/* Main chat area */}
      <main className="chat-area">
        {/* Header */}
        <header className="chat-header">
          <div className="chat-header-info">
            <div className="ai-avatar">{AI_PERSONA.avatar}</div>
            <div>
              <div className="ai-name">{AI_PERSONA.name}</div>
              <div className="ai-status">
                <span className="status-dot" />
                {AI_PERSONA.tagline}
              </div>
            </div>
          </div>

          <div className="header-actions">
            <button
              id="clear-btn"
              className="icon-btn"
              onClick={() => { clearMessages(); titledRef.current = false; }}
              title="Clear conversation"
              aria-label="Clear conversation"
            >
              🗑️
            </button>
            <button
              id="settings-btn"
              className="icon-btn"
              onClick={() => setShowConfig(true)}
              title="Settings"
              aria-label="Settings"
            >
              ⚙️
            </button>
          </div>
        </header>

        {/* Messages or Welcome */}
        {messages.length === 0 && !isLoading
          ? <WelcomeScreen onSuggestion={(text) => send(text)} />
          : <MessageList messages={messages} isLoading={isLoading} />
        }

        {/* Input */}
        <ChatInput onSend={send} disabled={isLoading} />
      </main>

      {/* Config modal */}
      {showConfig && <ConfigModal onClose={handleCloseConfig} />}
    </div>
  );
}
