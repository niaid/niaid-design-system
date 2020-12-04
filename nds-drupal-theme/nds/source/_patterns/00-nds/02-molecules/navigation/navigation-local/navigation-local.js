(function($) {
    function initNavigationLocal(context = document) {
        if ($('.navigation--local').length) {
            $('.navigation--local__group__label', context).keypress(function(e) {
                if (e.which == 13) {
                    $(this).click();
                }
            });
        }
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initNavigationLocal = {
                attach: function(context) {
                    $(".page", context).once('nds-local-navigation').each(function() {
                        initNavigationLocal(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initNavigationLocal();
        });
    }
})(jQuery);