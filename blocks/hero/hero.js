/*
 * Hero Block – AI Learning Hub
 * https://www.hlx.live/developer/block-collection/hero
 */

export default function decorate(block) {
  const rows = [...block.children];

  const hero = document.createElement('div');
  hero.className = 'hero-inner';

  rows.forEach((row, index) => {
    if (index === 0) {
      // Title
      row.className = 'hero-title';
    } else if (index === 1) {
      // Subtitle
      row.className = 'hero-subtitle';
    } else if (index === 2) {
      // Description
      row.className = 'hero-description';
    } else if (index === 3) {
      // Badge / CTA container
      row.className = 'hero-meta';
    } else {
      row.className = 'hero-cta';
    }

    hero.append(row);
  });

  block.textContent = '';
  block.append(hero);
}
