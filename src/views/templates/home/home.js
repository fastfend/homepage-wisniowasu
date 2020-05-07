import './home.scss';
import vanillatilt from 'vanilla-tilt';
import scrollreveal from 'scrollreveal';
import DeviceDetector from 'device-detector-js';

// initiate as false
const deviceDetector = new DeviceDetector();
deviceDetector.parse(navigator.userAgent);
var isMobile = !deviceDetector.isDesktop;

if (!isMobile) {
  vanillatilt.init(document.querySelector('#logo'), {
    reverse: true, // reverse the tilt direction
    max: 10, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    reset: true, // If the tilt effect has to be reset on exit.
    'full-page-listening': true,
  });
}

window.onscroll = function () {
  var viewH = window.innerHeight;
  var scrollPosition = document.scrollingElement.scrollTop;
  var body = document.body;

  if (scrollPosition / viewH > 0.7) {
    body.classList.add('nav-bg');
  } else {
    if (body.classList.contains('nav-bg')) {
      body.classList.remove('nav-bg');
    }
  }
};

var items = document.querySelectorAll('.card');
var items2 = document.querySelectorAll('.minicard');
var items3 = document.querySelectorAll('.button');
scrollreveal().reveal(items, {
  easing: 'ease-in-out',
  distance: '20px',
});
scrollreveal().reveal(items2, {
  easing: 'ease-in-out',
  distance: '20px',
});
scrollreveal().reveal(items3, {
  easing: 'ease-in-out',
  distance: '20px',
});
