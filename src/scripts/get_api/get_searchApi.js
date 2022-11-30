import axios from 'axios';
import renderHtmlMurkup from '../render_markup/base_card_gallery';

const URL = 'https://api.themoviedb.org/3/';
const MY_MOVIE_KEY = '388e7c1d810433186d944819803a330c';

const END_POINT_SEARCH = 'search/movie?';

// const perPage = 20;
export class ApiImagesSearchRequest {
  constructor() {
    this.url = URL;
    this.key = MY_MOVIE_KEY;
    // this.perPage = perPage;
    this.search = '';
    this.page = 1;
  }
  get searchValue() {
    return this.search;
  }

  set searchValue(value) {
    return (this.search = value);
  }

  setPageNumber(page) {
    this.page = page;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  getOptionsSearch(page, query) {
    const options = new URLSearchParams({
      api_key: `${this.key}`,
      language: 'en-US',
      query,
      page,
      include_adult: false,
    });
    return options;
  }

  async getImagesSearchGallery(page = 1, query) {
    const option = this.getOptionsSearch(page, query);
    const response = await axios.get(`${URL}${END_POINT_SEARCH}${option}`);
    return response.data;
  }
}

const responseSearchApiImg = new ApiImagesSearchRequest();

export function renderSearchGallery(data) {
  renderHtmlMurkup(data);
}
