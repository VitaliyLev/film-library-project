import './scripts/modal';
import storageAPI from './scripts/storageAPI';
import { refs } from './scripts/refs';
import axios from 'axios';
import renderModalMarkup from './scripts/get_api/get_search_by_id';

const btnWatched = document.querySelector('.js-watched-btn');
const btnQueue = document.querySelector('.js-queue-btn');

const LOCAL_STORAGE_WATCH_KEY = 'watch';
const LOCAL_STORAGE_QUEUE_KEY = 'queue';
// let searchId;

const URL = 'https://api.themoviedb.org/3/';
const MY_MOVIE_KEY = '388e7c1d810433186d944819803a330c';
const END_POINT_SEARCH_ID = 'movie/';

const options = new URLSearchParams({
  api_key: MY_MOVIE_KEY,
  language: 'en-US',
});

async function getImagesTrendGallery(id) {
  const response = await axios.get(
    `${URL}${END_POINT_SEARCH_ID}${id}?${options}`
  );
  return response.data;
}

async function renderByIdGallery(array) {
  const promises = await array.map(elem => getImagesTrendGallery(elem));
  const result = await Promise.all(promises);
  renderHtmlMurkup(result);
}

function handleWatchedBtnClick() {
  const watched = storageAPI.load(LOCAL_STORAGE_WATCH_KEY) || [];
  renderByIdGallery(watched);
  btnQueue.classList.remove('btn-active');
  btnWatched.classList.add('btn-active');
}

function handleQueueBtnClick() {
  // if(btnQueue.classList.contains('btn-active')) {
  //   return
  // }

  btnQueue.classList.add('btn-active');
  btnWatched.classList.remove('btn-active');
  const queue = storageAPI.load(LOCAL_STORAGE_QUEUE_KEY) || [];
  renderByIdGallery(queue);
}

btnWatched.addEventListener('click', handleWatchedBtnClick);
btnQueue.addEventListener('click', handleQueueBtnClick);

function renderHtmlMurkup(data) {
  const markup = data
    .map(
      ({
        adult,
        id,
        title,
        backdrop_path,
        genres,
        poster_path,
        release_date,
      }) => {
        const genr = genres.map(genr => genr.name);
        const resultMarkup = `<li class="gallery__item">
        <img
          class="gallery__item--img"
          src="https://image.tmdb.org/t/p/w500${poster_path}"
          alt=""
          loading="lazy"
          height=""
          data-img-id="${id}"
        />
        <div class="gallery__item--list">
            <div class="gallery__item--title"><b>${title}</b></div>
            <div class="gallery__item--description">
            <div class="gallery__item--data gallery__item-genre">${genr}  |</div>
            <div class="gallery__item--data">${parseInt(release_date)}</div>
            </div
        </div>
    </li>`;
        return resultMarkup;
      }
    )
    .join('');
  refs.galleryLibraryListEl.innerHTML = '';
  refs.galleryLibraryListEl.insertAdjacentHTML('beforeend', markup);
}
