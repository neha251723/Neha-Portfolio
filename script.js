const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('neha-theme');
if (savedTheme) root.dataset.theme = savedTheme;
function updateThemeButton() {
  const light = root.dataset.theme === 'light';
  themeIcon.textContent = light ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
  document.querySelector('meta[name="theme-color"]').content = light ? '#f2f2e9' : '#0b0d0d';
}
updateThemeButton();
themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('neha-theme', root.dataset.theme);
  updateThemeButton();
});
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, {passive:true});
