/* Scrolling
-------------------------------------------------------*/
var $window = $(window);

$window.scroll(function() {
    scrollToTop();
});

/* Scrolling
-------------------------------------------------------*/
$(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 0
    }, 500);
});

/* Show badge scroll top
-------------------------------------------------------*/
function scrollToTop() {
    var scroll = $window.scrollTop();
    var $backToTop = $("#back-to-top");
    if (scroll >= 100) {
        $backToTop.addClass("show");
    } else {
        $backToTop.removeClass("show");
    }
}