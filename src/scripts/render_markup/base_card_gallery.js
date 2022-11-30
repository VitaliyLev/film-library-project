import { refs } from '../refs';
import { defineGenre } from '../get_api/get_trendApi';

//рендер базової розмітки на main gallery
export default function renderHtmlMurkup({ results }) {
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
        if (!poster_path) {
          return;
        }
        const genreName = defineGenre(genre_ids);
        const resultMarkup = `<li class="gallery__item">
          <img
            class="gallery__item--img"
            src="https://image.tmdb.org/t/p/w500${poster_path}"
            alt=""
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
