import axios from 'axios';
import renderHtmlMurkup from '../render_markup/base_card_gallery';
import storageAPI from '../storageAPI';

const URL = 'https://api.themoviedb.org/3/';
const MY_MOVIE_KEY = '388e7c1d810433186d944819803a330c';
const END_POINT_TREND_GALLERY = 'trending/movie/day?';

export class ApiImagesTrendRequest {
  constructor() {
    this.url = URL;
    this.key = MY_MOVIE_KEY;
  }

  getOptionsMain(page = 1) {
    const options = new URLSearchParams({
      api_key: `${this.key}`,
      page,
    });
    return options;
  }
  async getFilmGenres() {
    const genres = await axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`
      )
      .then(response => response.data.genres)
      .then(data => storageAPI.save('genres', data));
  }

  async getImagesTrendGallery(page) {
    const option = this.getOptionsMain(page);
    const response = await axios.get(
      `${URL}${END_POINT_TREND_GALLERY}${option}`
    );

    //базова силка(приклад)
    // const response = await axios.get(
    //   'https://api.themoviedb.org/3/trending/movie/day?api_key=388e7c1d810433186d944819803a330c'
    // );
    return response.data;
  }
}

const responseTrendApiImg = new ApiImagesTrendRequest();

export function renderTrendGallery(page) {
  responseTrendApiImg.getFilmGenres();
  responseTrendApiImg
    .getImagesTrendGallery(page)
    .then(data => {
      renderHtmlMurkup(data);
    })
    .catch(err => err.message);
}
renderTrendGallery();

export function defineGenre(genresIds) {
  const genresList = storageAPI.load('genres');
  const genresNames = genresIds.map(item => {
    return genresList.find(element => item == element.id).name;
  });
  return genresNames.join(', ');
}
