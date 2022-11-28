import { refs } from './refs';
import Pagination from 'tui-pagination';
import { ApiImagesTrendRequest } from './get_api/get_trendApi';
import renderHtmlMurkup from './render_markup/base_card_gallery';

// options for pagination settings
const paginationOptions = {
  totalItems: 0,
  itemsPerPage: 21,
  visiblePages: 10,
  centerAlign: true,
  page: 1,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">☀</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const apiService = new ApiImagesTrendRequest();

// call basic function which get number of pages and renderHtmlMurkup
fullTrendFilmsRequestandRender();

// render html content
export async function renderTrendGallery(page) {
  const renderFilms = await apiService
    .getImagesTrendGallery(page)
    .then(data => {
      renderHtmlMurkup(data);
    })
    .catch(err => err.message);
}

//basic function which get number of pages and renderHtmlMurkup
export async function fullTrendFilmsRequestandRender() {
  const filmGenres = await apiService.getFilmGenres();
  const renderFilms = await apiService
    .getImagesTrendGallery()
    .then(data => (paginationOptions.totalItems = data.total_results));
  const pagination = new Pagination(
    refs.paginationContainer,
    paginationOptions
  );
  renderTrendGallery(1);
  pagination.on('beforeMove', e => {
    const currentPage = e.page;

    renderTrendGallery(currentPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

//приклад запиту зажанром
// {
//   "genres" [
//     {
//       "id": 28,
//       "name": "Action"
//     }
//   ]
// }

// gernes POINT 'genre/movie/list?';

// `<div class="photo-card">
// <img class="imgsize" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="" loading="lazy" height=""/>
// <div class="info">
//     <p class="info-item"><b>${title}</b></p>
//     <p class="info-item"><b>Views</b>${id}</p>
//     <p class="info-item"><b>Comments</b>${title}</p>
// </div>
// </div>`
