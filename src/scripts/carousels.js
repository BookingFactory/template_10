import { tns } from "../../node_modules/tiny-slider/src/tiny-slider"

export default function carouselsSetup() {

  const opinions = {
    items: 1,
    speed: 700,
    autoplayButtonOutput: false,
    responsive: {
      320: {
        autoplay: false,
      },
      768: {
        autoplay: true,
      },
    },
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
    autoplay: false,
  }

  if(document.querySelector('.carousel .nav-tools')) {
    const navContainer = (document.querySelectorAll('.carousel .nav-point').length > 1) ? '.carousel .nav-tools' : false;
    const carouselSlider = tns({
      ...options_1,
      autoplayTimeout: 3000,
      container: '.carousel .image-list',
      navContainer,
    });
  }

  if(document.querySelector('.rooms')) {
    const cardSlider = tns({
      ...options_1,
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
          autoplay: false,
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

  if(document.querySelector('.posts .nav-tools')) {
    const opinionSlider = tns({
      ...options_2,
      container: '.posts .post-list',
      controlsContainer: ".posts .carousel-pagination",
      navContainer: '.posts .nav-tools',
      responsive: {
        768: {
          autoplay: false,
        },
      },
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
    let navContainer = false;
    if(document.querySelectorAll('.carousel-with-arrows .carousel-pagination .pages li').length) {
      navContainer = '.carousel-with-arrows .carousel-pagination .pages';
    }
    const reviewSlider = tns({
      ...options_3,
      container: '.carousel-with-arrows .content-list',
      controlsContainer: ".carousel-with-arrows .carousel-pagination",
      navContainer,
    });
  }
}
