$(document).ready(function() {
    var mql = window.matchMedia('all and (min-width: 992px)');
    var wWidth = $(window).width();

    $('.fixed-right').each(function() {
        if (mql.matches) {
            stickybits($(this).find('.navigation--page-contents'), { stickyBitStickyOffset: 32 });
        }
    });

    $(window).on('resize', function() {
        if (wWidth != $(this).width()) {
            wWidth = $(this).width();
            $('.fixed-right').each(function() {
                if (mql.matches) {
                    stickybits($(this).find('.navigation--page-contents'), { stickyBitStickyOffset: 32 });
                }
                else {
                    stickybits($(this).find('.navigation--page-contents')).cleanup();
                    $(this).find('.navigation--page-contents').css('position', 'relative');
                }
            });
        }
    });
});