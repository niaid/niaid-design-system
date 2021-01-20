(function($) {
    function initComponentMedia(context = document) {
        if (document.querySelectorAll('.materialboxed').length) {
            var elems = document.querySelectorAll('.materialboxed');
            var instances = M.Materialbox.init(elems);
        }
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initComponentMedia = {
                attach: function(context) {
                    $("body", context).once('nds-component-media').each(function() {
                        initComponentMedia(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initComponentMedia();
        });
    }
})(jQuery);