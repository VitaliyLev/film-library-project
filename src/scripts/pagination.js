import Pagination from 'tui-pagination';
import {
  renderTrendGallery,
  renderMovieSearchGallery,
} from '../scripts/all_api_request/api_response';
import { refs } from './refs';
import GetApiRequest from './all_api_request/get_api';

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

const apiService = new GetApiRequest();

export async function getPaginationFromMainRequest() {
  const renderFilms = await apiService
    .getMovieTrendGallery()
    .then(data => (paginationOptions.totalItems = data.total_results));
  const pagination = new Pagination(
    refs.paginationContainer,
    paginationOptions
  );

  renderTrendGallery();
  pagination.on('beforeMove', e => {
    renderTrendGallery(e.page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

export async function getPaginationFromSearchRequest(query) {
  const renderFilms = await apiService
    .getMovieTrendGallery()
    .then(data => (paginationOptions.totalItems = data.total_pages));
  const pagination = new Pagination(
    refs.paginationContainer,
    paginationOptions
  );

  renderMovieSearchGallery(query, 1);
  pagination.on('beforeMove', e => {
    renderMovieSearchGallery(query, e.page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
