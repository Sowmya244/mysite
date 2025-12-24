/*
 * Video Block – FINAL FIXED VERSION
 * Works with EDS normalized DOM
 */

function getVideoLink(block) {
  return [...block.querySelectorAll('a')]
    .map((a) => a.href)
    .find((href) => href.includes('youtube')
      || href.includes('youtu.be')
      || href.includes('vimeo'));
}

function embedYoutube(url, autoplay) {
  const usp = new URLSearchParams(url.search);
  let vid = usp.get('v');

  if (url.origin.includes('youtu.be')) {
    [, vid] = url.pathname.split('/');
  }

  const params = new URLSearchParams({
    rel: '0',
    autoplay: autoplay ? '1' : '0',
    controls: '1',
    playsinline: '1',
  });

  const wrapper = document.createElement('div');
  wrapper.className = 'video-embed';
  wrapper.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${vid}?${params.toString()}"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
      loading="lazy"
      title="YouTube video">
    </iframe>
  `;
  return wrapper;
}

function loadVideo(block, link, autoplay) {
  if (block.dataset.embedLoaded === 'true') return;

  const url = new URL(link);
  const embed = embedYoutube(url, autoplay);

  block.append(embed);
  block.dataset.embedLoaded = 'true';
}

export default function decorate(block) {
  const placeholder = block.querySelector('picture');
  const link = getVideoLink(block);

  if (!link) return;

  block.textContent = '';
  block.dataset.embedLoaded = 'false';

  if (placeholder) {
    const wrapper = document.createElement('div');
    wrapper.className = 'video-placeholder';
    wrapper.append(placeholder);

    const play = document.createElement('button');
    play.className = 'video-play-button';
    play.setAttribute('aria-label', 'Play video');

    play.addEventListener('click', () => {
      wrapper.remove();
      loadVideo(block, link, true);
    });

    wrapper.append(play);
    block.append(wrapper);
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        loadVideo(block, link, false);
      }
    });
    observer.observe(block);
  }
}
