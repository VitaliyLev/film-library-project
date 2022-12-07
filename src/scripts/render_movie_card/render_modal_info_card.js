import { refs } from '../refs';
import { renderModalInfoById } from '../all_api_request/api_response';

const LOCAL_STORAGE_WATCH_KEY = 'watch';
const LOCAL_STORAGE_QUEUE_KEY = 'queue';

export function handleClickOnImgCard(e) {
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

  overviewLocalStorageOnIdContains(movieId);

  function handleWatchClick(e) {
    e.preventDefault();
    updateLocalStorageList(LOCAL_STORAGE_WATCH_KEY, movieId);
    overviewLocalStorageOnIdContains(movieId);
  }

  function handleQueueClick(e) {
    e.preventDefault();
    updateLocalStorageList(LOCAL_STORAGE_QUEUE_KEY, movieId);
    overviewLocalStorageOnIdContains(movieId);
  }

  //логіка кліку на кнопки які в модалці
  refs.btnModalWatchedEl.addEventListener('click', handleWatchClick);
  refs.btnModalQueueEl.addEventListener('click', handleQueueClick);
  refs.closeBtnModalEl.addEventListener('click', removeEventListeners);
  function removeEventListeners() {
    refs.btnModalWatchedEl.removeEventListener('click', handleWatchClick);
    refs.btnModalQueueEl.removeEventListener('click', handleQueueClick);
  }
}
//клік на картинку в галереї фільмів
// refs.galleryEl.addEventListener('click', handleClickOnImgCard);

//перевірка чи є айдішник в локал сторедж
function updateLocalStorageList(key, id) {
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
//перевірка чи є айді в сторедж ( і тоді зміна кнопок на remove або watch)
function overviewLocalStorageOnIdContains(id) {
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
