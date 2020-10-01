(function($) {
    function initBlockHero(context = document) {
        if ($('.parallax').length) {
            $('.parallax').parallax();
        }
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initBlockHero = {
                attach: function(context) {
                    $('body', context).once('nds-block-hero').each(function() {
                        initBlockHero(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initBlockHero();
        });
    }
})(jQuery);