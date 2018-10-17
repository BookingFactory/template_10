import autosize from 'autosize';
import flatpickr from 'flatpickr';

import NavBar from './navbar';
import Contacts from './contacts';
import Dropdown from './dropdown';
import carouselsSetup from './carousels';
import DatePickers from './datepickers';
import TextFielsdSetup from './textfieldsetup';
// import loadDeferredStyles from './loadDeferredStyles';

// document.addEventListener("DOMContentLoaded", (event) => {
//   loadDeferredStyles();
// });

document.addEventListener("TemplateLoaded", (event) => {
  new NavBar();
  new Contacts();
  new DatePickers();
  new TextFielsdSetup(document.querySelectorAll('textarea'));
  new TextFielsdSetup(document.querySelectorAll('input[type="text"]'));

  Array.from(document.querySelectorAll('.dropdown')).forEach((dropdown) => {
    new Dropdown(dropdown.id);
  });
  carouselsSetup();

  flatpickr("#checkIn", {});
  flatpickr("#checkOut", {});
  flatpickr("#from", {});
  flatpickr("#to", {});

  autosize(document.querySelectorAll('textarea'));
});
