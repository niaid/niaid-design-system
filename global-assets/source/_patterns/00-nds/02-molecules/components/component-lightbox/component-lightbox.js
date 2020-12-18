(function($) {
    function initComponentLightbox(context = document) {
        if ($('.materialboxed').length) {
            var elems = document.querySelectorAll('.materialboxed');
            var instances = M.Materialbox.init(elems);
        }
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initComponentLightbox = {
                attach: function(context) {
                    $("body", context).once('nds-component-lightbox').each(function() {
                        initComponentLightbox(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initComponentLightbox();
        });
    }
})(jQuery);