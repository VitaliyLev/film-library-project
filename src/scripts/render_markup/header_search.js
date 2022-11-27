import renderHtmlMurkup from './base_card_gallery';
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
  console.log(filmResponse);

  //======================================================
  storageAPI.save('watched', filmResponse.results);
  searchAPI.page = 2;

  const queue = await searchAPI.getImagesSearchGallery();
  storageAPI.save('queue', queue.results);
  //======================================================

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
}
refs.formElem.addEventListener('submit', handleFormSubmit);
