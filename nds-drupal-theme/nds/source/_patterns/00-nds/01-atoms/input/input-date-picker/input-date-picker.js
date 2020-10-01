(function($) {
    function initInputDatePicker(context = document) {
        if ($('.input--date-picker').length) {
            $('.input--date-picker').find('input').datepicker();
        }
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initInputDatePicker = {
                attach: function(context) {
                    $('body', context).once('nds-input-date-picker').each(function() {
                        initInputDatePicker(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initInputDatePicker();
        });
    }
})(jQuery);