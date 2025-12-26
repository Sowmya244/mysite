/* =============================
   Soft Loops Header
   ============================= */

(function softLoopsHeader() {
  const html = `
    <header class="sl-header is-hero">
      <div class="sl-header-inner">
        <div class="sl-header-left">
          <button class="sl-btn-contact">Contact Us</button>
        </div>

        <div class="sl-header-logo">
          <a href="/">Soft Loops</a>
        </div>

        <div class="sl-header-right">
          <button aria-label="Cart">👜</button>
          <button aria-label="Account">👤</button>
          <button aria-label="Search">🔍</button>
          <button aria-label="Menu">☰</button>
        </div>
      </div>
    </header>
  `;

  document.body.insertAdjacentHTML('afterbegin', html);

  const header = document.querySelector('.sl-header');

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 60) {
        header.classList.add('is-scrolled');
        header.classList.remove('is-hero');
      } else {
        header.classList.add('is-hero');
        header.classList.remove('is-scrolled');
      }
    },
    { passive: true },
  );
}());
