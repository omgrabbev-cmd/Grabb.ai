import React from 'react';
import { AI_PERSONA } from '../config';

function formatTime(date) {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MessageBubble({ message }) {
    const isUser = message.role === 'user';

    return (
        <div className={`message-group ${isUser ? 'user' : 'ai'}`}>
            {!isUser && (
                <div className="msg-avatar ai-msg" title={AI_PERSONA.name}>
                    {AI_PERSONA.avatar}
                </div>
            )}

            <div>
                <div className="message-bubble">
                    {message.text}
                </div>
                <div className="message-time">{formatTime(message.timestamp)}</div>
            </div>

            {isUser && (
                <div className="msg-avatar user-msg" title="You">
                    👤
                </div>
            )}
        </div>
    );
}
