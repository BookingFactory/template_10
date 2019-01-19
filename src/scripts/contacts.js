export default class Contacts {
  constructor() {
    var self = this;

    this.contacts = Array.from(document.querySelectorAll('.contacts .body'));
    this.toggles = Array.from(document.querySelectorAll('.contacts .body .button.toggle'));
    this.onClick = this.onClick.bind(this);
    this.toggles.forEach(toggle => toggle.addEventListener('click', this.onClick));
    this.contacts = Array.from(document.querySelectorAll('.contacts .body'));

    document.querySelector("#contact-form").addEventListener("submit", function(e){
      e.preventDefault();
      var f = new FormData(e.target);
      if (f.get('name') == '' ||
          f.get('email') == '' ||
          !(/(^\w.*@\w+\.\w)/.test(f.get('email'))) ||
          f.get('message')) {
        alert('Fill all fields before sending');
        return;
      };

      // if (f.get('g-recaptcha-response') == '' || f.get('g-recaptcha-response') == null) {
      //   alert('Complete recaptcha first');
      //   return;
      // }

      var btn =  e.target.querySelector('.footer-button');
      btn.disabled = true;

      var req = new XMLHttpRequest();

      req.onreadystatechange = function() {
        if (this.readyState == 0) { btn.disabled = false; }
        if (this.readyState == 4) {
          if (this.status == 200 || this.status == 403) {
              self.processContact(this.responseText);
          } else {
              alert('Error. Try again');
          }
          btn.disabled = false;
        }
      };
      req.open("POST", e.target.action);
      req.send(f);
    });
  }

  onClick(event) {
    this.contacts.forEach(body => body.classList.toggle('show'));
  }

  processContact(d) {
    var data = JSON.parse(d);
    alert(data['msg'] || 'Error');
  }
}