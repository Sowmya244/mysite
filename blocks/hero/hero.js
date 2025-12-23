/*
 * Hero Block – Background Image + Title + Subtitle + CTA
 * Google Docs caption-safe
 */

export default function decorate(block) {
  const rows = [...block.children];

  let picture;
  let title;
  let subtitle;
  let cta;

  let titleFound = false;

  rows.forEach((row) => {
    // Image (background)
    const pic = row.querySelector('picture');
    if (pic) {
      picture = pic;
      return;
    }

    // Title
    const h1 = row.querySelector('h1');
    if (h1) {
      title = h1;
      titleFound = true;
      return;
    }

    // Subtitle = first <p> AFTER title (ignores image caption)
    if (titleFound && !subtitle) {
      const p = row.querySelector('p');
      if (p) {
        subtitle = p;
        return;
      }
    }

    // CTA
    const a = row.querySelector('a');
    if (a) {
      cta = a;
    }
  });

  // Build overlay content
  const content = document.createElement('div');
  content.className = 'hero-content';

  if (title) content.append(title);
  if (subtitle) content.append(subtitle);
  if (cta) content.append(cta);

  // Clear original block
  block.textContent = '';

  // Background image
  if (picture) {
    block.append(picture);
  }

  // Overlay content
  block.append(content);
}
