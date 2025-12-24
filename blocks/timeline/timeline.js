/*
 * Timeline Block – Evolution of AI
 */

export default function decorate(block) {
  const items = [...block.children];
  const container = document.createElement('div');
  container.className = 'timeline';

  items.forEach((item) => {
    const year = item.children[0]?.textContent.trim();
    const title = item.children[1]?.textContent.trim();
    const description = item.children[2]?.textContent.trim();

    const entry = document.createElement('div');
    entry.className = 'timeline-item';

    entry.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-year">${year}</span>
        <h3>${title}</h3>
        <p>${description}</p>
      </div>
    `;

    container.append(entry);
  });

  block.replaceChildren(container);
}
