$(document).ready(function() {
    var mql = window.matchMedia('all and (min-width: 992px)');
    var wWidth = $(window).width();

    $('.fixed-left').each(function() {
        if (mql.matches) {
            stickybits($(this).find('.navigation--mobile-rail'));
        }
    });

    $(window).on('resize', function() {
        if (wWidth != $(this).width()) {
            wWidth = $(this).width();
            $('.fixed-left').each(function() {
                if (mql.matches) {
                    stickybits($(this).find('.navigation--mobile-rail'));
                }
                else {
                    stickybits($(this).find('.navigation--mobile-rail')).cleanup();
                    $(this).find('.navigation--mobile-rail').css('position', 'relative');
                }
            });
        }
    });
});