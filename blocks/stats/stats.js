/*
 * Stats Block – Animated Counters
 */

function animateValue(el, start, end, duration) {
  let startTimestamp = null;

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    el.textContent = value.toLocaleString();

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

export default function decorate(block) {
  const items = [...block.children];
  const container = document.createElement('div');
  container.className = 'stats';

  items.forEach((item) => {
    const numberText = item.children[0]?.textContent.trim() || '0';
    const labelText = item.children[1]?.textContent.trim() || '';

    const match = numberText.match(/(\d+)/);
    const value = match ? parseInt(match[1], 10) : 0;
    const suffix = numberText.replace(/\d+/g, '');

    const stat = document.createElement('div');
    stat.className = 'stat';

    stat.innerHTML = `
      <div class="stat-number" data-value="${value}" data-suffix="${suffix}">0</div>
      <div class="stat-label">${labelText}</div>
    `;

    container.append(stat);
  });

  block.replaceChildren(container);

  // Animate on view
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const numberEl = entry.target.querySelector('.stat-number');
        const value = parseInt(numberEl.dataset.value, 10);
        const suffix = numberEl.dataset.suffix || '';

        animateValue(numberEl, 0, value, 1200);

        setTimeout(() => {
          numberEl.textContent = `${value}${suffix}`;
        }, 1200);

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  container.querySelectorAll('.stat').forEach((stat) => observer.observe(stat));
}
