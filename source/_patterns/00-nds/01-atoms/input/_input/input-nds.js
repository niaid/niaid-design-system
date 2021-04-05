// Part of NDS Lite
(function($) {
    // initInputNDS - Functionality to support keyboard accessibility on radio and checkbox inputs.
    function initInputNDS(context = document) {
        let inputElements = document.querySelectorAll('.input--radio, .input--checkbox');
        for (let i = 0; i < inputElements.length; i++) {
            inputElements[i].addEventListener('keydown', function(e) {
                if (e.code === "Enter" || e.keyCode === "13" || e.code === "Space" || e.keyCode === "23") {
                    e.target.querySelector('input').click();
                }
            });
        }
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initInputNDS = {
                attach: function(context) {
                    $("body", context).once('nds-input').each(function() {
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