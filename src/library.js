import storageAPI from './scripts/storageAPI';
import { refs } from './scripts/refs';
import axios from 'axios';

const btnWatched = document.querySelector('.js-watched-btn');
const btnQueue = document.querySelector('.js-queue-btn');

const LOCAL_STORAGE_WATCH_KEY = 'watch';
const LOCAL_STORAGE_QUEUE_KEY = 'queue';

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

let array = [];

function renderByIdGallery(id) {
  getImagesTrendGallery(id)
    // .then(data => console.log(data))
    .then(data => {
      array = data;
      // renderHtmlMurkup(data)
    })
    .catch(err => err.message);
}

function handleWatchedBtnClick() {
  btnQueue.classList.remove('btn-active');
  btnWatched.classList.add('btn-active');
  const watched = storageAPI.load(LOCAL_STORAGE_WATCH_KEY) || [];
}

function handleQueueBtnClick() {
  btnQueue.classList.add('btn-active');
  btnWatched.classList.remove('btn-active');
  const queue = storageAPI.load(LOCAL_STORAGE_QUEUE_KEY) || [];
  getApiRequestById(queue);
  console.log(array);
}

btnWatched.addEventListener('click', handleWatchedBtnClick);
btnQueue.addEventListener('click', handleQueueBtnClick);

function getApiRequestById(array) {
  const queue = storageAPI.load(LOCAL_STORAGE_QUEUE_KEY) || [];

  // getImagesTrendGallery(505642);
  // renderByIdGallery(505642);

  for (let i = 0; i < array.length; i += 1) {
    renderByIdGallery(array[i]);
  }
}
function renderHtmlMurkup(data) {
  const {
    id,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
    poster_path,
  } = data;
  const mark = `<li class="gallery__item">
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
  </li>`;
  // const markup = data
  //   .map(
  //     ({ adult, id, title, backdrop_path, poster_path }) =>
  //       `<li class="gallery__item">
  //       <img
  //         class="gallery__item--img"
  //         src="https://image.tmdb.org/t/p/w500${poster_path}"
  //         alt=""
  //         loading="lazy"
  //         height=""
  //         data-img-id="${id}"
  //       />
  //       <ul>
  //           <li><b>${title}</b></li>
  //           <li>gerned | year</li>
  //       </ul>
  //   </li>`
  //   )
  //   .join('');
  refs.galleryLibraryListEl.innerHTML = '';
  refs.galleryLibraryListEl.insertAdjacentHTML('beforeend', mark);
  // refs.galleryLibraryListEl.insertAdjacentHTML('beforeend', markup);
}


