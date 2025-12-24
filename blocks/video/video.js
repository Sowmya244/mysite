/*
 * Video Block – Enhanced (Controls + Accessibility)
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
    <div class="video-embed">
      <iframe
        src="https://www.youtube.com/embed/${vid}?${params.toString()}"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy"
        title="YouTube video player">
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
    <div class="video-embed">
      <iframe
        src="https://player.vimeo.com/video/${video}?${params.toString()}"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy"
        title="Vimeo video player">
      </iframe>
    </div>
  `;
  return wrapper.firstElementChild;
}

function getHTML5Video(src, autoplay, background) {
  const video = document.createElement('video');
  video.src = src;
  video.controls = true;
  video.playsInline = true;

  if (autoplay && !prefersReducedMotion.matches) {
    video.autoplay = true;
  }

  if (background) {
    video.muted = true;
    video.loop = true;
  }

  return video;
}

function loadVideo(block, link, autoplay, background) {
  if (block.dataset.embedLoaded === 'true') return;

  const url = new URL(link);
  let embed;

  if (link.includes('youtube') || link.includes('youtu.be')) {
    embed = embedYoutube(url, autoplay, background);
  } else if (link.includes('vimeo')) {
    embed = embedVimeo(url, autoplay, background);
  } else {
    embed = getHTML5Video(link, autoplay, background);
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
    const wrapper = document.createElement('div');
    wrapper.className = 'video-placeholder';
    wrapper.append(placeholder);

    const play = document.createElement('button');
    play.className = 'video-play-button';
    play.setAttribute('aria-label', 'Play video');
    wrapper.append(play);

    play.addEventListener('click', () => {
      wrapper.remove();
      loadVideo(block, link, true, background);
    });

    block.append(wrapper);
  }

  if (!placeholder || autoplay) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        loadVideo(block, link, autoplay, background);
      }
    });
    observer.observe(block);
  }
}
