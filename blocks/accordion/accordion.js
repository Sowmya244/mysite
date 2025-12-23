/*
 * Accordion Block – SaaS Style (+ / − icons)
 * https://www.hlx.live/developer/block-collection/accordion
 */

export default function decorate(block) {
  const items = [];

  [...block.children].forEach((row) => {
    const labelCell = row.children[0];
    const body = row.children[1];

    const rawText = labelCell.textContent;

    /* Extract badge */
    const badgeMatch = rawText.match(/\[badge:(.*?)\]/);
    const badgeText = badgeMatch ? badgeMatch[1] : null;

    /* Clean title */
    const cleanTitle = rawText
      .replace(/\[badge:.*?\]/g, '')
      .trim();

    /* Summary */
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';

    /* Title */
    const title = document.createElement('span');
    title.className = 'accordion-title';
    title.textContent = cleanTitle;

    /* Badge */
    if (badgeText) {
      const badge = document.createElement('span');
      badge.className = `accordion-badge ${badgeText.toLowerCase()}`;
      badge.textContent = badgeText;
      title.appendChild(badge);
    }

    /* Right icon (+ / − handled via CSS) */
    const icon = document.createElement('span');
    icon.className = 'accordion-icon plus-minus';

    summary.append(title, icon);

    /* Body */
    body.className = 'accordion-item-body';

    /* Details */
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);

    row.replaceWith(details);
    items.push(details);
  });

  /* Only one open at a time */
  items.forEach((current) => {
    current.addEventListener('toggle', () => {
      if (current.open) {
        items.forEach((item) => {
          if (item !== current) {
            item.removeAttribute('open');
          }
        });
      }
    });
  });
}
