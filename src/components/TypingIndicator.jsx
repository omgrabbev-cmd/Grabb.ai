import React from 'react';

export default function TypingIndicator() {
    return (
        <div className="typing-indicator">
            <div className="msg-avatar ai-msg">🤖</div>
            <div className="typing-bubble">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
            </div>
        </div>
    );
}
