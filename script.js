// Dropdown Navigation & Mobile Menu Logic
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu elements
  const openMenuBtn = document.querySelector('.open-menu');
  const closeMenuBtn = document.querySelector('.close-menu');
  const navMenu = document.querySelector('.nav-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  // Dropdown elements
  const dropdowns = document.querySelectorAll('.dropdown');

  // Helper function to toggle mobile menu
  function openMobileMenu() {
    navMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openMenuBtn) {
    openMenuBtn.addEventListener('click', openMobileMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMobileMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMobileMenu);
  }

  // Dropdown toggle logic: open ONLY on click (never on hover)
  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector('.dropdown-btn');
    const dropdownList = dropdown.querySelector('.dropdown-list');

    if (!btn || !dropdownList) return;

    dropdown.addEventListener('click', (e) => {
      // If clicking inside the dropdown list links, do not toggle the dropdown menu
      if (dropdownList.contains(e.target)) return;

      e.stopPropagation();
      const isCurrentlyActive = dropdown.classList.contains('link-open');

      // Close all other dropdowns
      dropdowns.forEach((other) => {
        if (other !== dropdown) {
          other.classList.remove('active', 'link-open');
          const otherBtn = other.querySelector('.dropdown-btn');
          if (otherBtn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            const arrow = otherBtn.querySelector('.arrow-icon');
            if (arrow) arrow.src = './assets/images/icon-arrow-down.svg';
          }
        }
      });

      // Toggle current dropdown
      if (isCurrentlyActive) {
        dropdown.classList.remove('active', 'link-open');
        btn.setAttribute('aria-expanded', 'false');
        const arrow = btn.querySelector('.arrow-icon');
        if (arrow) arrow.src = './assets/images/icon-arrow-down.svg';
      } else {
        dropdown.classList.add('active', 'link-open');
        btn.setAttribute('aria-expanded', 'true');
        const arrow = btn.querySelector('.arrow-icon');
        if (arrow) arrow.src = './assets/images/icon-arrow-up.svg';
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active', 'link-open');
        const btn = dropdown.querySelector('.dropdown-btn');
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
          const arrow = btn.querySelector('.arrow-icon');
          if (arrow) arrow.src = './assets/images/icon-arrow-down.svg';
        }
      }
    });
  });

  // Keyboard accessibility (Esc to close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove('active', 'link-open');
        const btn = dropdown.querySelector('.dropdown-btn');
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
          const arrow = btn.querySelector('.arrow-icon');
          if (arrow) arrow.src = './assets/images/icon-arrow-down.svg';
        }
      });
      closeMobileMenu();
    }
  });
});
