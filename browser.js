(() => {
  if (window.__codeRunInjected) return;
  window.__codeRunInjected = true;

  const PROTO = 'ptweb';
  const CWD = '/home/mamad/Videos/ptweb';  // exmple file pwd => /home/mamad/Videos/ptweb
  const MAX = 1600;

  function toast(msg, color = '#238636') {
    let t = document.getElementById('rb-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'rb-toast';
      t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);' +
        'padding:10px 20px;border-radius:8px;color:#fff;font:600 13px system-ui;' +
        'opacity:0;transition:opacity .2s;pointer-events:none;z-index:1000000';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.background = color;
    t.style.opacity = '1';
    clearTimeout(t._t);
    t._t = setTimeout(() => t.style.opacity = '0', 1800);
  }

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); return true; }
      catch { return false; }
      finally { ta.remove(); }
    }
  }

  function attach(block) {
    if (block.querySelector('.rb-run-btn')) return;
    const bar = block.querySelector('[data-markdown-copy="exclude"]');
    const copyBtn = bar?.querySelector('button[aria-label="Copy code"]');
    if (!copyBtn) return;

    const btn = document.createElement('button');
    btn.textContent = 'Run';
    btn.className = 'rb-run-btn';
    btn.style.cssText = 'padding:4px 12px;margin-left:4px;background:#238636;' +
      'color:#fff;border:0;border-radius:999px;font:600 11px system-ui;cursor:pointer';

    btn.onclick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const code = (block.querySelector('pre code') || block.querySelector('pre'))?.innerText.trim();
      if (!code) { toast('empty', '#da3633'); return; }

      const url = `${PROTO}://run?cmd=${encodeURIComponent(code)}&cwd=${encodeURIComponent(CWD)}`;
      if (url.length > MAX) {
        if (!await copy(code)) { toast('copy failed', '#da3633'); return; }
        await new Promise(r => setTimeout(r, 150));
        window.location.href = `${PROTO}://run?clip=1&cwd=${encodeURIComponent(CWD)}`;
        toast('sent via clipboard');
      } else {
        window.location.href = url;
        toast('launching…');
      }
    };

    copyBtn.parentElement.appendChild(btn);
  }

  const scan = () => document.querySelectorAll('[data-code-block="true"]').forEach(attach);
  scan();

  new MutationObserver((ms) => {
    for (const m of ms) for (const n of m.addedNodes) {
      if (n.nodeType !== 1) continue;
      if (n.matches?.('[data-code-block="true"]')) attach(n);
      else n.querySelectorAll?.('[data-code-block="true"]').forEach(attach);
    }
  }).observe(document.body, { childList: true, subtree: true });

  console.log('%c✓ Run button injected', 'color:#3fb950;font-weight:600');
})();
