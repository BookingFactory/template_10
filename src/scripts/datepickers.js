export default class DatePickers {
  constructor() {
    this.isMobile = this.testUserAgent();
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

  testUserAgent() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
  }
}