import axios from 'axios';
import { refs } from '../refs';
// import renderHtmlMurkup from '../render_markup/base_card_gallery';

const URL = 'https://api.themoviedb.org/3/';
const MY_MOVIE_KEY = '388e7c1d810433186d944819803a330c';
const END_POINT_SEARCH_ID = 'movie/';

class ApiImagesSearchByIdRequest {
  constructor() {
    this.url = URL;
    this.key = MY_MOVIE_KEY;
    this.id = null;
  }

  get idValue() {
    return this.id;
  }

  set idValue(value) {
    return (this.id = value);
  }

  getOptionsMain() {
    const options = new URLSearchParams({
      api_key: `${this.key}`,
      language: 'en-US',
    });
    return options;
  }

  async getImagesTrendGallery() {
    const option = this.getOptionsMain();
    const response = await axios.get(
      `${URL}${END_POINT_SEARCH_ID}${this.id}?${option}`
    );

    //базова силка(приклад)
    // const response = await axios.get(
    //   'https://api.themoviedb.org/3/movie/{movie_id}?api_key=388e7c1d810433186d944819803a330c&language=en-US'
    // );
    return response.data;
  }
}

const responseByIdApiImg = new ApiImagesSearchByIdRequest();

function renderByIdGallery() {
  responseByIdApiImg
    .getImagesTrendGallery()
    // .then(data => renderHtmlMurkup(data))
    .then(data => console.log(data))

    .catch(err => err.message);
}

function handleClickOnImgCard(e) {
  e.preventDefault();

  const handClick = e.target.nodeName;
  if (handClick !== 'IMG') {
    return;
  }

  responseByIdApiImg.idValue = e.target.dataset.imgId;
  renderByIdGallery();
}

refs.galleryEl.addEventListener('click', handleClickOnImgCard);
