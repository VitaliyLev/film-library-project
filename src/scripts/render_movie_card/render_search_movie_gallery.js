import GetApiRequest from '../all_api_request/get_api';
import {renderTrendGallery, renderMovieSearchGallery} from '../all_api_request/api_response'
import { refs } from '../refs';
import { Notify } from 'notiflix';
import { getPaginationFromSearchRequest } from '../pagination';

const getSearchMovieGallery = new GetApiRequest();
function handleSearchFormSubmit(e) {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value.trim();

  if (query === '') {
    return;
  }

  getPaginationFromSearchRequest(query)
}

function handleInputChange (e) {
  e.preventDefault();
  const query = e.target.value.trim();

  if (query === '') {
    Notify.success(
      'Popular films shown.'
    );
    renderTrendGallery();
    return;
  }
}
//кліки на сабміт і на інпут при пошуку логіка
refs.formElem.addEventListener('submit', handleSearchFormSubmit);
refs.searchInputEl.addEventListener('input', handleInputChange)
