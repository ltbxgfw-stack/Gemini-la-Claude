/**
 * Gemini API interaction module
 */

export async function callGemini(apiKey, model, body) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify(body)
    });
  } catch (networkErr) {
    throw new Error(`网络错误（可能是 CORS 或无网络）：${networkErr.message}`);
  }

  // Try to parse response body regardless of status (for debugging)
  const rawText = await res.text();
  let parsed = {};
  try { parsed = JSON.parse(rawText); } catch(_) {}

  if (res.status === 429) {
    const retryAfter = res.headers.get('Retry-After') || '15';
    const apiMsg = parsed?.error?.message || '';
    throw { type: 'quota', message: `配额限制，请等待约 ${retryAfter} 秒再试。${apiMsg}`, retryAfter: parseInt(retryAfter) };
  }

  if (!res.ok) {
    // Show the REAL API error, not our own message
    const apiMsg = parsed?.error?.message || rawText.slice(0, 300) || `HTTP ${res.status}`;
    throw { type: 'api', message: `[${res.status}] ${apiMsg}` };
  }

  return parsed;
}
