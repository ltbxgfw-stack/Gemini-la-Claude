/**
 * DOM manipulation and UI utilities module
 */

import { escapeHtml, markdownToHtml } from './parser.js';

export function openModal(document, systemPrompt) {
  document.getElementById('promptEditor').value = systemPrompt;
  document.getElementById('modalOverlay').classList.add('open');
}

export function closeModal(document) {
  document.getElementById('modalOverlay').classList.remove('open');
}

export function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 140) + 'px';
}

export function showError(document, msg) {
  const el = document.getElementById('errorBanner');
  el.innerHTML = `<div class="error-msg">${msg}</div>`;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 5000);
}

export function appendMessage(document, role, content) {
  const welcome = document.getElementById('welcome');
  if (welcome) welcome.remove();

  const container = document.getElementById('messages');

  if (role === 'user') {
    const div = document.createElement('div');
    div.className = 'msg user';
    div.innerHTML = `<div class="bubble">${escapeHtml(content)}</div>`;
    container.appendChild(div);
  } else if (role === 'thinking') {
    const div = document.createElement('div');
    div.className = 'msg assistant';
    div.id = 'thinkingMsg';
    div.innerHTML = `
      <div class="avatar">✦</div>
      <div class="content">
        <div class="thinking"><span></span><span></span><span></span></div>
      </div>`;
    container.appendChild(div);
  } else {
    const existing = document.getElementById('thinkingMsg');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.className = 'msg assistant';
    div.innerHTML = `<div class="avatar">✦</div><div class="content">${markdownToHtml(content)}</div>`;
    container.appendChild(div);
  }

  container.scrollTop = container.scrollHeight;
}

export function startRetryCountdown(document, seconds) {
  let remaining = seconds;
  const btn = document.getElementById('sendBtn');
  btn.disabled = true;
  const timer = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(timer);
      btn.disabled = false;
      document.getElementById('statusDot').className = 'status-dot active';
    }
  }, 1000);
}
