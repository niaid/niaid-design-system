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
                jQuery(this).addClass('hero-present');
                stickyElement(".navigation--local", 0, "all and (min-width: 992px)");
            }
        });

        jQuery('.card-header').on('click', function() {
            let attr = jQuery(this).attr('data-bs-toggle');
            if (typeof attr !== 'undefined' && attr !== false) {
                let newlyOpenedId = jQuery(this).attr('id');
                let headerLevel = jQuery(this).attr('class').split('level-')[1][0];
                let targetLevel = ".level-" + headerLevel;
                jQuery(targetLevel).each(function() {
                    let currentItemID = jQuery(this).attr('id');
                    if (typeof currentItemID !== 'undefined' && currentItemID !== false) {
                        if (currentItemID != newlyOpenedId) {
                            closeMenuItem(jQuery(this));
                        }
                    }
                }); 
            }
        });
    }

    // closeMenuItem - Closes a particular accordion within the local navigation.
    function closeMenuItem($item) {
        $item.attr('aria-expanded', 'false').removeClass('collapsed');
        let dataTargetValue = $item.attr('data-bs-target');
        jQuery(dataTargetValue).removeClass('show');
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