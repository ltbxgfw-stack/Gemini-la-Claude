import { callGemini } from './core/api.js';
import {
  state,
  setSystemPrompt,
  resetConversation,
  addMessageToHistory,
  popMessageFromHistory,
  setLoading
} from './core/state.js';
import {
  openModal as uiOpenModal,
  closeModal as uiCloseModal,
  autoResize,
  showError,
  appendMessage,
  startRetryCountdown
} from './utils/ui-utils.js';

// Init UI State
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('promptDisplay').textContent = state.systemPrompt;
  document.getElementById('promptEditor').value = state.systemPrompt;

  // API Key status watcher
  const apiKeyInput = document.getElementById('apiKey');
  if (apiKeyInput) {
    apiKeyInput.addEventListener('input', function() {
      const dot = document.getElementById('statusDot');
      dot.className = 'status-dot' + (this.value.trim().length > 10 ? ' active' : '');
    });
  }
});

// Modal Actions
window.openModal = function() {
  uiOpenModal(document, state.systemPrompt);
};

window.closeModal = function() {
  uiCloseModal(document);
};

window.closeModalOutside = function(e) {
  if (e.target === document.getElementById('modalOverlay')) {
    window.closeModal();
  }
};

window.savePrompt = function() {
  const newPrompt = document.getElementById('promptEditor').value.trim();
  setSystemPrompt(newPrompt);
  document.getElementById('promptDisplay').textContent = state.systemPrompt;
  resetConversation(); // reset history when prompt changes
  window.closeModal();
};

// Chat Actions
window.quickAsk = function(text) {
  document.getElementById('userInput').value = text;
  window.sendMessage();
};

window.handleKey = function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    window.sendMessage();
  }
};

window.autoResize = function(el) {
  autoResize(el);
};

// Main Message Send Logic
window.sendMessage = async function() {
  if (state.isLoading) return;

  const apiKey = document.getElementById('apiKey').value.trim();
  if (!apiKey) {
    showError(document, '请先输入 Gemini API Key');
    return;
  }

  const model = document.getElementById('modelSelect').value;
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  // UI Setup
  input.value = '';
  input.style.height = 'auto';
  document.getElementById('sendBtn').disabled = true;
  setLoading(true);

  // User message rendering
  appendMessage(document, 'user', text);
  addMessageToHistory('user', text);
  appendMessage(document, 'thinking', '');

  try {
    const body = {
      systemInstruction: { parts: [{ text: state.systemPrompt }] },
      contents: state.conversationHistory,
      generationConfig: {
        temperature: 0.85,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    const data = await callGemini(apiKey, model, body);
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      const reason = data?.candidates?.[0]?.finishReason || JSON.stringify(data).slice(0, 200);
      throw { type: 'api', message: `Gemini 返回了空响应。原因：${reason}` };
    }

    // Success response handling
    addMessageToHistory('model', reply);
    appendMessage(document, 'assistant', reply);
    document.querySelector('.badge').textContent = model;
    document.getElementById('statusDot').className = 'status-dot active';

  } catch (err) {
    const existing = document.getElementById('thinkingMsg');
    if (existing) existing.remove();
    popMessageFromHistory();

    if (err.type === 'quota') {
      showError(document, `⏳ ${err.message}`);
      if (err.retryAfter) {
        startRetryCountdown(document, err.retryAfter);
      }
    } else {
      showError(document, err.message || String(err));
    }
    document.getElementById('statusDot').className = 'status-dot error';
  }

  setLoading(false);
  document.getElementById('sendBtn').disabled = false;
};
