(function(){
// Year
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// Theme: system preference + saved
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme');
const initialTheme = saved || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', initialTheme);

const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
themeBtn.addEventListener('click', () => {
const cur = document.documentElement.getAttribute('data-theme');
const next = cur === 'light' ? 'dark' : 'light';
document.documentElement.setAttribute('data-theme', next);
localStorage.setItem('theme', next);
themeBtn.textContent = next === 'light' ? '☀' : '☾';
});
themeBtn.textContent = initialTheme === 'light' ? '☀' : '☾';
}

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
menuBtn.addEventListener('click', () => {
const open = navLinks.classList.toggle('open');
menuBtn.setAttribute('aria-expanded', String(open));
menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navLinks.addEventListener('click', (e) => {
if (e.target.tagName === 'A' && navLinks.classList.contains('open')) {
navLinks.classList.remove('open');
menuBtn.setAttribute('aria-expanded', 'false');
}
});
}

// Active nav on scroll
const ids = ['summary','certs','experience','skills','education','projects','contact'];
const sections = ids.map(id=>document.getElementById(id)).filter(Boolean);
const links = Array.from(document.querySelectorAll('header nav a'));
const setActive=(id)=>{
links.forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+id));
};
const onScroll=()=>{
let current='summary';
const fromTop=window.scrollY+100;
sections.forEach(s=>{
if(s.offsetTop <= fromTop) current=s.id;
});
setActive(current);
};
window.addEventListener('scroll', onScroll);
onScroll();

// Reveal on scroll
const observer = ('IntersectionObserver' in window) ? new IntersectionObserver((entries)=>{
for (const entry of entries){
if (entry.isIntersecting) {
entry.target.classList.add('visible');
observer.unobserve(entry.target);
}
}
},{threshold:0.12}) : null;

if (observer) {
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
} else {
document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}

// Live badge time-based
const liveBadge = document.querySelector('.live-badge');
if (liveBadge){
const h = new Date().getHours();
const status = (h >= 9 && h <= 18) ? 'Typically online now' : 'Replies within 24h';
liveBadge.innerHTML = `<span class="pulse"></span> Open to opportunities · ${status}`;
}
})();