import './contact.scss';

import scrollreveal from 'scrollreveal';
var items = document.querySelectorAll('.service-card');
scrollreveal().reveal(items, {
  easing: 'ease-in-out',
  distance: '20px',
});

document.body.classList.add('nologo');
window.onscroll = function () {
  var scrollPosition = document.scrollingElement.scrollTop;
  var body = document.body;

  if (scrollPosition > 170) {
    body.classList.add('nav-bg');
  } else {
    if (body.classList.contains('nav-bg')) {
      body.classList.remove('nav-bg');
    }
  }
};

const form = document.getElementById('form');
const modal = document.getElementById('modal');
const overlay = document.getElementById('modal_overlay');
const closeButton = document.getElementById('modal_close_btn');

function sendMail(e) {
  e.preventDefault();

  const form = {};
  form.from = 'Formularz kontaktowy WiFI 2021';
  form.name = e.target.name.value;
  form.title = e.target.subject.value;
  form.email = e.target.email.value;
  form.message = e.target.message.value;

  fetch('https://api.wisniowasu.pl/mailer/sendmail', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .then((response) => response.text())
    .then((data) => handleResponse(data));

  overlay.classList.add('active');
}

function handleResponse(res) {
  const iconSuccess = document.getElementById(
    'js_modal_icon_success'
  );
  const iconFail = document.getElementById('js_modal_icon_fail');
  const header = document.getElementById('js_modal_header');
  const message = document.getElementById('js_modal_message');

  console.log(res);
  if (res === 'OK') {
    iconSuccess.classList.add('active');
    iconFail.classList.remove('active');
    header.innerHTML = 'Poszło!';
    message.innerHTML = 'Dzięki za kontakt! Odezwiemy się wkrótce ;)';
  } else {
    iconFail.classList.add('active');
    iconSuccess.classList.remove('active');
    header.innerHTML = 'Ups...';
    message.innerHTML =
      'Coś poszło nie tak. Spróbuj ponownie później';
  }

  modal.classList.add('active');
  overlay.addEventListener('click', closeModal);
}

function closeModal() {
  modal.classList.remove('active');
  overlay.classList.remove('active');
  overlay.removeEventListener('click', closeModal);
}

form.addEventListener('submit', sendMail);
closeButton.addEventListener('click', closeModal);
