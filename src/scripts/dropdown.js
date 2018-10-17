export default class Dropdown {
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