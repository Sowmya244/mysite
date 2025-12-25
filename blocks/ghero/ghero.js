export default function ghero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const image = hero.querySelector('img');
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  // Intersection Observer
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        hero.classList.add('is-visible');
        observer.disconnect();
      }
    },
    { threshold: 0.3 },
  );

  observer.observe(hero);

  // Parallax
  if (!prefersReducedMotion && image) {
    window.addEventListener('scroll', () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(
        Math.max(-rect.top / rect.height, 0),
        1,
      );

      image.style.transform = `scale(1) translateY(${progress * 40}px)`;
    });
  }
}
