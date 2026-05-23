const hero = document.querySelector('.hero-container');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    hero.classList.add('shrink');
  } else if (window.scrollY < 5) {
    hero.classList.remove('shrink'); // only unshrink when nearly at top
  }
}, { passive: true });