import "../scss/main.scss";
import "../scss/menu.scss";

import "progressive-image.js";
import "lazysizes";

var app = function () {
    var body = null;
    var menu = null;
    var menuItems = null;
    var enableMenu = function enableMenu(element) {
        if (!element.classList.contains("nav-active")) {
            element.classList.add("nav-active");
            window.sessionStorage.setItem("wisniowasu-menulastopened", true);
            window.sessionStorage.setItem("wisniowasu-menulasttimetopened", Date.now());
        }

    };
    var disableMenu = function disableMenu(element) {
        if (element.classList.contains("nav-active")) {
            element.classList.remove("nav-active");
            window.sessionStorage.setItem("wisniowasu-menulastopened", false);
        }

    };
    var toggleClass = function toggleClass(element) {
        if (element.classList.contains("nav-active")) {
            disableMenu(element);
        } else {
            enableMenu(element);
        }

    };
    var applyListeners = function applyListeners() {
        menu.addEventListener("click", function () {
            var x = document.querySelectorAll(".hover");
            if (x !== null) {
                x.forEach((element) => {
                    element.classList.remove("hover");
                });
            }

            return toggleClass(body);
        });
        window.addEventListener("click", function (e) {
            var x = document.getElementsByClassName("nav");
            if (!(x[0].contains(e.target) || menu.contains(e.target))) {
                return disableMenu(body);
            }
        });
    };
    var init = function init() {
        body = document.querySelector("body");
        menu = document.querySelector(".menu-icon");
        menuItems = document.querySelectorAll(".nav__list-item");
        var opened = JSON.parse(window.sessionStorage.getItem("wisniowasu-menulastopened"));
        var diff = Date.now() - JSON.parse(window.sessionStorage.getItem("wisniowasu-menulasttimetopened"));
        var seconds = Math.floor(diff / (1000));
        if (opened && seconds < 120) {
            //enableMenu(body);
        }
        applyListeners();

    };
    init();
}();