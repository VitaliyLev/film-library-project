import { refs } from './refs';
window.addEventListener('scroll', HideElementOnScroll);
refs.upArrow.addEventListener('click', ScrollToTop);

function HideElementOnScroll() {
  if (window.scrollY > 800) {
    refs.upArrow.classList.remove('is-hidden-btn');
  } else {
    refs.upArrow.classList.add('is-hidden-btn');
  }
}

function ScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
