$(document).ready(function() {
    var mql = window.matchMedia('all and (min-width: 992px)');
    var wWidth = $(window).width();

    $('.fixed-left').each(function() {
        if (mql.matches) {
            stickybits($(this).find('.layouts--main__first'));
        }
    });

    $(window).on('resize', function() {
        if (wWidth != $(this).width()) {
            wWidth = $(this).width();
            $('.fixed-left').each(function() {
                if (mql.matches) {
                    stickybits($(this).find('.layouts--main__first'));
                }
                else {
                    stickybits($(this).find('.layouts--main__first')).cleanup();
                    $(this).find('.layouts--main__first').css('position', 'relative');
                }
            });
        }
    });
});