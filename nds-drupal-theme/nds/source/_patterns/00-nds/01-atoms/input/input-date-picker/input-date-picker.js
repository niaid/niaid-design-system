(function($) {
    function initInputDatePicker(context = document) {
        $('.input--date-picker').each(function() {
            if ($(this).find('input').attr('nds-date-picker') == 'true') {
                $(this).find('input').datepicker();
            }
        });
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