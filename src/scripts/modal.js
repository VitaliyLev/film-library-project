import { refs } from './refs';

refs.closeBtnModalEl.addEventListener('click', function () {
  refs.wraperModalEl.classList.add('modal-hidden');
  refs.modalEl.classList.add('modal-hidden');
});

window.onclick = function (event) {
  if (event.target === refs.modalEl) {
    refs.wraperModalEl.classList.add('modal-hidden');
    refs.modalEl.classList.add('modal-hidden');
  }
};
