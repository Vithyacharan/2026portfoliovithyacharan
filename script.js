/* ════════ CUSTOM CURSOR ════════ */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

/* ════════ NAVBAR SCROLL ════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ════════ MOBILE MENU ════════ */
const sidemenu = document.getElementById('sidemenu');
function openmenu()  { sidemenu.classList.add('open'); }
function closemenu() { sidemenu.classList.remove('open'); }

/* ════════ TABS ════════ */
const tablinks   = document.querySelectorAll('.tab-link');
const tabcontents = document.querySelectorAll('.tab-contents');

function opentab(tabname, event) {
  tablinks.forEach(t => t.classList.remove('active-link'));
  tabcontents.forEach(c => c.classList.remove('active-tab'));
  event.currentTarget.classList.add('active-link');
  document.getElementById(tabname).classList.add('active-tab');
}

/* ════════ SCROLL REVEAL ════════ */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

/* ════════ CONTACT FORM ════════ */
const scriptURL = 'https://script.google.com/macros/s/AKfycbwnFQxI3ej81KGFpH3CMlIkZTUFw-pxOme7ZpUR10W0WADNaIknx4LHMiyPzts5T3eLoA/exec';
const form = document.forms['submit-to-google-sheet'];
const msg  = document.getElementById('msg');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(() => {
        msg.textContent = 'Message sent successfully 💡';
        form.reset();
        setTimeout(() => msg.textContent = '', 5000);
      })
      .catch(err => console.error('Error!', err.message));
  });
}
