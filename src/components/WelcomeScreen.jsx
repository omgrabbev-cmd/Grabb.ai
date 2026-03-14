import React from 'react';
import { AI_PERSONA, SUGGESTIONS } from '../config';

export default function WelcomeScreen({ onSuggestion }) {
    return (
        <div className="welcome-screen">
            <div className="welcome-icon">{AI_PERSONA.avatar}</div>

            <div>
                <h1 className="welcome-title">Hello, I'm {AI_PERSONA.name}</h1>
                <p className="welcome-subtitle">
                    {AI_PERSONA.greeting}
                </p>
            </div>

            <div className="suggestions-grid">
                {SUGGESTIONS.map((s, i) => (
                    <button
                        key={i}
                        id={`suggestion-${i}`}
                        className="suggestion-card"
                        onClick={() => onSuggestion(s.text)}
                        aria-label={s.label}
                    >
                        <span className="suggestion-icon">{s.icon}</span>
                        <div className="suggestion-label">{s.label}</div>
                        <div>{s.text}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}
