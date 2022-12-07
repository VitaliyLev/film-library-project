import axios from 'axios';
import storageAPI from '../storageAPI';

const BASE_URL = 'https://api.themoviedb.org/3/';
const BASE_MOVIE_KEY = '388e7c1d810433186d944819803a330c';

const END_POINT_TREND_GALLERY = 'trending/movie/day?';
const END_POINT_SEARCH_ID = 'movie/';
const END_POINT_SEARCH = 'search/movie?';

export default class GetApiRequest {
  constructor() {
    this.url = BASE_URL;
    this.key = BASE_MOVIE_KEY;
    this.id = null;
    // this.query = '';
    // this.page = 1;
  }

  getOptionsMain(page=1) {
    const options = new URLSearchParams({
      api_key: `${this.key}`,
      page: page,
    });
    return options;
  }
  
  
  //запит на трендову галерею (головна сторінка)
  async getMovieTrendGallery(page) {
    const option = this.getOptionsMain(page);
      const response = await axios.get(
      `${this.url}${END_POINT_TREND_GALLERY}${option}`
    );
         return response.data;
  }
  //Запит на жанри Для головних картинок (на gallery під картинками жанри)
  async getMovieGenres() {
    const genres = await axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`
      )
      .then(response => response.data.genres)
      .then(data => storageAPI.save('genres', data));
  }
  //запит на пошук галерею (header )
  async getMovieSearchGallery(query, page) {
    const option = this.getOptionsMain(page);
    const response = await axios.get(
      `${this.url}${END_POINT_SEARCH}${option}&query=${query}`
      //вкінці можливо ще має бути запит page(для пагінації) , (page=${this.page})
    );
    return response.data;
  }
  //запит на пошук по айдішнику для модалки(інфо) та для рендеру картинок на my library
  async getMovieSearchByIdGallery(id) {
    const response = await axios.get(
      `${this.url}${END_POINT_SEARCH_ID}${id}?api_key=${this.key}&language=en-US`
    );
    return response.data;
  }
}