import Dropdown from './dropdown';

export default class ExtraMenu {
  constructor() {
    this.changeExtraMenuChildren = this.changeExtraMenuChildren.bind(this);
    this.resizeExtraMenu = this.resizeExtraMenu.bind(this);
    this.resizeExtraMenuHandler = this.resizeExtraMenuHandler.bind(this);

    this.navbar = document.querySelector('.navbar');
    this.logo = document.querySelector('.navbar .logo');
    this.menu = document.querySelector('.navbar-menu');

    if(this.checkNeedUseExtraMenu() && !this.checkIsMobile()) {
      this.initExtraMenu();
    }
    window.addEventListener('resize', this.resizeExtraMenu, false);
  }

  checkIsMobile() {
    return (document.documentElement.scrollWidth <= 1023);
  }

  checkNeedUseExtraMenu() {
    return (this.navbar.offsetWidth - (this.menu.offsetWidth + this.logo.offsetWidth) < 100);
  }

  changeExtraMenuChildren() {
    if(this.checkNeedUseExtraMenu()) {
      const itemToMove = this.getLastNavbarMenuChild();
      if(itemToMove) {
        this.extraMenuBody.insertBefore(itemToMove, this.extraMenuBody.firstChild);
        this.changeExtraMenuChildren();
      }
    }
  }

  getLastNavbarMenuChild() {
    const navbarMenuItems = document.querySelectorAll('.navbar-menu > .navbar-item');
    return (navbarMenuItems) ? Array.prototype.slice.call(navbarMenuItems, -1)[0] : nill;
  }

  letGoExtraMenuItems() {
    this.menu.insertBefore(this.extraMenuBody.firstChild, this.extraMenu.parentElement);
    if(this.extraMenuBody.children.length){
      this.letGoExtraMenuItems();
    } else {
      this.menu.removeChild(this.extraMenu.parentElement);
    }
  }

  createExtraMenu() {
    const extraMenuTemplate = `
    <div id="more-navbar-menu" class="dropdown">
      <div class="dropdown-backdrop"></div>
      <button class="dropdown-toggle navbar-link">More <i class="fa fa-angle-down"></i></button>
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
    new Dropdown(this.extraMenu);
    this.extraMenuBody = document.querySelector('#more-navbar-menu .dropdown-menu');
    this.changeExtraMenuChildren();
  }

  resizeExtraMenu() {
    if(!this.resizeTimeout) {
      console.log('Resize');
      this.resizeTimeout = setTimeout(() => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = null;
        this.resizeExtraMenuHandler();
      }, 100);
    }
  }

  resizeExtraMenuHandler() {
    if(this.checkNeedUseExtraMenu() && !this.checkIsMobile()) {
      if (document.querySelector('#more-navbar-menu')) {
        this.changeExtraMenuChildren();
      } else {
        this.initExtraMenu();
      }
    } else {
      if (this.checkIsMobile()) {
        if(this.extraMenuBody.children.length){
          this.letGoExtraMenuItems();
        }
      }
    }
  }
}