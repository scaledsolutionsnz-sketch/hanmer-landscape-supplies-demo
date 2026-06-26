// Hanmer Landscape Supplies — shared interactions

// Intro overlay
window.addEventListener('load', () => {
  setTimeout(() => document.body.classList.add('loaded'), 1300);
});

// Nav scroll state + mobile toggle
const nav = document.querySelector('header.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.navlinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// Hero rolling images
const slides = document.querySelectorAll('.hero-slides .slide');
if (slides.length > 1) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 6000);
  }
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Review star picker (review.html)
const starpick = document.querySelector('.starpick');
if (starpick) {
  const buttons = [...starpick.querySelectorAll('button')];
  const GOOGLE_URL = 'https://g.page/r/PLACEHOLDER/review';
  buttons.forEach(btn => {
    const val = +btn.dataset.val;
    btn.addEventListener('mouseenter', () => buttons.forEach(b => b.classList.toggle('lit', +b.dataset.val <= val)));
    btn.addEventListener('click', () => {
      if (val >= 4) window.location.href = GOOGLE_URL;
      else window.location.href = 'private.html?rating=' + val;
    });
  });
  starpick.addEventListener('mouseleave', () => buttons.forEach(b => b.classList.remove('lit')));
}

// Private feedback: pre-fill rating from URL
const params = new URLSearchParams(window.location.search);
const ratingField = document.getElementById('rating');
if (ratingField && params.get('rating')) {
  ratingField.value = params.get('rating') + ' star' + (params.get('rating') === '1' ? '' : 's');
}
