(function($) {
    function initNavigationLocal(context = document) {
        var mql = window.matchMedia('all and (max-width: 990.0625rem)');
        var wWidth = $(window).width();
        if (mql.matches) {
            $("#localNavMobileTarget").collapse('hide');
        } else {
            $("#localNavMobileTarget").collapse('show');
        }

        $(window).resize(function() {
            if (wWidth != $(this).width()) {
                wWidth = $(this).width();
                if (mql.matches) {
                    $("#localNavMobileTarget").collapse('hide');
                } else {
                    $("#localNavMobileTarget").collapse('show');
                }
            }
        });
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initNavigationLocal = {
                attach: function(context) {
                    $('body', context).once('nds-navigation-local').each(function() {
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