import Glide from '@glidejs/glide';
import '~node_modules/@glidejs/glide/dist/css/glide.core.min.css';
import { handleClickOnImgCard } from './render_movie_card/render_modal_info_card';

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

const glide = new Glide('.glide', config);

export function renderGlide(trendMovies) {
  const containerSlider = document.querySelector('.container__slider');
  containerSlider.innerHTML = '';

  let markup = `
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
  markup = trendMovies
    .map(
      el =>
        `<li class="glide__slide glide__slide--main" id="${el.id}" style="width: 148.2px; margin-left: 7.5px; margin-right: 7.5px;"><img class="cards__image-poster" data-img-id="${el.id}" src="https://image.tmdb.org/t/p/w500${el.poster_path}" alt="film__poster"></li>`
    )
    .join('');
  slidesContainer.innerHTML = markup;
  glide.mount();
  const slidesList = document.querySelector('#glide__slides');
  slidesList.addEventListener('click', handleClickOnImgCard);
}
