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
          <ul>
              <li><b>${title}</b></li>
              <li class="gallery__item-genre">${genreName}</li>
              <li>${release_date}</li>
          </ul>
      </li>`;
        return resultMarkup;
      }
    )
    .join('');
  refs.galleryEl.innerHTML = '';
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}
