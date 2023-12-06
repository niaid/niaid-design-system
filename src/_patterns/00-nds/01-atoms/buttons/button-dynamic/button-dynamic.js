var moduleNDS_buttonDynamic = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    function initializeButtonDynamic() {
        jQuery('.button--dynamic').each(function() {
            jQuery(this).on('click', function() {
                const buttonDynamicPrev = jQuery(this).text();
                const buttonDynamicInactive = jQuery(this).attr('data-button-inactive');
                const buttonDynamicActive = jQuery(this).attr('data-button-active');
                jQuery(this).text(
                    buttonDynamicPrev == buttonDynamicActive ? buttonDynamicInactive : buttonDynamicActive
                );
            });
        });
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initializeButtonDynamic();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());