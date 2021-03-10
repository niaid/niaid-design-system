// Part of NDS Lite
(function($) {
    // initDataAttributes - Adds Data Attributes to certain elements for Google Analytics tracking purposes.
    function initDataAttributes() {

        // Generic Body
        let bodyLayouts = document.getElementsByClassName("layouts--body");
        for (var i = 0; i < bodyLayouts.length; i++) {
            let bodyElements = bodyLayouts[i].querySelectorAll('a, button');
            setDataAttributes(bodyElements, 'data-content', 'body-anchor-');
        }

        // Header
        let globalHeaders = document.getElementsByClassName("global--header");
        for (let i = 0; i < globalHeaders.length; i++) {
            // Branding Component
            let logoLinks = globalHeaders[i].querySelectorAll('.component--branding');
            for (let j = 0; j < logoLinks.length; j++) {
                logoLinks[j].setAttribute('data-nav', 'header-nav-logo');
            }

            // Generic
            let headerElements = globalHeaders[i].querySelectorAll('a, button');
            setDataAttributes(headerElements, 'data-nav', 'header-nav-');
        }

        // Primary Navigation
        let primaryNavigations = document.getElementsByClassName("navigation--primary");
        for (var i = 0; i < primaryNavigations.length; i++) {
            let navigationLinks = primaryNavigations[i].querySelectorAll('.navigation--primary__inner__item');
            for (let j = 0; j < navigationLinks.length; j++) {
                let navItem = navigationLinks[j].children[0];
                if (hasClass(navItem, 'navigation--dropdown')) {
                    let sectionName = navigationLinks[j].children[0].children[0].textContent.trim();
                    if (sectionName !== "") {
                        sectionName = sectionName.replace(/\//g, '-');
                        sectionName = sectionName.replace(/\s+/g, '-').toLowerCase();
                        let dropdownItems = navItem.querySelectorAll('.navigation--dropdown__menu > a');
                        setDataAttributes(dropdownItems, 'data-nav', 'header-nav-' + sectionName + '-');
                    }
                }
                else {
                    computeDataAttribute(navItem, 'data-nav', 'header-nav-');
                }
            }
        }

        // Footer
        let globalFooters = document.getElementsByClassName("global--footer");
        for (var i = 0; i < globalFooters.length; i++) {
            // Branding Component
            let logoLinks = globalFooters[i].querySelectorAll('.image--logo');
            for (var i = 0; i < logoLinks.length; i++) {
                logoLinks[i].setAttribute('data-nav', 'footer-nav-logo');
            }

            // Footer Links
            let navigationLinks = globalFooters[i].querySelectorAll('a, button');
            setDataAttributes(navigationLinks, 'data-nav', 'footer-nav-');
        }

        // Accordion Button
        let accordionCards = document.getElementsByClassName("component--accordion__card");
        for (var i = 0; i < accordionCards.length; i++) {
            let navigationLinks = accordionCards[i].querySelectorAll('button');
            setDataAttributes(navigationLinks, 'data-content', 'accordion-');
        }

        // Mobile Rail
        let mobileRails = document.getElementsByClassName("navigation--mobile-rail__content");
        for (var i = 0; i < mobileRails.length; i++) {
            let navigationLinks = mobileRails[i].querySelectorAll('a');
            setDataAttributes(navigationLinks, 'data-nav', 'nav-left-');
        }
    }

    // setDataAttributes - Helper function to add data attributes to elements.
    function setDataAttributes(els, dataAttributeName, dataAttributeValuePrefix) {
        if (els.length > 0 && els !== undefined) {
            for (let i = 0; i < els.length; i++) {
                if (els[i].hasAttribute(dataAttributeName)) {
                    tagChildren(els[i], dataAttributeName);
                }
                else {
                    computeDataAttribute(els[i], dataAttributeName, dataAttributeValuePrefix);
                }
            }
        }
    }

    function computeDataAttribute(el, dataAttributeName, dataAttributeValuePrefix) {
        var linkText = el.textContent.trim();
        if (linkText !== "") {
            linkText = linkText.replace(/\//g, '-');
            linkText = linkText.replace(/\s+/g, '-').toLowerCase();
            el.setAttribute(dataAttributeName, dataAttributeValuePrefix + linkText);
            tagChildren(el, dataAttributeName);
        }
        else {
            if (hasClass(el, 'button--share')) {
                let typeArray = el.classList[2].split('button--share--');
                let type = typeArray[typeArray.length - 1];
                let prefix = '';
                if (dataAttributeValuePrefix == "header-nav-") {
                    prefix = 'header-nav-social-share-';
                }
                else if (dataAttributeValuePrefix == "footer-nav-") {
                    prefix = 'footer-nav-social-share-';
                }
                else {
                    prefix = 'body-social-share-';
                }
                el.setAttribute(dataAttributeName, prefix + type);
                tagChildren(el, dataAttributeName);
            }
        }
    }

    function tagChildren(el, dataAttributeName) {
        let dataAttributeValue = el.getAttribute(dataAttributeName);
        let childElements = el.querySelectorAll('i, span, div, img, strong');
        for (let j = 0; j < childElements.length; j++) {
            childElements[j].setAttribute(dataAttributeName, dataAttributeValue);
        }
    }

    if (window.Element && !Element.prototype.closest) {
        Element.prototype.closest =
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i,
                el = this;
            do {
                i = matches.length;
                while (--i >= 0 && matches.item(i) !== el) {};
            } while ((i < 0) && (el = el.parentElement));
            return el;
        };
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