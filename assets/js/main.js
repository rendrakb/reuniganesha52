//smooth scroll on in-page href click

$(document).ready(function () {
  $('a[href^="#"]').on("click", function (event)
  {var target = $(this.getAttribute("href"));
  if (target.length) {event.preventDefault();
      $("html, body").stop().animate({scrollTop: target.offset().top,},250);
    }
  });
});

//back to top button

function backTop() {
  $("html, body").animate({ scrollTop: 0 }, 250);
}

//nav button open when clicked

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

//nav button closed when clicked anything else

function closeMenu(event) {
  var menu = document.getElementById("nav-menu");
  var button = document.getElementById("nav-button");
  if (!menu.contains(event.target) && !button.contains(event.target)) {
    menu.style.display = "none";
    document.removeEventListener("click", closeMenu);
  }
}

//favicon rotation animation

document.addEventListener("DOMContentLoaded", function () {
  const favicon = document.getElementById("favicon");
  let angle = 0;

  function rotateFavicon() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = "assets/images/icon.svg";

    img.onload = function () {
      const size = 32;
      canvas.width = size;
      canvas.height = size;
      context.clearRect(0, 0, size, size);
      context.save();
      context.translate(size / 2, size / 2);
      context.rotate((angle * Math.PI) / 180);
      context.drawImage(img, -size / 2, -size / 2, size, size);
      context.restore();
      angle += 2;
      favicon.href = canvas.toDataURL("image/png");
    };
  }
  setInterval(rotateFavicon, 50);
});
