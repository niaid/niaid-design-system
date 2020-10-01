(function($) {
    function init_layouts_tabs(context) {
        $('#tab--mockup').attr('tabindex', '-1');
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.layoutsTabs = {
                attach: function(context) {
                    init_layouts_tabs(context);
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            init_layouts_tabs();
        });
    }
})(jQuery);