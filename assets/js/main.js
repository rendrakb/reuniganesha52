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

//nav button 

function toggleMenu() {
    var menu = document.getElementById("myNavMenu");
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
        document.addEventListener("click", closeMenu);
    } else {
        menu.style.display = "none";
        document.removeEventListener("click", closeMenu);
    }
}

function closeMenu(event) {
    var menu = document.getElementById("myNavMenu");
    var button = document.getElementById("myNavBtn");
    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.style.display = "none";
        document.removeEventListener("click", closeMenu);
    }
}