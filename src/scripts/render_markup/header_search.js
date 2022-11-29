import { renderTrendGallery } from '../gallery';
import { fullTrendFilmsRequestandRender } from '../gallery';
import renderHtmlMurkup from './base_card_gallery';
import Pagination from 'tui-pagination';
import { Notify } from 'notiflix';
import { ApiImagesSearchRequest } from '../get_api/get_searchApi.js';
import { refs } from '../refs';
import storageAPI from '../storageAPI';

const searchAPI = new ApiImagesSearchRequest();

const paginationSettings = {
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

async function fullSearchedFilmsRequestRender(page, query) {
  if (query === '') {
    fullTrendFilmsRequestandRender(1);
    return;
  }
  const filmResponse = await searchAPI
    .getImagesSearchGallery(page, query)
    .then(data => (paginationSettings.totalItems = data.total_results));
  const pagination2 = new Pagination(
    refs.paginationContainer,
    paginationSettings
  );
  renderSearchedFilms(page, query);
  pagination2.on('beforeMove', e => {
    console.log(e.page);
    const currentPage = e.page;
    renderSearchedFilms(currentPage, query);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

async function renderSearchedFilms(page, query) {
  const filmResponse = await searchAPI
    .getImagesSearchGallery(page, query)
    .then(data => {
      if (!data.total_results) {
        Notify.failure(
          'Sorry, there are no films matching your search query.Popular films shown.'
        );
        renderTrendGallery(1);
        return;
      }
      renderHtmlMurkup(data);
    })
    .catch(err => err.message);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const query = event.target.elements.searchQuery.value.trim();
  fullSearchedFilmsRequestRender(1, query);
}
refs.formElem.addEventListener('submit', handleFormSubmit);
