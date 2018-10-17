export default class Contacts {
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