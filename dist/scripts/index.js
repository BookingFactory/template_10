document.addEventListener("DOMContentLoaded", (event) => {
  new NavBar();
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
