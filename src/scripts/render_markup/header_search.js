import renderHtmlMurkup from './base_card_gallery';
import { Notify } from 'notiflix';
import {
  ApiImagesSearchRequest,
  renderSearchGallery,
} from '../get_api/get_searchApi.js';
import { refs } from '../refs';
import storageAPI from '../storageAPI';

let page = null;
let query = null;

const searchAPI = new ApiImagesSearchRequest();

async function handleFormSubmit(event) {
  event.preventDefault();
  console.log('submit');
  page = 1;
  query = event.target.elements.searchQuery.value.trim();
  if (query === '') {
    return;
  }
  searchAPI.searchValue = query;
  const filmResponse = await searchAPI.getImagesSearchGallery();
  if (filmResponse.total_results)
    Notify.info(`Hooray!We found ${filmResponse.total_results} films`);
  console.log(filmResponse);
  storageAPI.save('lyb', filmResponse.results);
  refs.galleryEl.innerHTML = '';
  if (filmResponse.results.length === 0) {
    Notify.failure(
      'Sorry, there are no films matching your search query. Please try again.'
    );
    return;
  }
  renderSearchGallery(filmResponse);
  // renderHtmlMurkup(filmResponse.hits);
}
refs.formElem.addEventListener('submit', handleFormSubmit);
