document.addEventListener("DOMContentLoaded", (event) => {
  new NavBar();
  Array.from(document.querySelectorAll('.dropdown')).forEach((dropdown) => {
    new Dropdown(dropdown.id);
  });
  new TextFielsdSetup(document.querySelectorAll('textarea'));
  new TextFielsdSetup(document.querySelectorAll('input[type="text"]'));
  new Contacts();
  new DatePickers();
});

class NavBar {
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
      console.log('Hello');
      const itemToMove = this.getLastNavbarMenuChild();
      this.extraMenuBody.insertBefore(itemToMove, this.extraMenuBody.firstChild);
      this.changeExtraMenuChildren();
    } else if(this.checkNeedExtraMenuLetGoItems()) {
      this.menu.insertBefore(this.extraMenuBody.firstChild, this.extraMenu.parentElement);
    }
  }

  getLastNavbarMenuChild() {
    return Array.prototype.slice.call(document.querySelectorAll('.navbar-menu > .navbar-item'), -1)[0];
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

class Dropdown {
  constructor(id) {
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
  }

  onBackdropClick() {
    this.dropdown.classList.remove('opened');
  }
}

class TextFielsdSetup {
  constructor(textFileds) {
    this.textFileds = Array.from(textFileds);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.textFileds.forEach(textFiled => textFiled.addEventListener('keyup', this.onKeyUp));
  }

  onKeyUp(event) {
    (event.target.value) ? event.target.classList.add('dirty') : event.target.classList.remove('dirty');
  }
}

class Contacts {
  constructor() {
    this.contacts = Array.from(document.querySelectorAll('.contacts .body'));
    this.toggles = Array.from(document.querySelectorAll('.contacts .body .button'));

    this.onClick = this.onClick.bind(this);

    this.toggles.forEach(toggle => toggle.addEventListener('click', this.onClick));
  }

  onClick(event) {
    this.contacts.forEach(body => body.classList.toggle('show'));
  }
}

function testUserAgent() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
}

class DatePickers {
  constructor() {
    this.isMobile = testUserAgent();
    this.datePickerLabels = Array.from(document.querySelectorAll('.date-picker-label'));
    if(this.isMobile) {
      this.datePickerLabels.forEach(label => label.classList.add('isMobile'));
    }
    this.datePickers = Array.from(document.querySelectorAll('.date-picker'));
    this.datePickers.forEach((datePicker) => {
      datePicker.addEventListener('change', (event) => {
        const intutId = event.target.id;
        if(intutId) {
          const label = document.querySelector(`[for="${intutId}"]`)
          label.textContent = event.target.value;
        }
      });
    });
  }
}
