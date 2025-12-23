/*
 * Accordion Block – Full JS
 * https://www.hlx.live/developer/block-collection/accordion
 */

export default function decorate(block) {
  const items = [];

  [...block.children].forEach((row) => {
    // Label (summary)
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    // Body
    const body = row.children[1];
    body.className = 'accordion-item-body';

    // Details wrapper
    const details = document.createElement('details');
    details.className = 'accordion-item';

    details.append(summary, body);
    row.replaceWith(details);

    items.push(details);
  });

  // Optional: allow only one open at a time
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
