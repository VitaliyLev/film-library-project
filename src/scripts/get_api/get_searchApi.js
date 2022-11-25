import axios from 'axios';
import renderHtmlMurkup from '../render_markup/base_card_gallery'

const URL = 'https://api.themoviedb.org/3/';
const MY_MOVIE_KEY = '388e7c1d810433186d944819803a330c';

const END_POINT_SEARCH = 'search/movie?';

// const perPage = 20;
class ApiImagesSearchRequest {
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

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  getOptionsSearch() {
    const options = new URLSearchParams({
      api_key: `${this.key}`,
      language: 'en-US',
      query: `${this.search}`,
      query: 'cat',
      page: `${this.page}`,
      include_adult: false,
    });
    return options;
  }

  async getImagesSearchGallery() {
    const option = this.getOptionsSearch();
    const response = await axios.get(`${URL}${END_POINT_SEARCH}${option}`);

    //базова силка(приклад)
    // const response = await axios.get(
    //   `https://api.themoviedb.org/3/search/movie?api_key=388e7c1d810433186d944819803a330c&language=en-US&query=${this.search}&page=1&include_adult=false`
    // );
    return response.data;
  }
}

const responseSearchApiImg = new ApiImagesSearchRequest();

function renderSearchGallery() {
    responseSearchApiImg
    .getImagesSearchGallery()
    .then(data => renderHtmlMurkup(data))
    .catch(err => err.message);
}

// renderSearchGallery();
