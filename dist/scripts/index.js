document.addEventListener("DOMContentLoaded", (event) => {
  new NavBar();
  new Reviews('reviews_1');
  new Pagination('reviews_2');
  new Dropdown('lang-menu');
  new Dropdown('currency-menu');
  new Dropdown('lang-menu-mobile');
  new Dropdown('currency-menu-mobile');
});

class NavBar {
  constructor() {
    this.onClick = this.onClick.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);

    this.menu = document.querySelector('.navbar-menu');

    this.links = document.querySelectorAll('.navbar-link');
    this.links.forEach(link => link.addEventListener('click', this.onClick));

    this.toggle = document.querySelector('.navbar-toggler');
    this.toggle.addEventListener('click', this.onToggleClick);
  }

  onClick(event) {
    this.links.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
  }

  onToggleClick() {
    const toggleIcon = document.querySelector('.navbar-toggler i');
    toggleIcon.classList.toggle('fa-bars');
    toggleIcon.classList.toggle('fa-times');
    this.menu.classList.toggle('opened');
  }
}

class Reviews {
  constructor(id) {
    this.onClick = this.onClick.bind(this);

    this.reviewsList = Array.from(document.querySelector(`#${id} .reviews-list`).children);
    this.paginationPages = Array.from(document.querySelector(`#${id} .pagination .pages`).children);
    this.leftArrow = document.querySelector(`#${id} .left-arrow`);
    this.rightArrow = document.querySelector(`#${id} .right-arrow`);

    this.leftArrow.addEventListener('click', this.onClick);
    this.rightArrow.addEventListener('click', this.onClick);
  }

  onClick(event) {
    const step = (event.target.dataset.dataArrow == 'left') ? -1 : 1;
    const pageCount = this.paginationPages.length;
    let pageChangeStatus = false;

    this.paginationPages.forEach((pageNumber, index) => {
      if (pageNumber.classList.contains('active') && !pageChangeStatus) {
        pageNumber.classList.remove('active');
        this.reviewsList[index].classList.remove('active');

        let nextIndex = index + step;
        nextIndex = (nextIndex < 0) ? pageCount - 1 : (nextIndex == pageCount) ? 0 : nextIndex;

        this.paginationPages[nextIndex].classList.add('active');
        this.reviewsList[nextIndex].classList.add('active');
        pageChangeStatus = true;
      }
    });
  }
}

class Pagination {
  constructor(id) {
    this.onClick = this.onClick.bind(this);

    this.reviewsList = Array.from(document.querySelector(`#${id} .pagination-text-list`).children);
    this.imageList = Array.from(document.querySelector(`#${id} .pagination-image-list`).children);
    this.paginationPages = Array.from(document.querySelector(`#${id} .pagination .pages`).children);
    this.leftArrow = document.querySelector(`#${id} .left-arrow`);
    this.rightArrow = document.querySelector(`#${id} .right-arrow`);

    this.leftArrow.addEventListener('click', this.onClick);
    this.rightArrow.addEventListener('click', this.onClick);
  }

  onClick(event) {
    const step = (event.target.dataset.dataArrow == 'left') ? -1 : 1;
    const pageCount = this.paginationPages.length;
    let pageChangeStatus = false;

    this.paginationPages.forEach((pageNumber, index) => {
      if (pageNumber.classList.contains('active') && !pageChangeStatus) {
        pageNumber.classList.remove('active');
        this.reviewsList[index].classList.remove('active');

        let nextIndex = index + step;
        nextIndex = (nextIndex < 0) ? pageCount - 1 : (nextIndex == pageCount) ? 0 : nextIndex;

        this.paginationPages[nextIndex].classList.add('active');
        this.reviewsList[nextIndex].classList.add('active');
        pageChangeStatus = true;

        if (this.imageList) {
          this.imageList[index].classList.remove('active');
          this.imageList[nextIndex].classList.add('active');
        }
      }
    });
  }
}

class Dropdown {
  constructor(id) {
    console.warn('drop');
    this.dropdown = document.querySelector(`#${id}`);
    this.toggle = document.querySelector(`#${id} .dropdown-toggle`);
    this.backdrop = document.querySelector(`#${id} .dropdown-backdrop`);

    this.onToggleClick = this.onToggleClick.bind(this);
    this.onBackdropClick = this.onBackdropClick.bind(this);

    this.toggle.addEventListener('click', this.onToggleClick);
    this.backdrop.addEventListener('click', this.onBackdropClick);
  }

  onToggleClick() {
    this.dropdown.classList.add('opened');
    console.warn('click');
  }

  onBackdropClick() {
    this.dropdown.classList.remove('opened');
  }
}
