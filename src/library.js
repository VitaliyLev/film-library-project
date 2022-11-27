import storageAPI from './scripts/storageAPI';
import { refs } from './scripts/refs';

const btnWatched = document.querySelector('.js-watched-btn');
const btnQueue = document.querySelector('.js-queue-btn');

function handleWatchedBtnClick() {
  btnQueue.classList.remove('btn-active');
  btnWatched.classList.add('btn-active');
  const watched = storageAPI.load('watched') || [];
  renderHtmlMurkup(watched);
}

function renderHtmlMurkup(data) {
  const markup = data
    .map(
      ({ adult, id, title, backdrop_path, poster_path }) =>
        `<li class="gallery__item">
        <img
          class="gallery__item--img"
          src="https://image.tmdb.org/t/p/w500${poster_path}"
          alt=""
          loading="lazy"
          height=""
          data-img-id="${id}"
        />
        <ul>
            <li><b>${title}</b></li>
            <li>gerned | year</li>
        </ul>
    </li>`
    )
    .join('');
  refs.galleryEl.innerHTML = '';
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

function handleQueueBtnClick() {
  btnQueue.classList.add('btn-active');
  btnWatched.classList.remove('btn-active');
  const queue = storageAPI.load('queue') || [];
  renderHtmlMurkup(queue);
}

btnWatched.addEventListener('click', handleWatchedBtnClick);
btnQueue.addEventListener('click', handleQueueBtnClick);
handleWatchedBtnClick();
