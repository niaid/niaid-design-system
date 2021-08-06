var moduleNDS_navigationLocal = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // initializeNavigationLocal - Adds keyboard support for the local navigation component.
    function initializeNavigationLocal() {
        let localNavigationItems = document.querySelectorAll('.card-header');
        for (let i = 0; i < localNavigationItems.length; i++) {
            localNavigationItems[i].addEventListener('keydown', function(e) {
                if (e.code === "Enter" || e.keyCode === "13" || e.code === "Space" || e.keyCode === "23") {
                    e.target.click();
                }
            });
        }

        jQuery('.navigation--local').each(function() {
            if (jQuery(this).attr('data-sticky') == "true") { 
                stickyElement(".navigation--local", 0, "all and (min-width: 992px)");
            }
        });
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initializeNavigationLocal();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());