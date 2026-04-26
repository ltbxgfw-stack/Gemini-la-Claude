/**
 * Text parsing and security module
 *
 * Assumes marked.js is loaded globally via CDN in the HTML file.
 */

// We don't import 'marked' here, we assume window.marked exists.
// Initialize marked.js configuration
if (typeof window !== 'undefined' && window.marked) {
  window.marked.setOptions({
    breaks: true,
    gfm: true,
  });
}

export function escapeHtml(s) {
  return s.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br>');
}

export function markdownToHtml(text) {
  if (typeof window !== 'undefined' && window.marked) {
    return window.marked.parse(text);
  }
  // Fallback if marked is missing
  return escapeHtml(text);
}
