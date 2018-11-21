import { tns } from "../../node_modules/tiny-slider/src/tiny-slider"

export default function carouselsSetup() {

  const opinions = {
    items: 1,
    speed: 700,
    autoplay: true,
    autoplayButtonOutput: false,
  }

  const options_1 = {
    ...opinions,
    slideBy: 'page',
    autoplayTimeout: 2000,
    controls: false,
  }
  const options_2 = {
    ...opinions,
    autoplayTimeout: 3000,
    mode: "gallery",
    animateIn: "fade-in",
    animateOut: "fade-out",
  }

  const options_3 = {
    ...opinions,
    slideBy: 'page',
    autoplayTimeout: 3000,
  }

  if(document.querySelector('.carousel .nav-tools')) {
    const carouselSlider = tns({
      ...options_1,
      container: '.carousel .image-list',
      navContainer: '.carousel .nav-tools',
    });
  }

  if(document.querySelector('.rooms')) {
    const cardSlider = tns({
      ...options_1,
      autoplay: false,
      autoWidth: true,
      container: '.rooms .cards .cards-list',
      mouseDrag: true,
      navContainer: '.rooms .nav-tools',
      responsive: {
        320: {
          gutter: 0,
        },
        480: {
          gutter: 25,
          edgePadding: 25,
        },
        768: {
          gutter: 50,
        },
      },
    });
  }

  if(document.querySelector('.special-offers')) {
    const offerSlider = tns({
      ...options_1,
      autoWidth: true,
      container: '.special-offers .cards .cards-list',
      gutter: 50,
      mouseDrag: true,
      navContainer: '.special-offers .nav-tools',
      responsive: {
        320: {
          gutter: 0,
        },
        480: {
          gutter: 25,
          edgePadding: 25,
        },
        768: {
          gutter: 50,
        },
      },
    });
  }

  if(document.querySelector('.posts')) {
    const opinionSlider = tns({
      ...options_2,
      autoplay: false,
      container: '.posts .post-list',
      controlsContainer: ".posts .carousel-pagination",
      navContainer: '.posts .nav-tools',
    });
    const paginationPages = Array.from(document.querySelector('.posts .carousel-pagination .pages').children);
    const imagesList = Array.from(document.querySelector('.expert-opinion .image-list').children);
  
    paginationPages[0].classList.add('active');
    imagesList[0].classList.add('active');
  
    const moveNavSlider = function (info) {

      paginationPages.forEach(paginationPage => paginationPage.classList.remove('active'));
      paginationPages[info.navCurrentIndex].classList.add('active');

      imagesList.forEach(image => image.classList.remove('active'));
      imagesList[info.navCurrentIndex].classList.add('active');
    }
  
    opinionSlider.events.on('transitionStart', moveNavSlider);
  }

  if(document.querySelector('.reviews')) {
    const reviewSlider = tns({
      ...options_2,
      container: '.reviews .reviews-list',
      controlsContainer: ".reviews .carousel-pagination",
      navContainer: '.reviews .carousel-pagination .pages',
    });
  }

  if(document.querySelector('.carousel-with-arrows')) {
    const reviewSlider = tns({
      ...options_3,
      container: '.carousel-with-arrows .content-list',
      controlsContainer: ".carousel-with-arrows .carousel-pagination",
      navContainer: '.carousel-with-arrows .carousel-pagination .pages',
    });
  }
}
