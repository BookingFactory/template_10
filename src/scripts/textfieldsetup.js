export default class TextFielsdSetup {
  constructor(textFileds) {
    this.textFileds = Array.from(textFileds);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.textFileds.forEach(textFiled => textFiled.addEventListener('keyup', this.onKeyUp));
  }

  onKeyUp(event) {
    (event.target.value) ? event.target.classList.add('dirty') : event.target.classList.remove('dirty');
  }
}