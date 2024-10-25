<<<<<<< HEAD
//smooth scroll on click

$(document).ready(function() {
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 500);
        }
    });
});


//back to top button

let mybutton = document.getElementById("myBtn");

//show button after some scroll

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

//scroll to top action when clicked

function topFunction() {
    $('html, body').animate({ scrollTop: 0 }, 500);
=======
//smooth scroll on click

$(document).ready(function() {
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 500);
        }
    });
});


//back to top button

let mybutton = document.getElementById("myBtn");

//show button after some scroll

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

//scroll to top action when clicked

function topFunction() {
    $('html, body').animate({ scrollTop: 0 }, 500);
>>>>>>> cbd37d8 (Initial commit)
}