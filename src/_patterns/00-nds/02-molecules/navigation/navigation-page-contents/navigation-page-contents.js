$(document).ready(function() {
    let headings = $('.layouts--body').children('h2');
    let $tocList = $('.navigation--page-contents__list');
    for (let i = 0; i < headings.length; i++) {
        let headingID = 'scrollspy-section-' + $(headings[i]).text();
        headingID = headingID.replace(/\//g, '-');
        headingID = headingID.replace(/\s+/g, '-').replace('&', 'and').toLowerCase();
        $tocList.append('<li class="navigation--page-contents__list__item"><a href="#' + headingID + '">' + $(headings[i]).text() + '</a></li>');
        $(headings[i]).nextUntil("h2").addBack().wrapAll('<div id="' + headingID + '" class="component-nds component--scrollspy-section scrollspy section">');
    }
    $('.scrollspy').scrollSpy();

    if ($(".navigation--page-contents").length) {
        var mql = window.matchMedia('all and (min-width: 992px)');
        var wWidth = $(window).width();

        $('.layouts--main').each(function() {
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
    }
});