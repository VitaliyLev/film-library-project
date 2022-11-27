import renderHtmlMurkup from './base_card_gallery';
import Pagination from 'tui-pagination';
import { renderTrendGallery } from '../get_api/get_trendApi';
import { Notify } from 'notiflix';
import {
  ApiImagesSearchRequest,
  renderSearchGallery,
} from '../get_api/get_searchApi.js';
import {
  ApiImagesTrendRequest,
  renderTrendGallery,
} from '../get_api/get_trendApi';
import { refs } from '../refs';
import storageAPI from '../storageAPI';

let page = null;
let query = null;

const searchAPI = new ApiImagesSearchRequest();

async function handleFormSubmit(event) {
  event.preventDefault();

  page = 1;
  query = event.target.elements.searchQuery.value.trim();
  if (query === '') {
    console.log('submit');
    renderTrendGallery(1);
    return;
  }
  searchAPI.searchValue = query;
  const filmResponse = await searchAPI.getImagesSearchGallery();
  if (filmResponse.total_results)
    Notify.info(`Hooray!We found ${filmResponse.total_results} films`);

  storageAPI.save('watched', filmResponse.results);
  searchAPI.page = 2;

  const queue = await searchAPI.getImagesSearchGallery();
  storageAPI.save('queue', queue.results);

  const container = document.getElementById('pagination');
  const paginationOptions = {
    totalItems: filmResponse.total_results,
    itemsPerPage: 100,
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

  const pagination = new Pagination(container, paginationOptions);

  pagination.on('beforeMove', e => {
    page = e.page;

    pagination.on('beforeMove', e => {
      searchAPI.setPageNumber(e.page);
      refs.galleryEl.innerHTML = '';
      searchAPI
        .getImagesSearchGallery()
        .then(filmResponse => renderSearchGallery(filmResponse))
        .catch(() => console.log('щось не так'));
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
    storageAPI.save('lyb', filmResponse.results);

    refs.galleryEl.innerHTML = '';
    if (filmResponse.results.length === 0) {
      renderTrendGallery(1);
      Notify.failure(
        'Sorry, there are no films matching your search query. Показаны популярные фильмы.'
      );
      return;
    }
    renderSearchGallery(filmResponse);
    // renderHtmlMurkup(filmResponse.hits);
  });
}
refs.formElem.addEventListener('submit', handleFormSubmit);
