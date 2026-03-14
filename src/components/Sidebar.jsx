import React from 'react';
import { AI_PERSONA } from '../config';

export default function Sidebar({ sessions, activeId, onNewChat, onSelectSession, webhookSet, onOpenConfig }) {
    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-header">
                <div className="logo">
                    <div className="logo-icon">{AI_PERSONA.avatar}</div>
                    <span className="logo-text">AI Chat</span>
                </div>

                <button id="new-chat-btn" className="new-chat-btn" onClick={onNewChat}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New Chat
                </button>
            </div>

            {/* History */}
            <nav className="chat-history" aria-label="Chat history">
                {sessions.length > 0 && (
                    <p className="history-label">Recent</p>
                )}
                {sessions.map(s => (
                    <button
                        key={s.id}
                        id={`session-${s.id}`}
                        className={`history-item ${s.id === activeId ? 'active' : ''}`}
                        onClick={() => onSelectSession(s.id)}
                        title={s.title}
                    >
                        💬 {s.title}
                    </button>
                ))}
                {sessions.length === 0 && (
                    <p className="history-label" style={{ marginTop: 16, opacity: 0.5 }}>No chats yet</p>
                )}
            </nav>

            {/* Footer / Config */}
            <div className="sidebar-footer">
                <button id="config-btn" className="config-badge" onClick={onOpenConfig} aria-label="Open configuration">
                    <span className={`config-dot ${webhookSet ? '' : 'offline'}`} />
                    <span style={{ flex: 1 }}>{webhookSet ? 'n8n Connected' : 'Setup Required'}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                </button>
            </div>
        </aside>
    );
}
