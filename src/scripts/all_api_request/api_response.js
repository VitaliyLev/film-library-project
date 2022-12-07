import GetApiRequest from './get_api';
import { Notify } from 'notiflix';
import {
  renderBaseCardMarkupMovie,
  renderModalMovieInfo,
  renderBaseCardMarkupMovieee,
  renderByIdMovieInLibrary,
} from '../render_movie_markup/render_markup';
import { renderGlide } from '../glide';

const getApiResponse = new GetApiRequest();

// //один раз на сайті запит оцей на тренди в локал сторедж треба if(якщо не має в сторедж тоді запит відправити на сервер) прописати
// getApiResponse.getMovieGenres();

//запит на трендові картинки на головну сторінку
export function renderTrendGallery(page) {
  getApiResponse
    .getMovieTrendGallery(page)
    .then(data => {
      renderGlide(data.results);
      renderBaseCardMarkupMovieee(data);
    })
    .catch(err => err.message);
}
//рендер галереї згідно пошуку на кнопку сабміт в header
export function renderMovieSearchGallery(query, page) {
  getApiResponse
    .getMovieSearchGallery(query, page)
    .then(data => {
      if (data.total_results === 0) {
        Notify.failure(
          'Sorry, there are no films matching your search query.Popular films shown.'
        );
        renderTrendGallery();
        return;
      }
      renderBaseCardMarkupMovieee(data);
    })
    .catch(err => err.message);
}
//рендер інфо в модалці за айдішкою при відкритті
export function renderModalInfoById(id) {
  getApiResponse
    .getMovieSearchByIdGallery(id)
    .then(data => renderModalMovieInfo(data))
    .catch(err => err.message);
}
// рендер фільмів , картинок за айдішкою  (не в модалці а в gallery library)
export async function renderMovieGalleryById(array) {
  const promises = await array.map(id =>
    getApiResponse.getMovieSearchByIdGallery(id)
  );
  const result = await Promise.all(promises);
  renderByIdMovieInLibrary(result);
}
