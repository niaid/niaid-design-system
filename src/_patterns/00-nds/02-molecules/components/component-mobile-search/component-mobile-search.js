var moduleNDS_mobileSearch = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // initMobileSearch - Initializes the mobile search functionality.
    function initMobileSearch() {
        document.querySelector('#component--mobile-search--open').addEventListener("click", function(e) {
            document.querySelector('.component--mobile-search__wrapper').style.display = "flex";
        });

        document.querySelector('#component--mobile-search--close').addEventListener("click", function(e) {
            document.querySelector('.component--mobile-search__wrapper').style.display = "none";
        });
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initMobileSearch();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
        init: init
    };
}());