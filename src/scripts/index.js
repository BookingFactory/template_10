import autosize from 'autosize';
import flatpickr from 'flatpickr';

import NavBar from './navbar';
import Contacts from './contacts';
import Dropdown from './dropdown';
import BookForm from './book-form';
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
  new BookForm('bookForm');
  new DatePickers();
  new TextFielsdSetup(document.querySelectorAll('textarea'));
  new TextFielsdSetup(document.querySelectorAll('input[type="text"]'));
  new TextFielsdSetup(document.querySelectorAll('input[type="email"]'));

  Array.from(document.querySelectorAll('.dropdown')).forEach((dropdown) => {
    new Dropdown(dropdown);
  });
  carouselsSetup();

  flatpickr("#from", {});
  flatpickr("#to", {});

  autosize(document.querySelectorAll('textarea'));
}

// ?dateFrom=2018-11-29&nights=4#/choose-room


