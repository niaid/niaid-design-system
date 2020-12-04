(function($) {
    function initInputNDS(context = document) {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        })
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initInputNDS = {
                attach: function(context) {
                    $('body', context).once('nds-input').each(function() {
                        initInputNDS(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initInputNDS();
        });
    }
})(jQuery);