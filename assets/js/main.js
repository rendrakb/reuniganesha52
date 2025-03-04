// smoothscroll on href click
$(document).ready(function () {
  $('a[href^="#"]').on("click", function (event) {
    var target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body").stop().animate({ scrollTop: target.offset().top }, 250);
    }
  });
});

// back to top button
function backTop() {
  $("html, body").animate({ scrollTop: 0 }, 250);
}

// floating daftar button
$("#gform-button-floating").on("click", function (event) {
  event.preventDefault();
  $("html, body").animate({ scrollTop: $("#daftar").offset().top }, 250);
});

// navmenu toggle
function toggleMenu() {
  var menu = document.getElementById("nav-menu");
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
    document.addEventListener("click", closeMenu);
  } else {
    menu.style.display = "none";
    document.removeEventListener("click", closeMenu);
  }
}

function closeMenu(event) {
  var menu = document.getElementById("nav-menu");
  var button = document.getElementById("nav-button");
  if (!menu.contains(event.target) && !button.contains(event.target)) {
    menu.style.display = "none";
    document.removeEventListener("click", closeMenu);
  }
}

// slider initialization
function initializeSlider() {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  document.getElementById("next").addEventListener("click", function () {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].classList.add("active");
  });

  document.getElementById("prev").addEventListener("click", function () {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    slides[currentSlide].classList.add("active");
  });

  // show the first slide
  slides[currentSlide].classList.add("active");
}

// ensure the DOM is loaded before initializing sliders
document.addEventListener("DOMContentLoaded", function () {
  if (typeof initializeSlider === "function") {
    initializeSlider();
  }
});

// rekening copy button
window.copyText = function (inputId) {
  var copyText = document.getElementById(inputId);
  navigator.clipboard
    .writeText(copyText.value)
    .then(function () {
      alert("Teks tersalin: " + copyText.value);
    })
    .catch(function (error) {
      console.error("Eror dalam menyalin teks: ", error);
    });
};

//countdown
var countDownDate = new Date("Feb 28, 2025 18:00:00").getTime();

var countdownFunction = setInterval(function () {
  var now = new Date().getTime();

  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  var seconds = Math.floor((distance % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");

  document.getElementById("countdown").innerHTML =
    days +
    "&nbsp;: " +
    hours +
    "&nbsp;: " +
    minutes +
    "&nbsp;: " +
    seconds +
    "<br>" +
    "menuju Ramadan 2025";

  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerHTML = "Selamat Ramadan 2025";
  }
}, 1000);

//counter ??