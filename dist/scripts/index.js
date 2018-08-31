document.addEventListener("DOMContentLoaded", (event) => {
  new NavBar();
  new Dropdown('lang-menu');
  new Dropdown('currency-menu');
  new Dropdown('lang-menu-mobile');
  new Dropdown('currency-menu-mobile');
  new TextFielsdSetup(document.querySelectorAll('textarea'));
  new TextFielsdSetup(document.querySelectorAll('input[type="text"]'));
  new Contacts();
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
