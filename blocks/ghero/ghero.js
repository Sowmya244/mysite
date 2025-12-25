export default function decorate(block) {
  const picture = block.querySelector('picture');
  const heading = block.querySelector('h1, h2');
  const paragraphs = [...block.querySelectorAll('p')];
  const links = [...block.querySelectorAll('a')];

  // create content wrapper
  const content = document.createElement('div');
  content.className = 'ghero-content';

  if (heading) content.append(heading);
  paragraphs.forEach((p) => content.append(p));
  links.forEach((a) => content.append(a));

  // rebuild block
  block.innerHTML = '';
  block.classList.add('ghero');

  if (picture) block.append(picture);
  block.append(content);
}
