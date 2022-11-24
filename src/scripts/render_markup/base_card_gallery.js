import { refs } from '../refs';

//рендер базової розмітки на main gallery
export default function renderHtmlMurkup({ results }) {
    const markup = results
      .map(
        ({ adult, id, title, backdrop_path, poster_path }) =>
        `<li class="gallery__item">
          <img
            class="gallery__item--img"
            src="https://image.tmdb.org/t/p/w500${poster_path}"
            alt=""
            loading="lazy"
            height=""
          />
          <ul>
              <li><b>${title}</b></li>
              <li>gerned | year</li>
          </ul>
      </li>`
      )
      .join('');
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}