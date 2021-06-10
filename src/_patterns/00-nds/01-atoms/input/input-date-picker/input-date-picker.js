// Dependencies
//  - Bootstrap Datepicker
//  - jQuery

var moduleNDS_datepicker = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // initInputDatePicker - Initializes the Date Picker component through the Bootstrap Datetimepicker library.
    function initInputDatePicker() {
        jQuery('.input--date-picker').each(function() {
            if (jQuery(this).find('input').attr('nds-date-picker') == 'true') {
                jQuery(this).find('input').datepicker();
            }
        });
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initInputDatePicker();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());