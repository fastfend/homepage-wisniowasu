import './team.scss';
import vanillatilt from 'vanilla-tilt';
import scrollreveal from 'scrollreveal';
import smoothscroll from 'smoothscroll-polyfill';
import DeviceDetector from 'device-detector-js';
smoothscroll.polyfill();

function getCard(element) {
  if (element.classList.contains('human-card')) {
    return element;
  }
  if (element.parentNode !== null) {
    var owner = element.parentNode;

    while (owner !== document.body) {
      if (
        owner !== null &&
        owner.classList.length > 0 &&
        owner.classList.contains('human-card')
      ) {
        return owner;
      }
      owner = owner.parentNode;
    }
  }

  return null;
}

function work() {
  var isMobile = false;
  const deviceDetector = new DeviceDetector();
  var device = deviceDetector.parse(navigator.userAgent);
  if (
    device.device.type === 'tablet' ||
    device.device.type === 'smartphone'
  ) {
    isMobile = true;
  }
  var isEdge = window.navigator.userAgent.indexOf('Edge') > -1;
  var items = document.querySelectorAll('.human-card');
  var lastopened = null;

  function onClick() {
    return function () {
      if (this.classList.contains('open')) {
        this.classList.remove('disp');
        this.classList.remove('open');
      } else {
        this.classList.add('disp');
        this.classList.add('open');
        if (lastopened !== null && lastopened !== this) {
          lastopened.classList.remove('disp');
          lastopened.classList.remove('open');
        }
        lastopened = this;
        if (isMobile) {
          this.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
            inline: 'center',
          });
        }
      }
    };
  }

  function onLeave() {
    return function () {
      this.classList.remove('disp');
      this.classList.remove('open');
    };
  }

  for (var i = 0; i < items.length; i++) {
    items[parseInt(i, 10)].addEventListener('click', onClick());
    items[parseInt(i, 10)].addEventListener('mouseleave', onLeave());
  }

  if (!isMobile & !isEdge) {
    vanillatilt.init(items, {
      reverse: true, // reverse the tilt direction
      max: 10, // max tilt rotation (degrees)
      perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
      speed: 1000, // Speed of the enter/exit transition
      transition: true, // Set a transition on enter/exit.
      reset: true, // If the tilt effect has to be reset on exit.
      scale: 1.1,
    });
  }
  var card;
  window.onscroll = function () {
    if (isMobile) {
      try {
        var viewportwidth = window.innerWidth / 2;
        var viewportheight = window.innerHeight / 2;
        var elem = document.elementFromPoint(
          viewportwidth,
          viewportheight
        );
        var newcard = getCard(elem);

        if (newcard !== null) {
          if (card !== null && card.classList.contains('hover')) {
            card.classList.remove('hover');
          }
          card = newcard;
          if (
            document
              .querySelector('body')
              .classList.contains('nav-active') === false
          ) {
            card.classList.add('hover');
          }
        } else {
          if (card !== null && card.classList.contains('hover')) {
            card.classList.remove('hover');
            card.classList.remove('disp');
            card.classList.remove('open');
          }
        }
      } catch (ex) {
        console.log(ex);
      }
    }

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

  scrollreveal().reveal(items, {
    easing: 'ease-in-out',
    distance: '20px',
  });

  document.body.classList.add('nologo');
}

document.onload = work();
