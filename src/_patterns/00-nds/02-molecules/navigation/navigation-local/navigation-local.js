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
                stickyElement(".navigation--local", jQuery('body').hasClass('style--hero') ? 32 : 0, "all and (min-width: 992px)");
            }
        });

        jQuery('.card-header').on('click', function() {
            if (jQuery(this).attr('data-bs-toggle') != "") {
                let $newlyOpened = jQuery(this);
                let headerLevel = $newlyOpened.attr('class').split('level-')[1][0];
                let targetLevel = ".level-" + headerLevel;
                jQuery(targetLevel).each(function($newlyOpened) {
                    if (!$(this).is($newlyOpened)) {
                        console.log($(this));
                        closeMenuItem($(this));
                    }
                }); 
            }
        });
    }

    function closeMenuItem($item) {
        if ($item != undefined || $item != null) {
            console.log("Close Item");
            console.log($item);
            $item.attr('aria-expanded', 'false').removeClass('collapsed');
            let dataTargetValue = $item.attr('data-bs-target');
            console.log(dataTargetValue);
            // let targetID = dataTargetValue.replace('#', '');
            // jQuery(targetID).removeClass('show');
        }
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