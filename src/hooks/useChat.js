import { useState, useCallback } from 'react';
import { sendMessage } from '../services/n8nService';

/**
 * Manages all chat state: messages, loading, errors, and session.
 */
export function useChat(sessionId) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addMessage = useCallback((role, text) => {
        const msg = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            role,        // 'user' | 'ai'
            text,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, msg]);
        return msg;
    }, []);

    const send = useCallback(async (text) => {
        if (!text.trim() || isLoading) return;

        setError(null);
        addMessage('user', text.trim());
        setIsLoading(true);

        try {
            const reply = await sendMessage(text.trim(), sessionId);
            addMessage('ai', reply);
        } catch (err) {
            setError(err.message);
            addMessage('ai', `⚠️ ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, sessionId, addMessage]);

    const clearMessages = useCallback(() => {
        setMessages([]);
        setError(null);
    }, []);

    return { messages, isLoading, error, send, clearMessages, setError };
}
