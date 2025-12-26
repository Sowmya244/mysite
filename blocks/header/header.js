/**
 * Soft Loops Header - Dynamic injection and scroll behavior
 * Creates a fixed header with Gucci-style scroll animations
 */
export default function initSoftLoopsHeader() {
  // Create header element
  const header = document.createElement('header');
  header.className = 'sl-header is-hero';

  // Inject header markup dynamically
  header.innerHTML = `
    <div class="sl-header-inner">
      <div class="sl-header-left">
        <button class="sl-btn-contact" aria-label="Contact Us">Contact Us</button>
      </div>

      <div class="sl-header-logo">
        <a href="/" aria-label="Soft Loops Home">Soft Loops</a>
      </div>

      <div class="sl-header-right">
        <button class="sl-btn-cart" aria-label="Shopping Cart">Cart</button>
        <button class="sl-btn-account" aria-label="Account">Account</button>
        <button class="sl-btn-search" aria-label="Search">Search</button>
        <button class="sl-btn-menu" aria-label="Navigation Menu">Menu</button>
      </div>
    </div>
  `;

  // Prepend header to body at the very top
  document.body.prepend(header);

  // Initialize scroll event listener for state transitions
  const handleScroll = () => {
    const scrollThreshold = 60; // pixels scrolled to trigger transition

    if (window.scrollY > scrollThreshold) {
      // Remove hero state, add scrolled state
      header.classList.remove('is-hero');
      header.classList.add('is-scrolled');
    } else {
      // Return to hero state when scrolled back to top
      header.classList.add('is-hero');
      header.classList.remove('is-scrolled');
    }
  };

  // Add scroll listener with passive flag for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });
}
