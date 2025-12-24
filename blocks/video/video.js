/*
 * Video Block – Enhanced (EDS Safe)
 * https://www.hlx.live/developer/block-collection/video
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function embedYoutube(url, autoplay, background) {
  const usp = new URLSearchParams(url.search);
  let vid = usp.get('v');

  if (url.origin.includes('youtu.be')) {
    [, vid] = url.pathname.split('/');
  }

  const params = new URLSearchParams({
    rel: '0',
    autoplay: autoplay ? '1' : '0',
    mute: background ? '1' : '0',
    controls: '1',
    playsinline: '1',
  });

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div style="position:relative;padding-bottom:56.25%;height:0;">
      <iframe
        src="https://www.youtube.com/embed/${vid}?${params.toString()}"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy"
        title="YouTube video"
        style="position:absolute;inset:0;width:100%;height:100%;border-radius:16px;">
      </iframe>
    </div>
  `;
  return wrapper.firstElementChild;
}

function embedVimeo(url, autoplay, background) {
  const [, video] = url.pathname.split('/');
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    muted: background ? '1' : '0',
    controls: '1',
  });

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div style="position:relative;padding-bottom:56.25%;height:0;">
      <iframe
        src="https://player.vimeo.com/video/${video}?${params.toString()}"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy"
        title="Vimeo video"
        style="position:absolute;inset:0;width:100%;height:100%;border-radius:16px;">
      </iframe>
    </div>
  `;
  return wrapper.firstElementChild;
}

function loadVideoEmbed(block, link, autoplay, background) {
  if (block.dataset.embedLoaded === 'true') return;

  const url = new URL(link);
  let embed;

  if (link.includes('youtube') || link.includes('youtu.be')) {
    embed = embedYoutube(url, autoplay, background);
  } else if (link.includes('vimeo')) {
    embed = embedVimeo(url, autoplay, background);
  }

  block.append(embed);
  block.dataset.embedLoaded = true;
}

export default function decorate(block) {
  const placeholder = block.querySelector('picture');
  const linkEl = block.querySelector('a');
  if (!linkEl) return;

  const link = linkEl.href;
  const autoplay = block.classList.contains('autoplay');
  const background = block.classList.contains('background');

  block.textContent = '';
  block.dataset.embedLoaded = false;

  if (placeholder) {
    block.classList.add('placeholder');

    const wrapper = document.createElement('div');
    wrapper.className = 'video-placeholder';
    wrapper.append(placeholder);

    if (!autoplay) {
      wrapper.insertAdjacentHTML(
        'beforeend',
        '<div class="video-placeholder-play"><button type="button" title="Play"></button></div>',
      );
      wrapper.addEventListener('click', () => {
        wrapper.remove();
        loadVideoEmbed(block, link, true, background);
      });
    }

    block.append(wrapper);
  }

  if (!placeholder || autoplay) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        const playOnLoad = autoplay && !prefersReducedMotion.matches;
        loadVideoEmbed(block, link, playOnLoad, background);
      }
    });
    observer.observe(block);
  }
}
