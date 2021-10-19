// Dependencies
//  - jQuery
//  - Modernizr

var moduleNDS_featuredContentCards = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // initFeaturedContentCards - Initializes the polyfill for browswers that do not support Object Fit.
    function initFeaturedContentCards() {
        let featuredContentCards = document.getElementsByClassName("block--featured-content-card");
        if (featuredContentCards.length > 0) {
            if (!Modernizr.objectfit) {
                jQuery('.block--featured-content-card').each(function () {
                    let $container = jQuery(this).find('.block--featured-content-card__image');
                    let imgUrl = $container.find('img').prop('src');
                    if (imgUrl) {
                        $container.css('backgroundImage', 'url(' + imgUrl + ')').addClass('compat-object-fit');
                    }  
                });
            }
        }
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initFeaturedContentCards();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());