import './wifi.scss';

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

var eventDate = new Date(2021, 8, 1, 8, 0);

function updateCountdownText() {
  var prefix = 'Czas do wydarzenia: ';
  var updatedText = prefix;
  var currentDate = new Date().getTime();

  var timeLeft = eventDate - currentDate;
  // var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  // var hours = Math.floor((timeLeft % days) / (1000 * 60 * 60));
  // var minutes = Math.floor((timeLeft % hours) / (1000 * 60));
  // var seconds = Math.floor((timeLeft % minutes) / (1000));
  var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeLeft % (1000 * 60)) / (1000));


  if (days > 2) {
    updatedText += days + ' dni';
  } else if (days > 0) {
    if (days === 1) {
      updatedText += days + ' dzień ' + hours + 'h ' + minutes + 'm'
    } else {
      updatedText += days + ' dni ' + hours + 'h ' + minutes + 'm';
    }
  } else if (hours > 0) {
    updatedText += hours + 'h ' + minutes + 'm ' + seconds + 's';
  } else if (minutes > 0) {
    updatedText += minutes + 'm ' + seconds + 's';
  } else {
    updatedText += seconds + 's';
  }

  document.getElementById('countdown').innerHTML = updatedText;

  // if (timeLeft < 0) {
  //   document.getElementById('countdown').innerHTML = 'nie wiem co tu napisac xd' 
  // }
}

updateCountdownText();
var countdownIntervalId = setInterval(updateCountdownText, 1000);
console.log(countdownIntervalId);
