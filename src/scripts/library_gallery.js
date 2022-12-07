import { refs } from './refs';
import storageAPI from '../scripts/storageAPI';
import { renderMovieGalleryById } from '../scripts/all_api_request/api_response';
import { renderModalInfoById } from '../scripts/all_api_request/api_response';

const LOCAL_STORAGE_WATCH_KEY = 'watch';
const LOCAL_STORAGE_QUEUE_KEY = 'queue';

//рендер початкової сторінки з кнопки watch
let watched = storageAPI.load(LOCAL_STORAGE_WATCH_KEY) || '[]';
renderMovieGalleryById(watched);

function handleClickOnImgCardLibrary(e) {
  e.preventDefault();

  const handClick = e.target.nodeName;
  if (handClick !== 'IMG') {
    return;
  }
  const movieId = e.target.dataset.imgId;
  refs.imageWrapperEl.innerHTML = '';
  refs.filmDetailsWrapperEl.innerHTML = '';

  renderModalInfoById(movieId);

  refs.wraperModalEl.classList.remove('modal-hidden');
  refs.modalEl.classList.remove('modal-hidden');

  overviewLocalStorageOnIdContainsLibrary(movieId);

  //відключення кнопок(можна залишити так, або так як було раніше)
  // if (refs.btnWatchedLibraryEl.classList.contains('btn-active')) {
  //   refs.btnModalQueueEl.style.display = 'none';
  //   refs.btnModalWatchedEl.style.display = 'block';
  // } else {
  //   refs.btnModalWatchedEl.style.display = 'none';
  //   refs.btnModalQueueEl.style.display = 'block';
  // }

  function handleBtnWatchModalClick(e) {
    e.preventDefault();

    updateLocalStorageListLibrary(LOCAL_STORAGE_WATCH_KEY, movieId);
    overviewLocalStorageOnIdContainsLibrary(movieId);

    let watched = storageAPI.load(LOCAL_STORAGE_WATCH_KEY) || '[]';
    renderMovieGalleryById(watched);
  }

  function handleBtnQueueModalClick(e) {
    e.preventDefault();
    updateLocalStorageListLibrary(LOCAL_STORAGE_QUEUE_KEY, movieId);
    overviewLocalStorageOnIdContainsLibrary(movieId);

    const queue = storageAPI.load(LOCAL_STORAGE_QUEUE_KEY) || '[]';
    renderMovieGalleryById(queue);
  }
  //клік на кнопки в модалці на сторінці my lubrary
  refs.btnModalWatchedEl.addEventListener('click', handleBtnWatchModalClick);
  refs.btnModalQueueEl.addEventListener('click', handleBtnQueueModalClick);
  refs.closeBtnModalEl.addEventListener('click', removeEventListeners);
  function removeEventListeners() {
    refs.btnModalWatchedEl.removeEventListener(
      'click',
      handleBtnWatchModalClick
    );
    refs.btnModalQueueEl.removeEventListener('click', handleBtnQueueModalClick);
  }
}
//клік на фільми на сторінуці my library
refs.galleryLibraryListEl.addEventListener(
  'click',
  handleClickOnImgCardLibrary
);
//перевірка чи є айдішка в стореджі
function updateLocalStorageListLibrary(key, id) {
  const loadAddedList = localStorage.getItem(key);
  const parsedIdList = new Set(JSON.parse(loadAddedList));

  if (!loadAddedList) {
    const watchSetting = [id];
    localStorage.setItem(key, JSON.stringify(watchSetting));
  }

  if (loadAddedList) {
    if (!parsedIdList.has(id)) parsedIdList.add(id);
    else parsedIdList.delete(id);
    localStorage.setItem(key, JSON.stringify([...parsedIdList]));
  }
}
//перевірка чи є айдішка тоді міняєм значення кнопки на відповідне
function overviewLocalStorageOnIdContainsLibrary(id) {
  const keyW = LOCAL_STORAGE_WATCH_KEY;
  const keyQ = LOCAL_STORAGE_QUEUE_KEY;

  const loadAddedListW = localStorage.getItem(keyW) || '[]';
  const parsedIdListW = new Set(JSON.parse(loadAddedListW));

  const loadAddedListQ = localStorage.getItem(keyQ) || '[]';
  const parsedIdListQ = new Set(JSON.parse(loadAddedListQ));

  if (parsedIdListW.has(id)) {
    refs.btnModalWatchedEl.textContent = 'remove from watch';
  } else {
    refs.btnModalWatchedEl.textContent = 'add to watch';
  }

  if (parsedIdListQ.has(id)) {
    refs.btnModalQueueEl.textContent = 'remove from queue';
  } else {
    refs.btnModalQueueEl.textContent = 'add to queue';
  }
}

//btn id header queue and wached(кнопки в хедері)
function handleWatchedHeaderBtnClick(e) {
  e.preventDefault();
  const watched = storageAPI.load(LOCAL_STORAGE_WATCH_KEY) || '[]';
  refs.galleryLibraryListEl.innerHTML = '';

  renderMovieGalleryById(watched);
  refs.btnQueueLibraryEl.classList.remove('btn-active');
  refs.btnWatchedLibraryEl.classList.add('btn-active');
}

function handleQueueHeaderBtnClick(e) {
  e.preventDefault();
  const queue = storageAPI.load(LOCAL_STORAGE_QUEUE_KEY) || '[]';
  refs.galleryLibraryListEl.innerHTML = '';

  renderMovieGalleryById(queue);
  refs.btnQueueLibraryEl.classList.add('btn-active');
  refs.btnWatchedLibraryEl.classList.remove('btn-active');
}
//логіка кліків на кнопки в зедері
refs.btnWatchedLibraryEl.addEventListener('click', handleWatchedHeaderBtnClick);
refs.btnQueueLibraryEl.addEventListener('click', handleQueueHeaderBtnClick);
