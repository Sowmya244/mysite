/*
 * Hero Block – Enhanced Creative Hero
 */

export default function decorate(block) {
  const picture = block.querySelector('picture');
  const title = block.querySelector('h2');
  const paragraphs = [...block.querySelectorAll('p')];
  const subtitle = paragraphs.find((p) => !p.textContent.includes('shutterstock'));
  const cta = block.querySelector('a');

  const content = document.createElement('div');
  content.className = 'hero-content hero-animate';

  if (title) content.append(title);
  if (subtitle) content.append(subtitle);
  if (cta) content.append(cta);

  block.innerHTML = '';

  if (picture) block.append(picture);
  block.append(content);
}
