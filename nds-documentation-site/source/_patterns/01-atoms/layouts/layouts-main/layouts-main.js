$(document).ready(function() {
    $('.fixed-left').each(function() {
        stickybits($(this).find('.layouts--main__first'));
    });
});