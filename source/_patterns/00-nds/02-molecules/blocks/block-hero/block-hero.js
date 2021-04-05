(function($) {
    function initBlockHero(context = document) {
        if (document.querySelectorAll('.parallax').length) {
            var elems = document.querySelectorAll('.parallax');
            var instances = M.Parallax.init(elems);
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