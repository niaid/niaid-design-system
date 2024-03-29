// Dependencies
//  - jQuery

var moduleNDS_mobileSearch = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // initMobileSearch - Initializes the mobile search functionality.
    function initMobileSearch() {
        if (jQuery('.component--mobile-search').length > 0) {
            document.querySelector('#component--mobile-search--open').addEventListener("click", function(e) {
                openMobileSearch();
            });

            document.querySelector('#component--mobile-search--close').addEventListener("click", function(e) {
                closeMobileSearch();
            });

            window.addEventListener('resize', function() {
                if (viewportIsMobile && viewportWidthIsDifferent) {
                    closeMobileSearch();
                }
            });

            // 508 Compliance Focus Helpers
            jQuery('.skip-to--search').on("focus", function(e) {
                jQuery('.component--mobile-search__wrapper__search-form').find('input.input--text').focus();
            });
            jQuery('.skip-to--close').on("focus", function(e) {
                jQuery('#component--mobile-search--close').focus();
            });
        }
    }

    /* =================== PUBLIC METHODS ================== */
    // openMobileSearch - Displays the mobile search bar.
    function openMobileSearch() {
        document.querySelector('.component--mobile-search__wrapper').style.display = "flex";
        jQuery('.component--mobile-search__wrapper__search-form').find('input.input--text').focus();
    }

    // closeMobileSearch - Hides the mobile search bar.
    function closeMobileSearch() {
        document.querySelector('.component--mobile-search__wrapper').style.display = "none";
        jQuery('#component--mobile-search--open').focus();
    }

    function init() {
        initMobileSearch();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
        init: init,
        openMobileSearch: openMobileSearch,
        closeMobileSearch: closeMobileSearch
    };
}());