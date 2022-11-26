import axios from 'axios';
import renderHtmlMurkup from '../render_markup/base_card_gallery';

const URL = 'https://api.themoviedb.org/3/';
const MY_MOVIE_KEY = '388e7c1d810433186d944819803a330c';
const END_POINT_TREND_GALLERY = 'trending/movie/day?';

export class ApiImagesTrendRequest {
  constructor() {
    this.url = URL;
    this.key = MY_MOVIE_KEY;
  }

  getOptionsMain(page=1) {
    const options = new URLSearchParams({
      api_key: `${this.key}`,
      page,
    });
    return options;
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
    responseTrendApiImg
    .getImagesTrendGallery(page)
    .then(data => {renderHtmlMurkup(data);
      console.log(data.total_pages, data.total_results);
    })
    // .then(data => console.log(data))
    
    .catch(err => err.message);
}
renderTrendGallery();