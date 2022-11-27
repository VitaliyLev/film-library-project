import Pagination from 'tui-pagination';
import axios from 'axios';
import { refs } from './refs';
import renderHtmlMurkup from './render_markup/base_card_gallery';
import {
  ApiImagesTrendRequest,
  renderTrendGallery,
} from './get_api/get_trendApi';

const MAIN_URL = 'https://api.themoviedb.org/3/';
const MAIN_MY_MOVIE_KEY = '388e7c1d810433186d944819803a330c';
const MAIN_END_POINT_TREND_GALLERY = 'trending/movie/day?';

export class CreatePagination {
  total_pages = null;
  total_results = null;
  getOptionsMain(page = 1) {
    const options = new URLSearchParams({
      api_key: `${MAIN_MY_MOVIE_KEY}`,
      page,
    });
    return options;
  }

  async getImagesTrendGallery(page) {
    const option = this.getOptionsMain(page);
    const response = await axios.get(
      `${MAIN_URL}${MAIN_END_POINT_TREND_GALLERY}${option}`
    );
    return response.data;
  }

  renderTrendGallery(page) {
    this.getImagesTrendGallery(page)
      .then(data => {
        renderHtmlMurkup(data);
        this.total_pages = data.total_pages;
        this.total_results = data.total_results;
        const container = document.getElementById('pagination');
        const paginationOptions = {
          totalItems: this.total_results,
          itemsPerPage: 100,
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

        const pagination = new Pagination(container, paginationOptions);

        pagination.on('beforeMove', e => {
          const currentPage = e.page;

          renderTrendGallery(currentPage);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        });
      })
      .catch(err => err.message);
  }
}
