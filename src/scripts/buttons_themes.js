import { refs } from './refs';


let light = true;

refs.ligthBtn.addEventListener('click', setLightTheme);
refs.darkBtn.addEventListener('click', setDarkTheme);

function setDarkTheme(){
    if (!light) return;
    light = false;
    refs.screen.classList.remove('light_theme');
    refs.screen.classList.add('dark_theme');
           }

function setLightTheme(){
    if (light) return;
    light = true;
    refs.screen.classList.remove('dark_theme');
    refs.screen.classList.add('light_theme');
    
}