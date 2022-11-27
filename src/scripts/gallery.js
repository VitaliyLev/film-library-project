import { refs } from '../scripts/refs';
import { CreatePagination } from './pagination';

const createPagination = new CreatePagination();
createPagination.renderTrendGallery(1);

//приклад запиту зажанром
// {
//   "genres" [
//     {
//       "id": 28,
//       "name": "Action"
//     }
//   ]
// }

// gernes POINT 'genre/movie/list?';

// `<div class="photo-card">
// <img class="imgsize" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="" loading="lazy" height=""/>
// <div class="info">
//     <p class="info-item"><b>${title}</b></p>
//     <p class="info-item"><b>Views</b>${id}</p>
//     <p class="info-item"><b>Comments</b>${title}</p>
// </div>
// </div>`
