const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
window.matchMedia('(min-width: 681px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = String(new Date().getFullYear());

const themeButton = document.querySelector('.theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let chosenTheme = null;
try { chosenTheme = localStorage.getItem('amaltek-theme'); } catch {}
function updateTheme(theme) {
 document.documentElement.dataset.theme = theme;
 const dark = theme === 'dark';
 themeButton.setAttribute('aria-pressed', String(dark));
 themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
 themeButton.querySelector('.theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
}
updateTheme(document.documentElement.dataset.theme || (systemTheme.matches ? 'dark' : 'light'));
themeButton.addEventListener('click', () => {
 chosenTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
 updateTheme(chosenTheme);
 try { localStorage.setItem('amaltek-theme', chosenTheme); } catch {}
});
systemTheme.addEventListener('change', event => { if (chosenTheme !== 'light' && chosenTheme !== 'dark') updateTheme(event.matches ? 'dark' : 'light'); });
