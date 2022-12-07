// import {renderTrendGallery} from '../scripts/all_api_request/api_response'
//трендова сторінка при загрузці сайtу виклик
// renderTrendGallery();

import { getPaginationFromMainRequest } from './pagination';
import { refs } from './refs';
import { handleClickOnImgCard } from './render_movie_card/render_modal_info_card';
getPaginationFromMainRequest();
refs.galleryEl.addEventListener('click', handleClickOnImgCard);
