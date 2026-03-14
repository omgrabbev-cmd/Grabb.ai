import { N8N_CONFIG } from '../config';

/**
 * Sends a user message to the configured n8n webhook and returns the AI reply.
 * @param {string} message      - The user's message text
 * @param {string} sessionId    - Unique conversation session ID
 * @param {object} metadata     - Any extra key/value pairs to pass through
 * @returns {Promise<string>}   - The AI's reply text
 */
export async function sendMessage(message, sessionId, metadata = {}) {
    const { WEBHOOK_URL, API_KEY, MESSAGE_FIELD, SESSION_FIELD, METADATA_FIELD, TIMEOUT_MS, METHOD } = N8N_CONFIG;

    if (!WEBHOOK_URL) {
        throw new Error('No webhook URL configured. Please open Settings and enter your n8n webhook URL.');
    }

    const payload = {
        [MESSAGE_FIELD]: message,
        [SESSION_FIELD]: sessionId,
        [METADATA_FIELD]: metadata,
        timestamp: new Date().toISOString(),
    };

    const headers = {
        'Content-Type': 'application/json',
    };

    if (API_KEY) {
        headers['Authorization'] = `Bearer ${API_KEY}`;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: METHOD,
            headers,
            body: METHOD === 'POST' ? JSON.stringify(payload) : undefined,
            signal: controller.signal,
        });

        clearTimeout(timer);

        if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            throw new Error(`Webhook returned ${response.status}: ${errorText || response.statusText}`);
        }

        const data = await response.json();

        // ── Flexible response extraction ──────────────────────────────────────────
        // Tries common field names returned by n8n workflows.
        // Adjust the list below to match YOUR workflow's output field name.
        const reply =
            data?.output ||
            data?.reply ||
            data?.response ||
            data?.message ||
            data?.text ||
            data?.answer ||
            (typeof data === 'string' ? data : null);

        if (!reply) {
            console.warn('n8n response shape:', data);
            throw new Error('Could not find a reply field in the webhook response. Check console for the raw response shape.');
        }

        return reply;
    } catch (err) {
        clearTimeout(timer);
        if (err.name === 'AbortError') {
            throw new Error(`Request timed out after ${TIMEOUT_MS / 1000}s. Check your n8n webhook is running.`);
        }
        throw err;
    }
}
