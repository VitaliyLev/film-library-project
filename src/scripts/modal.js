import { refs } from './refs';

refs.closeBtnModalEl.addEventListener('click', function () {
  refs.wraperModalEl.classList.add('modal-hidden');
  refs.modalEl.classList.add('modal-hidden');
});

function clearEventListeners() {
    window.removeEventListener('click', closeModalByClick);
    window.removeEventListener('keydown', closeModalByEsc);   
    refs.closeBtnModalEl.removeEventListener('click', closeModal);

    console.log('hello');
  }


 function closeModalByEsc(e) {
    if (e.key === 'Escape') {
     refs.modalEl.classList.add('modal-hidden');
      clearEventListeners();
    }
  }

  function closeModalByClick(e) {
    if (e.target === refs.modalEl) {
     refs.modalEl.classList.add('modal-hidden');
      clearEventListeners();
    }
  }

