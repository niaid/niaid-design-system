(function($) {
    function initComponentLocalNavigation(context = document) {
        $('.card-header', context).keypress(function(e) {
            if (e.which == 13) {
                $(this).click();
            }
        });
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initComponentLocalNavigation = {
                attach: function(context) {
                    $("body", context).once('nds-component-local-navigation').each(function() {
                        initComponentLocalNavigation(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initComponentLocalNavigation();
        });
    }
})(jQuery);