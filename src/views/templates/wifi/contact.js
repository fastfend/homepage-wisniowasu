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

var form = document.getElementById('form');

function sendMail(e) {
  e.preventDefault();
  let form = {
    name,
    subject,
    email,
    message,
  }

  form.name = e.target.name.value;
  form.title = e.target.subject.value;
  form.email = e.target.email.value;
  form.message = e.target.message.value;

  fetch("https://api.wisniowasu.pl/mailer/sendmail", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form),
		});
}

form.addEventListener('submit', sendMail);
