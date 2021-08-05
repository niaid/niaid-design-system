// Dependencies
//  - jQuery
//  - Materialize
//  - Stickybits

var moduleNDS_pageContents = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // initPageContents - Initializes the Page Contents functionality.
    function initPageContents() {
        let wWidth = windowWidth();
        let initialized = false;
        
        if (wWidth > 991) {
            initialized = true;
            computePageContents();
        }

        window.onresize = function(e) {
            if (!initialized && wWidth != windowWidth()) {
                wWidth = windowWidth();
                if (wWidth > 991) {
                    initialized = true;
                    computePageContents();
                }
            }
        };
    }

    // computePageContents - Computes the sections of a page from available H2's.
    function computePageContents() {
        let headings = $('.layouts--body').children('h2');
        let $tocList = $('.navigation--page-contents__wrapper__list');
        for (let i = 0; i < headings.length; i++) {
            let headingID = 'scrollspy-section-' + $(headings[i]).text();
            let dataNavValue = moduleNDS_analytics.formatAttributeValue(headings[i]);
            headingID = headingID.replace(/\//g, '-');
            headingID = headingID.replace(/\s+/g, '-').replace('&', 'and').toLowerCase();
            $tocList.append('<li class="navigation--page-contents__wrapper__list__item"><a href="#' + headingID + '" data-nav="nav-right-' + dataNavValue + '">' + $(headings[i]).text() + '</a></li>');
            $(headings[i]).nextUntil("h2").addBack().wrapAll('<div id="' + headingID + '" class="component-nds component--scrollspy-section scrollspy section">');
        }
        $('.scrollspy').scrollSpy();
        $('.navigation--page-contents').find('.icon--loader').hide();

        $('.navigation--page-contents').each(function() {
            if ($(this).attr('data-sticky') == "true") { 
                stickyElement(".navigation--page-contents", 0, "all and (min-width: 992px)");
            }
        });
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initPageContents();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());