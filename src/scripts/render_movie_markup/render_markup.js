import { refs } from '../refs';
import errorImg from '../../images/errorimg.jpg'

//не працюють жанри потрібно переписати (на головній сторінці знизу опис)
// import { defineGenre } from '../render_movie_card/render_search_movie_gallery.js';
//функція для рендеру жанрів в картки
// export function defineGenre(genresIds) {
//   const genresList = storageAPI.load('genres');
//   const genresNames = genresIds.map(item => {
//     return genresList.find(element => item == element.id).name;
//   });
//   return genresNames.join(', ');
// }

//рендер базової розмітки на карточки фільмів gallery (ніде не підключена так як не працюють жанри)
export function renderBaseCardMarkupMovie({ results }) {
  const markup = results
    .map(
      ({
        adult,
        id,
        title,
        backdrop_path,
        genre_ids,
        poster_path,
        release_date,
      }) => {
        let baseImgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
        if (!poster_path) {
          baseImgUrl = errorImg;
        }
        const genreName = defineGenre(genre_ids);
        const resultMarkup = `<li class="gallery__item">
            <img
              class="gallery__item--img"
              src="${baseImgUrl}"
              alt="${title}"
              loading="lazy"
              height=""
              data-img-id="${id}"
            />
            <div class="gallery__item--data">${parseInt(release_date)}</div>
  
            <div class="gallery__item--list">
                <div class="gallery__item--title"><b>${title}</b></div>
                <div class="gallery__item-genre">${genreName}</div>
                </div  
        </li>`;
        return resultMarkup;
      }
    )
    .join('');
  refs.galleryEl.innerHTML = '';
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

//рендер розмітки на модалку всередині базова інформація
export function renderModalMovieInfo(data) {
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
  let baseImgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  if (!poster_path) {
    baseImgUrl = errorImg;
  }

  const genr = genres.map(genr => genr.name);

  const markupImg = `
      <img class="film-details__image js-image" src="${baseImgUrl}" alt="${title}" />
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

//рендер розмітки на сторінці MY LIBRARY фільмів головних
export function renderByIdMovieInLibrary(data) {
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
        let baseImgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
        if (!poster_path) {
          baseImgUrl = errorImg;
        }
        const genr = genres.map(genr => genr.name).join(', ');
        const resultMarkup = `<li class="gallery__item">
        <img
          class="gallery__item--img"
          src="${baseImgUrl}"
          alt="${title}"
          loading="lazy"
          height=""
          data-img-id="${id}"
        />
        <div class="gallery__item--data">${parseInt(release_date)}</div>
        <div class="gallery__item--list">
            <div class="gallery__item--title"><b>${title}</b></div>
            <div class="gallery__item-genre">${genr}</div>
            </div>
    </li>`;
        return resultMarkup;
      }
    )
    .join('');
  refs.galleryLibraryListEl.innerHTML = '';
  refs.galleryLibraryListEl.insertAdjacentHTML('beforeend', markup);
}

//== пробна розмітка без жанрів (потрібно ще підключити сюди жанри) підключена всюди, потрібно буде потім поміняти
export function renderBaseCardMarkupMovieee({ results }) {
  const markup = results
    .map(
      ({
        adult,
        id,
        title,
        backdrop_path,
        genre_ids,
        poster_path,
        release_date,
      }) => {
        let baseImgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
        if (!poster_path) {
          baseImgUrl = errorImg;
        }
        const resultMarkup = `<li class="gallery__item">
          <img
            class="gallery__item--img"
            src="${baseImgUrl}"
            alt="${title}"
            loading="lazy"
            height=""
            data-img-id="${id}"
          />
          <div class="gallery__item--data">${parseInt(release_date)}</div>

          <div class="gallery__item--list">
              <div class="gallery__item--title"><b>${title}</b></div>
              <div class="gallery__item-genre"></div>
              </div  
      </li>`;
        return resultMarkup;
      }
    )
    .join('');
  refs.galleryEl.innerHTML = '';
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

export default {
  renderBaseCardMarkupMovie,
  renderModalMovieInfo,
  renderBaseCardMarkupMovieee,
  renderByIdMovieInLibrary,
};
