/* Zonke Toolkit — shared utilities for lead magnet tools */

function toolAnimateValue(el, start, end, duration, prefix, suffix) {
  const startTime = performance.now();
  const isFloat = (start % 1 !== 0) || (end % 1 !== 0);

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * eased;
    const formatted = isFloat ? current.toFixed(1) : Math.round(current).toLocaleString();
    el.textContent = (prefix || '') + formatted + (suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function toolFormatZAR(amount) {
  return 'R' + Math.round(amount).toLocaleString();
}

function toolTerminalType(el, text, speed, callback) {
  let i = 0;
  el.textContent = '';
  el.style.visibility = 'visible';

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

function toolDelayedShow(el, delay) {
  setTimeout(() => {
    el.classList.remove('hidden');
    el.classList.add('fade-in');
  }, delay);
}

function toolShowEmailGate(toolId, results, onComplete) {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 z-50 flex items-center justify-center bg-surface/90 backdrop-blur-sm';
  overlay.innerHTML = `
    <div class="bg-surface-container border border-outline-variant p-xl max-w-md w-full mx-sm">
      <div class="text-primary font-bold text-headline-md mb-md">> UNLOCK YOUR REPORT</div>
      <p class="text-on-surface-variant text-body-sm mb-lg">Enter your email to receive the full Lead Leak Report with personalized recommendations.</p>
      <div id="tool-gate-error" class="text-secondary-container text-body-sm mb-sm hidden">Please enter a valid email.</div>
      <form id="tool-gate-form">
        <input type="email" id="tool-gate-email" placeholder="your@email.com" required
          class="w-full bg-surface border border-outline-variant p-md text-on-surface font-mono text-body-sm outline-none focus:border-primary transition-colors mb-md"
          autocomplete="email" />
        <button type="submit"
          class="w-full bg-primary text-on-primary font-bold py-md px-lg text-body-sm uppercase tracking-widest hover:bg-primary-fixed-dim transition-colors cursor-pointer">
          UNLOCK REPORT →
        </button>
      </form>
      <p class="text-on-surface-variant text-code-snippet mt-md text-center opacity-60">No spam. Unsubscribe anytime.</p>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#tool-gate-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = overlay.querySelector('#tool-gate-email').value.trim();
    const errorEl = overlay.querySelector('#tool-gate-error');

    if (!email || !email.includes('@')) {
      errorEl.classList.remove('hidden');
      return;
    }
    errorEl.classList.add('hidden');

    try {
      const res = await fetch('/api/tool-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool_id: toolId, email, results })
      });
      if (!res.ok) throw new Error('Submission failed');
    } catch (err) {
      console.error('Tool submit error:', err);
    }

    overlay.remove();
    if (onComplete) onComplete(email);
  });
}

function toolLinearGradient(ctx, x1, y1, x2, y2, colorStops) {
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  colorStops.forEach(([offset, color]) => grad.addColorStop(offset, color));
  return grad;
}
