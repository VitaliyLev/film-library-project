import Pagination from 'tui-pagination';
import { refs } from './refs';
import renderHtmlMurkup from './render_markup/base_card_gallery';
import {
  ApiImagesTrendRequest,
  renderTrendGallery,
} from './get_api/get_trendApi';

let total_pages = null;
let total_results = null;

const responseTrendApiImg = new ApiImagesTrendRequest();

function processingRequest() {
  responseTrendApiImg
    .getImagesTrendGallery(1)
    .then(data => {
        total_pages = data.total_pages;
        total_results = data.total_results;
        const container = document.getElementById('pagination');
        const paginationOptions = {
          totalItems: total_results,
          itemsPerPage: 100,
          visiblePages: 10,
          centerAlign: true,
          page: 1,
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
  
  processingRequest();
  