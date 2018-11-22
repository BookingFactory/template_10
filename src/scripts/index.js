import autosize from 'autosize';
import flatpickr from 'flatpickr';

import NavBar from './navbar';
import Contacts from './contacts';
import Dropdown from './dropdown';
import ExtraMenu from './extra-menu';
import carouselsSetup from './carousels';
import DatePickers from './datepickers';
import TextFielsdSetup from './textfieldsetup';

import '../styles/index.scss'

if(window.templateLoaded) {
  main();
} else {
  document.addEventListener("TemplateLoaded", main);
}

function main() {
  new NavBar();
  new Contacts();
  new ExtraMenu();
  new DatePickers();
  new TextFielsdSetup(document.querySelectorAll('textarea'));
  new TextFielsdSetup(document.querySelectorAll('input[type="text"]'));
  new TextFielsdSetup(document.querySelectorAll('input[type="email"]'));

  Array.from(document.querySelectorAll('.dropdown')).forEach((dropdown) => {
    new Dropdown(dropdown);
  });
  carouselsSetup();

  const checkOut = flatpickr("#checkOut", {minDate: "today"});
  flatpickr("#checkIn", { minDate: "today", onValueUpdate: [function(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    checkOut.setDate(selectedDate.setDate(selectedDate.getDate() + 1));
    if ("createEvent" in document) {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", false, true);
      checkOut.element.dispatchEvent(evt);
    }
    else
      checkOut.element.fireEvent("onchange");
  }] });
  flatpickr("#from", {});
  flatpickr("#to", {});

  autosize(document.querySelectorAll('textarea'));
}


