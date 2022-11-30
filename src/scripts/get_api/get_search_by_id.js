import axios from 'axios';
import { refs } from '../refs';
import storageApi from '../storageAPI';
import { Notify } from 'notiflix';

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

  overviewLocalStorageOnIdContains();

  function handleWatchClick() {
    updateLocalStorageList(LOCAL_STORAGE_WATCH_KEY);

    overviewLocalStorageOnIdContains();
    // if(refs.btnModalWatchedEl.classList.contains('active-btn-watch')){
    //   Notify.failure(
    //     'The movie has been removed from the library.'
    //     );
    // }else {
    //     Notify.success('The movie has been added to the library.');
    // }
  }

  function handleQueueClick() {
    updateLocalStorageList(LOCAL_STORAGE_QUEUE_KEY);

    overviewLocalStorageOnIdContains();
    // if(refs.btnModalQueueEl.classList.contains('active-btn-queue')){
    //   Notify.failure(
    //     'The movie has been removed from the queue.'
    //     );
    // }else {
    //     Notify.success('The movie has been added to the queue.');
    // }
  }

  refs.btnModalWatchedEl.addEventListener('click', handleWatchClick);
  refs.btnModalQueueEl.addEventListener('click', handleQueueClick);
}

refs.galleryEl.addEventListener('click', handleClickOnImgCard);

export default function renderModalMarkup(data) {
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
  </p>`;

  refs.imageWrapperEl.innerHTML = '';
  refs.filmDetailsWrapperEl.innerHTML = '';
  refs.imageWrapperEl.insertAdjacentHTML('beforeend', markupImg);
  refs.filmDetailsWrapperEl.insertAdjacentHTML('beforeend', markDetails);
}

function updateLocalStorageList(key) {
  const id = searchId;
  const loadAddedList = localStorage.getItem(key);
  const parsedIdList = new Set (JSON.parse(loadAddedList));

  if (!loadAddedList) {
    const watchSetting = [id];
    localStorage.setItem(key, JSON.stringify(watchSetting));
  }

  if (loadAddedList) {
    if(!parsedIdList.has(id))
      parsedIdList.add(searchId)
    else 
      parsedIdList.delete(searchId) 
    localStorage.setItem(key, JSON.stringify([...parsedIdList]));
  }
}

  function overviewLocalStorageOnIdContains () {
    const keyW = LOCAL_STORAGE_WATCH_KEY;
    const keyQ = LOCAL_STORAGE_QUEUE_KEY;
    const id = searchId;

    const loadAddedListW = localStorage.getItem(keyW) || '[]';
    const parsedIdListW = new Set (JSON.parse(loadAddedListW));
  
    const loadAddedListQ = localStorage.getItem(keyQ) || '[]';
    const parsedIdListQ = new Set (JSON.parse(loadAddedListQ));
  
    if(parsedIdListW.has(id)) {
      refs.btnModalWatchedEl.textContent = 'remove from watch';
      // refs.btnModalWatchedEl.classList.remove('active-btn-watch');
    }else{
      refs.btnModalWatchedEl.textContent = 'add to watch';
      // refs.btnModalWatchedEl.classList.add('active-btn-watch');
    }
  
    if(parsedIdListQ.has(id)) {
      refs.btnModalQueueEl.textContent = 'remove from queue';
      // refs.btnModalQueueEl.classList.remove('active-btn-queue');
  
    }else {
      refs.btnModalQueueEl.textContent = 'add to queue';
      // refs.btnModalQueueEl.classList.add('active-btn-queue');
    }
  }