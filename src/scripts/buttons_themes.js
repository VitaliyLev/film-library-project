import { refs } from './refs';

let light = true;

refs.ligthBtn.addEventListener('click', setLightTheme);
refs.darkBtn.addEventListener('click', setDarkTheme);

export function setDarkTheme() {
  localStorage.setItem('theme', 'dark');
  if (!light) return;
  light = false;
  refs.screen.classList.remove('light_theme');
  refs.screen.classList.add('dark_theme');
}

export function setLightTheme() {
  localStorage.setItem('theme', 'light');
  if (light) return;
  light = true;
  refs.screen.classList.remove('dark_theme');
  refs.screen.classList.add('light_theme');
}

if (localStorage.getItem('theme') === 'dark') setDarkTheme();
