export default class Dropdown {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.toggle = dropdown.querySelector(`.dropdown-toggle`);
    this.backdrop = dropdown.querySelector(`.dropdown-backdrop`);

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