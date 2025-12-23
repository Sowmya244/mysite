/*
 * Hero Block – Background Image + Title + Subtitle + CTA
 */

export default function decorate(block) {
  const rows = [...block.children];

  let picture;
  let title;
  let subtitle;
  let cta;

  rows.forEach((row) => {
    if (row.querySelector('picture')) {
      picture = row.querySelector('picture');
    } else if (row.querySelector('h1')) {
      title = row.querySelector('h1');
    } else if (row.querySelector('a')) {
      cta = row.querySelector('a');
    } else if (row.querySelector('p')) {
      subtitle = row.querySelector('p');
    }
  });

  const content = document.createElement('div');
  content.className = 'hero-content';

  if (title) content.append(title);
  if (subtitle) content.append(subtitle);
  if (cta) content.append(cta);

  // Clear original content
  block.textContent = '';

  // Background image
  if (picture) {
    block.append(picture);
  }

  // Overlay content
  block.append(content);
}
