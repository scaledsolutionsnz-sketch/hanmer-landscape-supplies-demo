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
  const setIcon = (open) => { toggle.innerHTML = open ? '&times;' : '&#9776;'; toggle.setAttribute('aria-expanded', open ? 'true' : 'false'); };
  toggle.addEventListener('click', () => setIcon(links.classList.toggle('open')));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { links.classList.remove('open'); setIcon(false); }));
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

// Email buttons -> Gmail compose (works without a desktop mail app)
document.querySelectorAll("a[data-gmail]").forEach(function (a) {
  var to = a.getAttribute("data-user") + "@" + a.getAttribute("data-domain");
  var su = a.getAttribute("data-su") || "";
  var body = a.getAttribute("data-body") || "";
  a.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(to) + "&su=" + su + "&body=" + body;
  a.target = "_blank"; a.rel = "noopener";
});
