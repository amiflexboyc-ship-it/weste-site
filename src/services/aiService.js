import { generateLocalAiResponse } from '../../server/aiEngine.js';

/**
 * Sends a message to the WESTE AI Backend
 * Gracefully falls back to local neural client-side engine if backend is unreachable
 */
export async function sendChatMessage({ message, user, history = [] }) {
  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        user,
        history,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        ...data,
        network: 'backend-connected',
      };
    }
  } catch (err) {
    console.warn('[AI Service] Backend API call failed, switching to local client fallback:', err.message);
  }

  // Fallback to local intelligence generator
  const fallback = generateLocalAiResponse(message, user, history);
  return {
    ...fallback,
    network: 'client-fallback',
  };
}

/**
 * Check backend status
 */
export async function checkAiBackendStatus() {
  try {
    const res = await fetch('/api/ai/status');
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // ignore
  }
  return { status: 'client-ready', engine: 'Local Engine' };
}
