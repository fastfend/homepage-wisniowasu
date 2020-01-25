import "./projects.scss";
import scrollreveal from "scrollreveal";
import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();

document.body.classList.add("nologo");
window.onscroll = function () {
    var scrollPosition = document.scrollingElement.scrollTop;
    var body = document.body;

    if (scrollPosition > 170) {
        body.classList.add("nav-bg");
    } else {
        if (body.classList.contains("nav-bg")) {
            body.classList.remove("nav-bg");
        }
    }
}


var enableMenu = function enableMenu(element) {
    if (!element.classList.contains("nav-active")) {
        element.classList.add("nav-active");
    }
}
var disableMenu = function disableMenu(element) {
    if (element.classList.contains("nav-active")) {
        element.classList.remove("nav-active");
    }
}
var toggleClass = function toggleClass(element) {
    if (element.classList.contains("nav-active")) {
        disableMenu(element);
    } else {
        enableMenu(element);
    }
};

var menuItems = document.querySelectorAll(".img_container");

scrollreveal().reveal(document.querySelectorAll(".container"), {
    easing: "ease-in-out",
    distance: "20px"
});

function checkOpen(element2) {
    var found = false;
    menuItems.forEach((element) => {
        if (element.parentNode.classList.contains("open") && element !== element2) {
            found = element;
        }
    });
    return found;
}

menuItems.forEach((element) => {
    element.onclick = function () {
        var lastopenened = checkOpen(element)
        if (lastopenened !== false) {
            lastopenened.parentNode.classList.remove("open");
        }
        if (element.parentNode.classList.contains("open")) {
            element.parentNode.classList.remove("open");
        } else {
            element.parentNode.classList.add("open");
            if (lastopenened !== false) {
                setTimeout(function () {
                    element.parentNode.scrollIntoView({
                        block: "center",
                        behavior: "smooth"
                    });
                }, 201)
            } else {
                element.parentNode.scrollIntoView({
                    block: "center",
                    behavior: "smooth"
                });
            }
        }

    };
});