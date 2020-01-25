import "./forstudent.scss";

import scrollreveal from "scrollreveal";
var items = document.querySelectorAll(".service-card");
scrollreveal().reveal(items, {
    easing: "ease-in-out",
    distance: "20px"

});

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