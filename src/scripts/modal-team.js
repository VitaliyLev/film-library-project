const modal = document.querySelector('.team-modal');
const btnClose = document.querySelector('.tm-close-btn');
const btnOpen = document.querySelector('.footer-link');

btnOpen.onclick = function () {
  modal.style.display = 'flex';
};

btnClose.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
