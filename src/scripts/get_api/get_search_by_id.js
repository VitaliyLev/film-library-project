import axios from 'axios';
import { refs } from '../refs';

const URL = 'https://api.themoviedb.org/3/';
const MY_MOVIE_KEY = '388e7c1d810433186d944819803a330c';
const END_POINT_SEARCH_ID = 'movie/';

class ApiImagesSearchByIdRequest {
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

// let modal = document.querySelector('.modal');
// let wraperModall = document.querySelector('.modal-wrapper');
// let filmDetailsEl = document.querySelector('.film-details');
const responseByIdApiImg = new ApiImagesSearchByIdRequest();

function renderByIdGallery() {
  responseByIdApiImg
    .getImagesTrendGallery()
    // .then(data => console.log(data))
    .then(data => renderModalMarkup(data))

    .catch(err => err.message);
}

function handleClickOnImgCard(e) {
  e.preventDefault();

  const handClick = e.target.nodeName;
  if (handClick !== 'IMG') {
    return;
  }

  responseByIdApiImg.idValue = e.target.dataset.imgId;

  refs.wraperModalEl.classList.remove('modal-hidden');
  refs.modalEl.classList.remove('modal-hidden');

  //
  refs.filmDetailsEl.innerHTML = '';
  renderByIdGallery();
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

  const markup = `
      <img class="film-details__image js-image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="#" />
    </div>
    <div class="film-details__wrapper">
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
          <span class="film-details__span js-popularity">${popularity.toFixed(
            1
          )}
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
      <ul class="film-details-btn__list js-detail-btn">
        <li class="film-details-btn__item">
          <button
            class="film-details-btn lang-addwatched js-btn-modal-watched"
            type="button"
          >
            add to Watched
          </button>
        </li>
        <li class="film-details-btn__item">
          <button
            class="film-details-btn lang-addqueue js-btn-modal-queue"
            type="button"
          >
            add to queue
          </button>
        </li>
      </ul>
    </div>`;

  refs.filmDetailsEl.insertAdjacentHTML('beforeend', markup);
}
