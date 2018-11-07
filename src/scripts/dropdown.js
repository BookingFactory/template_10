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

  onToggleClick(event) {
    event.preventDefault();
    this.dropdown.classList.add('opened');
  }

  onBackdropClick() {
    Array.from(document.querySelectorAll('.dropdown')).forEach((dropdown) => {
      dropdown.classList.remove('opened');
    });
  }
}