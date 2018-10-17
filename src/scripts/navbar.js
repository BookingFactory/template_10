export default class NavBar {
  constructor() {
    this.onClick = this.onClick.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.changeExtraMenuChildren = this.changeExtraMenuChildren.bind(this);
    this.resizeExtraMenu = this.resizeExtraMenu.bind(this);

    this.navbar = document.querySelector('.navbar');
    this.logo = document.querySelector('.navbar .logo');
    this.menu = document.querySelector('.navbar-menu');

    this.links = document.querySelectorAll('.navbar-link');
    this.links.forEach(link => link.addEventListener('click', this.onClick));

    this.toggle = document.querySelector('.navbar-toggler');
    this.toggle.addEventListener('click', this.onToggleClick);

    if(this.checkNeedUseExtraMenu() && !this.checkIsMobile()) {
      this.initExtraMenu();
    }
    this.resizeTimeout = null;
    window.addEventListener('resize', this.resizeExtraMenu, false);
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

  checkIsMobile() {
    return (document.documentElement.scrollWidth <= 1023);
  }

  checkNeedUseExtraMenu() {
    return (this.navbar.offsetWidth - (this.menu.offsetWidth + this.logo.offsetWidth) < 100);
  }

  checkNeedExtraMenuLetGoItems() {
    const extraMenuFirstItem = this.extraMenuBody.firstChild;
    return (this.navbar.offsetWidth - (this.menu.offsetWidth + this.logo.offsetWidth + extraMenuFirstItem.offsetWidth) > 100);
  }

  changeExtraMenuChildren() {
    if(this.checkNeedUseExtraMenu()) {
      const itemToMove = this.getLastNavbarMenuChild();
      if(itemToMove) {
        this.extraMenuBody.insertBefore(itemToMove, this.extraMenuBody.firstChild);
        this.changeExtraMenuChildren();
      }
    } else if(this.checkNeedExtraMenuLetGoItems()) {
      this.menu.insertBefore(this.extraMenuBody.firstChild, this.extraMenu.parentElement);
    }
  }

  getLastNavbarMenuChild() {
    const navbarMenuItems = document.querySelectorAll('.navbar-menu > .navbar-item');
    return (navbarMenuItems) ? Array.prototype.slice.call(navbarMenuItems, -1)[0] : nill;
  }

  createExtraMenu() {
    const extraMenuTemplate = `
    <div id="more-navbar-menu" class="dropdown">
      <div class="dropdown-backdrop"></div>
      <button class="dropdown-toggle navbar-link">More</button>
      <ul class="dropdown-menu"></ul>
    </div>`;

    const extraMenu = document.createElement('li');
    extraMenu.innerHTML = extraMenuTemplate;

    const bookNowLinkWrapper = document.querySelector('.navbar-menu #bookNowLinkWrapper');
    this.menu.insertBefore(extraMenu, bookNowLinkWrapper);
  }

  initExtraMenu() {
    this.createExtraMenu();
    this.extraMenu = document.querySelector('#more-navbar-menu');
    this.extraMenuBody = document.querySelector('#more-navbar-menu .dropdown-menu');
    this.changeExtraMenuChildren();
  }

  resizeExtraMenu() {
    if(!this.resizeTimeot) {
      this.resizeTimeout = setTimeout(() => {
        clearTimeout(this.resizeTimeout);
        if(this.checkNeedUseExtraMenu() && !this.checkIsMobile()) {
          // (document.querySelector('#more-navbar-menu')) ? this.changeExtraMenuChildren(): this.initExtraMenu();
          if (document.querySelector('#more-navbar-menu')) {
            this.changeExtraMenuChildren();
          } else {
            this.initExtraMenu();
          }
        }
      }, 1000);
    }
  }
}