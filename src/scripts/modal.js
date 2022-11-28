import { refs } from './refs';

refs.closeBtnModalEl.addEventListener('click', function () {
  //  modal.style.display = 'none';

  refs.wraperModalEl.classList.add('modal-hidden');
  refs.modalEl.classList.add('modal-hidden');
});

// function handleKeyPress(e) {
//   console.log(e.key);
//   if (e.key === 'Escape') {
//     closeModal();
//   }
// }

// function handleClickOnBackdrop(e) {
//   if (e.target === modal) {
//     closeModal();
//   }
// }