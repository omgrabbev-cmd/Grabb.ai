import React, { useState, useRef, useEffect } from 'react';

const MAX_CHARS = 4000;

export default function ChatInput({ onSend, disabled }) {
    const [value, setValue] = useState('');
    const textareaRef = useRef(null);

    // Auto-resize textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }, [value]);

    const handleSubmit = () => {
        const trimmed = value.trim();
        if (!trimmed || disabled) return;
        onSend(trimmed);
        setValue('');
    };

    const handleKeyDown = (e) => {
        // Send on Enter (not Shift+Enter)
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="input-area">
            <div className="input-container">
                <textarea
                    ref={textareaRef}
                    id="chat-input"
                    className="message-input"
                    placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
                    value={value}
                    onChange={e => setValue(e.target.value.slice(0, MAX_CHARS))}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    rows={1}
                    aria-label="Chat message input"
                />

                <div className="input-actions">
                    <button
                        id="send-btn"
                        className="send-btn"
                        onClick={handleSubmit}
                        disabled={!value.trim() || disabled}
                        aria-label="Send message"
                        title="Send (Enter)"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="input-footer">
                <span className="input-hint">
                    {disabled ? '⏳ AI is thinking…' : 'Press Enter to send'}
                </span>
                <span className={`char-count ${value.length > MAX_CHARS * 0.9 ? 'warning' : ''}`}>
                    {value.length}/{MAX_CHARS}
                </span>
            </div>
        </div>
    );
}
