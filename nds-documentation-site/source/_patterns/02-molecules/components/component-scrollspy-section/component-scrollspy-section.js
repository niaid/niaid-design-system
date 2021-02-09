(function($) {
    function initComponentScrollspySection(context = document) {
        if ($('.scrollspy').length) {
            $('.scrollspy').scrollSpy({scrollOffset: "0"});
        }
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initComponentScrollspySection = {
                attach: function(context) {
                    $('body', context).once('nds-component-scrollspy-section').each(function() {
                        initComponentScrollspySection(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initComponentScrollspySection();
        });
    }
})(jQuery);