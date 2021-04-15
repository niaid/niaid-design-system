// Part of NDS Lite
(function($) {
    // initComponentUSWDSBanner - Toggles the USWDS Banner Component open and closed.
    function initComponentUSWDSBanner() {
        if (document.querySelectorAll('#uswds-banner-toggle').length > 0) {
            document.querySelector('#uswds-banner-toggle').addEventListener("click", function(e) {
                if (document.getElementById("uswds-banner-toggle").getAttribute('aria-expanded') == 'true') {
                    document.getElementById("uswds-banner-toggle").setAttribute('aria-expanded','false');
                    document.getElementById("uswds-banner-content").style.display = 'none';
                }
                else {
                    document.getElementById("uswds-banner-toggle").setAttribute('aria-expanded','true');
                    document.getElementById("uswds-banner-content").style.display = 'block';
                }
            });
        }
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initComponentUSWDSBanner = {
                attach: function(context) {
                    $("body", context).once('nds-component-uswds-banner').each(function() {
                        initComponentUSWDSBanner(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initComponentUSWDSBanner();
        });
    }
})(jQuery);