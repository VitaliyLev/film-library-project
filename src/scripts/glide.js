import Glide from '@glidejs/glide';
import '~node_modules/@glidejs/glide/dist/css/glide.core.min.css';
import axios from 'axios';
import { refs } from './refs';

const URL = 'https://api.themoviedb.org/3/';
const MY_MOVIE_KEY = '388e7c1d810433186d944819803a330c';
const END_POINT_SEARCH_ID = 'movie/';

const options = new URLSearchParams({
  api_key: MY_MOVIE_KEY,
  language: 'en-US',
});

async function getImagesTrendGallery(id) {
  const response = await axios.get(
    `${URL}${END_POINT_SEARCH_ID}${id}?${options}`
  );
  return response.data;
}

function renderModalByIdGallery(id) {
  getImagesTrendGallery(id)
    .then(data => {
      renderModalMarkup(data);
    })
    .catch(console.log);
}

function renderModalMarkup(data) {
  const {
    id,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
    poster_path,
  } = data;

  // console.log('renderModalFoo');

  const genr = genres.map(genr => genr.name);

  const markupImg = `
      <img class="film-details__image js-image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="#" />
      `;
  const markDetails = `
  <h2 class="film-details__title js-title">${title}</h2>
  <ul class="film-details__list list">
    <li class="film-details__item">
      <p class="film-details__text lang-rating">Vote / Votes</p>
      <span class="film-details__span film-details__span--accent js-vote"
        >${vote_average.toFixed(1)}</span
      >
      <span>/</span>
      <span
        class="film-details__span film-details__span--noaccent js-vote-count"
        >${vote_count}</span
      >
    </li>
    <li class="film-details__item">
      <p class="film-details__text lang-popularity">Popularity</p>
      <span class="film-details__span js-popularity">${popularity.toFixed(1)}
      </span>
    </li>
    <li class="film-details__item">
      <p class="film-details__text lang-original">Original Title</p>
      <span class="film-details__span js-title-orig"
        >${original_title}</span
      >
    </li>
    <li class="film-details__item">
      <p class="film-details__text lang-genre">Genre</p>
      <span class="film-details__span js-genres">${genr}</span>
    </li>
  </ul>
  <p class="film-details__about lang-about">About</p>
  <p class="film-details__overview js-about">
    ${overview}
  </p>`;
  refs.wraperModalEl.classList.remove('modal-hidden');
  refs.modalEl.classList.remove('modal-hidden');
  // console.log(refs.imageWrapperEl);
  refs.imageWrapperEl.innerHTML = '';
  refs.filmDetailsWrapperEl.innerHTML = '';
  // console.log(refs.filmDetailsWrapperEl);
  refs.imageWrapperEl.insertAdjacentHTML('beforeend', markupImg);
  refs.filmDetailsWrapperEl.insertAdjacentHTML('beforeend', markDetails);
}

const createElement = (nodeName, options, children) => {
  const nodeElement = document.createElement(nodeName);
  const { class: nodeClass, dataset, ...restOptions } = options;

  if (nodeClass) {
    const classList = nodeClass.split(' '); // ['title', 'description']
    nodeElement.classList.add(...classList);
  }

  if (children) {
    const nodeChildren = Array.isArray(children) ? children : [children];
    nodeElement.append(...nodeChildren);
  }

  if (dataset) {
    Object.entries(dataset).forEach(dataAttr => {
      const [dataKey, dataValue] = dataAttr;
      nodeElement.setAttribute(`data-${dataKey}`, dataValue);
    });
  }

  Object.keys(restOptions).forEach(optionKey => {
    nodeElement[optionKey] = restOptions[optionKey];
  });

  return nodeElement;
};
const config = {
  type: 'carousel',
  perView: 10,
  autoplay: 2500,
  gap: 15,
  touchRatio: 0.1,
  keyboard: true,
  hoverpause: true,
  animationDuration: 1000,
  animationTimingFunc: 'ease-out',
  peek: { before: 50, after: 50 },
  breakpoints: {
    2000: {
      perView: 10,
    },
    1600: {
      perView: 8,
    },
    1280: {
      perView: 7,
    },
    1023: {
      perView: 5,
    },
    500: {
      perView: 2,
    },
  },
};

// const options = {
//   type: 'carousel',
//   startAt: 0,
//   perView: 1,
//   // autoplay: 2000,
//   keyboard: true,
// };

const glide = new Glide('.glide', config);
// const glideFooter = new Glide('.glide_footer', options);

export function renderGlide(trendMovies) {
  addElFilms(trendMovies);
  onClickSliderCard();
}

function addElFilms(results) {
  const containerSlider = document.querySelector('.container__slider');
  containerSlider.innerHTML = '';

  const markup = `
  <div class="glide">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides" id="glide__slides"></ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&#5130;</button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">&#5125;</button>
        </div>
    </div>`;

  containerSlider.insertAdjacentHTML('beforeend', markup);

  const slidesContainer = document.querySelector('.glide__slides');

  let arrFilmTrends = [];
  results.forEach(el => {
    let image = createElement('img', {
      class: 'cards__image-poster',
      src: `https://image.tmdb.org/t/p/w500${el.poster_path}`,
      alt: 'film__poster',
      dataset: {
        ['img-id']: el.id,
      },
    });

    let li = createElement(
      'li',
      {
        class: 'glide__slide glide__slide--main',
        id: `${el.id}`,
      },
      image
    );
    arrFilmTrends.push(li);
  });

  slidesContainer.append(...arrFilmTrends);

  changeStyleArrow();
  glide.destroy();
  let glid = new Glide('.glide', config);
  glid.mount();
}

//after render slider, change arrow style function

function changeStyleArrow() {
  const refs = {
    left: document.querySelector('.glide__arrow--left'),
    right: document.querySelector('.glide__arrow--right'),
    current: document.querySelectorAll('.glide__arrow'),
  };

  refs.current.forEach(el => {
    el.style.cssText = `
        outline: none;
        box-shadow: none;
        border-radius: 50%;
        padding: 4px 7px;
        background-color: rgba(0, 0, 0, 0.4);
      `;
  });

  refs.left.style.left = `3px`;
  refs.right.style.right = `4px`;
}

// click slider el open modal

function onClickSliderCard() {
  const slidesList = document.querySelector('#glide__slides');

  slidesList.addEventListener('click', ({ target }) => {
    const id = target.dataset.imgId;
    if (!id) return;
    // console.log(id);
    renderModalByIdGallery(id);
  });
}

// import Glide from '@glidejs/glide';

// export function renderGlide(trendMovies) {
//   console.log(trendMovies);
//   const glideEl = document.querySelector('.glide__slides');
//   const markup = trendMovies
//     .map(movie => {
//       return `<li class="glide__slide"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></li>`;
//     })
//     .join('');
//   glideEl.innerHTML = markup;
//   new Glide('.glide', {
//     type: 'carousel',
//     startAt: 0,
//     perView: 3,
//   }).mount();
// }
