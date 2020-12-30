(function($) {
    function initLinkExternal(context = document) {
        let externalLinks = document.querySelectorAll('a');
        for (var i = 0; i < externalLinks.length; i++) {
            if (externalLinks[i].innerHTML != "") {
                let url = externalLinks[i].getAttribute('href');
                let hostname = externalLinks[i].hostname;
                if (url && hostname !== location.hostname) {
                    url = url.toLowerCase();
                    if (((url.indexOf('http://') > -1) || (url.indexOf('https://')) > -1) && (url.indexOf('localhost:3002') <= 0)) {
                        externalLinks[i].setAttribute('target', '_blank');
                        var linkIcon = document.createElement('a');
                        linkIcon.setAttribute('href', url);
                        linkIcon.setAttribute('class', "ext-link-icon");
                        linkIcon.setAttribute('aria-label', "External Link");
                        externalLinks[i].insertAdjacentElement('afterend', linkIcon);
                    }
                }
            }
        }
    }
    function initLinkExternalMailto(context = document) {
        let mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
        for (var i = 0; i < mailtoLinks.length; i++) {
            mailtoLinks[i].classList.add('link--external--mail');   
        }
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