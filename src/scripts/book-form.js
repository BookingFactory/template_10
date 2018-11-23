import flatpickr from 'flatpickr';

export default class Book {
  constructor() {
    this.form = document.querySelector('#bookForm');

    this.link = document.querySelector('#bookForm a');

    this.selectCheckInDate = this.selectCheckInDate.bind(this);
    this.onClick = this.onClick.bind(this);

    this.link.addEventListener('click', this.onClick);


    this.checkOut = flatpickr("#checkOut", {minDate: "today"});
    this.checkIn = flatpickr("#checkIn", { minDate: "today", onValueUpdate: [this.selectCheckInDate] });
  }

  onClick(event) {
    if(this.checkIn.selectedDates.length) {
      const timeDiff = Math.abs(this.checkOut.selectedDates[0] - this.checkIn.selectedDates[0]);
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      event.target.href = `${event.target.href}/?dateFrom=${this.form.checkIn.value}&nights=${nights}#/choose-room`;
    }
  }

  selectCheckInDate(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    const nextDay = selectedDate.setDate(selectedDate.getDate() + 1);

    this.checkOut.setDate(nextDay);
    if ("createEvent" in document) {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", false, true);
      this.checkOut.element.dispatchEvent(evt);
    }
    else
      this.checkOut.element.fireEvent("onchange");
  }
}