(function($) {
    function initLinkExternal(context = document) {
        $('a:not(:has(img))').each(function() {
            var varText = $(this).text();
            if (varText) {
                var url = $(this).attr('href');
                var hostName = this.hostname;
                if (url && hostName !== location.hostname) {
                    url = url.toLowerCase();
                    if (((url.indexOf('http://') > -1) || (url.indexOf('https://')) > -1) &&
                        (url.indexOf('localhost:3002') <= 0)) {
                        $(this).attr('target', '_blank');
                        $(this).after('<a aria-label="Read More about External Link policy" class="ext-link-icon" href="#"></a>');
                    }
                }
            }
        });
    }
    function initLinkExternalMailto(context = document) {
        $('a[href^="mailto:"]').each(function() {
            $(this).addClass('link--external--mail');
        });
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initLinkExternal = {
                attach: function(context) {
                    $('body', context).once('nds-link-external').each(function() {
                        initLinkExternal(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initLinkExternal();
            initLinkExternalMailto();
        });
    }
})(jQuery);