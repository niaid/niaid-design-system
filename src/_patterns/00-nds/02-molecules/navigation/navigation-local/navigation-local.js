(function($) {
    function init_local_nav(context) {
        $('.card-header', context).keypress(function(e) {
            if (e.which == 13) {
                $(this).click();
            }
        });
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initLocalNav = {
                attach: function(context) {
                    $(".page", context).once('niaid-local-navigation').each(function() {
                        init_local_nav(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            init_local_nav();
        });
    }
})(jQuery);