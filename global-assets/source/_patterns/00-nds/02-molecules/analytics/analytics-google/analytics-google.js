// Part of NDS Lite
(function($) {
    // initDataAttributes - Adds Data Attributes to certain elements for Google Analytics tracking purposes.
    function initDataAttributes() {
        for (var i = 0; i < document.getElementsByClassName("layouts--body").length; i++) {
            let bodyAnchorLinks = document.getElementsByClassName("layouts--body")[i].querySelectorAll('a');
            setDataAttributes(bodyAnchorLinks, 'data-content', 'body-anchor-');
        }
        
        for (var i = 0; i < document.getElementsByClassName("navigation--primary").length; i++) {
            let navigationLinks = document.getElementsByClassName("navigation--primary")[i].querySelectorAll('a');
            setDataAttributes(navigationLinks, 'data-nav', 'header-nav-');
        }

        for (var i = 0; i < document.getElementsByClassName("global--header").length; i++) {
            let logoLinks = document.getElementsByClassName("global--header")[i].querySelectorAll('.component--branding');
            for (var i = 0; i < logoLinks.length; i++) {
                logoLinks[i].setAttribute('data-nav', 'header-nav-logo');
            }
        }

        for (var i = 0; i < document.getElementsByClassName("global--footer").length; i++) {
            let navigationLinks = document.getElementsByClassName("global--footer")[i].querySelectorAll('a');
            setDataAttributes(navigationLinks, 'data-nav', 'footer-nav-');
            
            let logoLinks = document.getElementsByClassName("global--footer")[i].querySelectorAll('.image--logo');
            for (var i = 0; i < logoLinks.length; i++) {
                logoLinks[i].setAttribute('data-nav', 'footer-nav-logo');
            }
        }

        for (var i = 0; i < document.getElementsByClassName("component--accordion__card").length; i++) {
            let navigationLinks = document.getElementsByClassName("component--accordion__card")[i].querySelectorAll('button');
            setDataAttributes(navigationLinks, 'data-content', 'accordion-');
        }
    }

    // setDataAttributes - Helper function to add data attributes to elements.
    function setDataAttributes(els, dataAttributeName, dataAttributeValuePrefix) {
        for (var i = 0; i < els.length; i++) {
            var linkText = els[i].textContent.trim();
            if (linkText !== "") {
                linkText = linkText.replace(/\//g, '-');
                linkText = linkText.replace(/\s+/g, '-').toLowerCase();
                els[i].setAttribute(dataAttributeName, dataAttributeValuePrefix + linkText);
            }
        }
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initDataAttributes = {
                attach: function(context) {
                    $("body", context).once('nds-data-attributes').each(function() {
                        initDataAttributes(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initDataAttributes();
        });
    }
})(jQuery);