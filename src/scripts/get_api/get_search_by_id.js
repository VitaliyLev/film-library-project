import axios from 'axios';
import { refs } from '../refs';
import storageApi from '../storageAPI';

const URL = 'https://api.themoviedb.org/3/';
const MY_MOVIE_KEY = '388e7c1d810433186d944819803a330c';
const END_POINT_SEARCH_ID = 'movie/';

export default class ApiImagesSearchByIdRequest {
  constructor() {
    this.url = URL;
    this.key = MY_MOVIE_KEY;
    this.id = null;
  }

  get idValue() {
    return this.id;
  }

  set idValue(value) {
    return (this.id = value);
  }

  getOptionsMain() {
    const options = new URLSearchParams({
      api_key: `${this.key}`,
      language: 'en-US',
    });
    return options;
  }

  async getImagesTrendGallery() {
    const option = this.getOptionsMain();
    const response = await axios.get(
      `${URL}${END_POINT_SEARCH_ID}${this.id}?${option}`
    );

    return response.data;
  }
}

const responseByIdApiImg = new ApiImagesSearchByIdRequest();

function renderByIdGallery() {
  responseByIdApiImg
    .getImagesTrendGallery()
    .then(data => renderModalMarkup(data))
    .catch(err => err.message);
}

const LOCAL_STORAGE_WATCH_KEY = 'watch';
const LOCAL_STORAGE_QUEUE_KEY = 'queue';
let searchId;

function handleClickOnImgCard(e) {
  e.preventDefault();

  const handClick = e.target.nodeName;
  if (handClick !== 'IMG') {
    return;
  }

  responseByIdApiImg.idValue = e.target.dataset.imgId;
  searchId = e.target.dataset.imgId;

  refs.wraperModalEl.classList.remove('modal-hidden');
  refs.modalEl.classList.remove('modal-hidden');

  refs.imageWrapperEl.innerHTML = '';
  refs.filmDetailsWrapperEl.innerHTML = '';
  renderByIdGallery();

  function handleWatchClick() {
    updateLocalStorageList(LOCAL_STORAGE_WATCH_KEY);
  }

  function handleQueueClick() {
    updateLocalStorageList(LOCAL_STORAGE_QUEUE_KEY);
  }

  refs.btnModalWatchedEl.addEventListener('click', handleWatchClick);
  refs.btnModalQueueEl.addEventListener('click', handleQueueClick);
}

refs.galleryEl.addEventListener('click', handleClickOnImgCard);

function renderModalMarkup(data) {
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

  const genr = genres.map(genr => genr.name);

  const markupImg = `
      <img class="film-details__image js-image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="#" />
      `;
  const markDetails = `
  <h2 class="film-details__title js-title">${title}</h2>
  <ul class="film-details__list list">
    <li class="film-details__item">
      <p class="film-details__text lang-rating">Vote / Votes</p>
      <span class="film-details__span film-details__span--accent js-vote"
        >${vote_average.toFixed(1)}</span
      >
      <span>/</span>
      <span
        class="film-details__span film-details__span--noaccent js-vote-count"
        >${vote_count}</span
      >
    </li>
    <li class="film-details__item">
      <p class="film-details__text lang-popularity">Popularity</p>
      <span class="film-details__span js-popularity">${popularity.toFixed(1)}
      </span>
    </li>
    <li class="film-details__item">
      <p class="film-details__text lang-original">Original Title</p>
      <span class="film-details__span js-title-orig"
        >${original_title}</span
      >
    </li>
    <li class="film-details__item">
      <p class="film-details__text lang-genre">Genre</p>
      <span class="film-details__span js-genres">${genr}</span>
    </li>
  </ul>
  <p class="film-details__about lang-about">About</p>
  <p class="film-details__overview js-about">
    ${overview}
  </p>
  <div class="wrap-lyb-nav">
          <button class="js-watched-btn header__lyb-nav-btn js-addWatched-btn" data-action="watched" data-id="${id}">
            Add to watched
          </button>
          <button class="js-queue-btn header__lyb-nav-btn js-addQueue-btn" data-action="queue" data-id="${id}">
            Add to queue
          </button>
        </div>`;

  refs.imageWrapperEl.insertAdjacentHTML('beforeend', markupImg);
  refs.filmDetailsWrapperEl.insertAdjacentHTML('beforeend', markDetails);
  // btnAddWatch = document.querySelector('.js-addWatched-btn');
  // btnAddQueue = document.querySelector('.js-addQueue-btn');
  // btnAddWatch.addEventListener('click', addToLyb);
  // btnAddQueue.addEventListener('click', addToLyb);
  // function addToLyb(e) {
  //   const id = +e.target.dataset.id;
  //   const action = e.target.dataset.action;
  //   const lyb = storageApi.load(action) || [];
  //   let isInLyb;
  //   if (lyb.length) {
  //     isInLyb = lyb.find(movie => movie.id === id);
  //   }
  //   if (isInLyb) return;
  //   lyb.push(data);
  //   storageApi.save(action, lyb);
  // }
}

function updateLocalStorageList(key) {
  const id = searchId;
  const loadAddedList = localStorage.getItem(key);
  const parsedIdList = new Set(JSON.parse(loadAddedList));

  if (!loadAddedList) {
    const watchSetting = [id];
    localStorage.setItem(key, JSON.stringify(watchSetting));
  }

  if (loadAddedList) {
    parsedIdList.add(searchId);
    localStorage.setItem(key, JSON.stringify([...parsedIdList]));
  }

  // метод delete (видаляє унікальн елем)
}
