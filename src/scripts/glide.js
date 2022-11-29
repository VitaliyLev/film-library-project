import Glide from '@glidejs/glide';
import '~node_modules/@glidejs/glide/dist/css/glide.core.min.css';

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

const glide = new Glide('.glide', config);

export function renderGlide(trendMovies) {
  addElFilms(trendMovies);
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
