import React, { useState, useEffect } from 'react';
import { N8N_CONFIG, AI_PERSONA } from '../config';

export default function ConfigModal({ onClose }) {
    const [webhookUrl, setWebhookUrl] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [botName, setBotName] = useState(AI_PERSONA.name);
    const [saved, setSaved] = useState(false);

    // Load persisted values on mount
    useEffect(() => {
        setWebhookUrl(localStorage.getItem('n8n_webhook_url') || N8N_CONFIG.WEBHOOK_URL);
        setApiKey(localStorage.getItem('n8n_api_key') || N8N_CONFIG.API_KEY);
        setBotName(localStorage.getItem('ai_bot_name') || AI_PERSONA.name);
    }, []);

    const handleSave = () => {
        localStorage.setItem('n8n_webhook_url', webhookUrl.trim());
        localStorage.setItem('n8n_api_key', apiKey.trim());
        localStorage.setItem('ai_bot_name', botName.trim());

        // Patch runtime config so the service picks it up without a page reload
        N8N_CONFIG.WEBHOOK_URL = webhookUrl.trim();
        N8N_CONFIG.API_KEY = apiKey.trim();
        AI_PERSONA.name = botName.trim() || AI_PERSONA.name;

        setSaved(true);
        setTimeout(() => { setSaved(false); onClose(); }, 800);
    };

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal-panel" role="dialog" aria-labelledby="config-title">
                <h2 className="modal-title" id="config-title">⚙️ Configuration</h2>
                <p className="modal-subtitle">
                    Connect your n8n webhook and customise the assistant persona.
                </p>

                <div className="form-group">
                    <label className="form-label" htmlFor="webhook-url">n8n Webhook URL *</label>
                    <input
                        id="webhook-url"
                        className="form-input"
                        type="url"
                        placeholder="https://your-n8n-instance.com/webhook/..."
                        value={webhookUrl}
                        onChange={e => setWebhookUrl(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="api-key">API Key / Bearer Token (optional)</label>
                    <input
                        id="api-key"
                        className="form-input"
                        type="password"
                        placeholder="Leave blank if your webhook is public"
                        value={apiKey}
                        onChange={e => setApiKey(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="bot-name">Assistant Name</label>
                    <input
                        id="bot-name"
                        className="form-input"
                        type="text"
                        placeholder="e.g. Aria, Nova, Assistant…"
                        value={botName}
                        onChange={e => setBotName(e.target.value)}
                        maxLength={30}
                    />
                </div>

                <div className="modal-actions">
                    <button id="config-cancel-btn" className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button
                        id="config-save-btn"
                        className="btn-primary"
                        onClick={handleSave}
                    >
                        {saved ? '✅ Saved!' : 'Save Configuration'}
                    </button>
                </div>
            </div>
        </div>
    );
}
