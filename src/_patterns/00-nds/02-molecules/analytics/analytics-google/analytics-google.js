var moduleNDS_analytics = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // addDataAttributes - Adds Data Attributes to certain elements for Google Analytics tracking purposes.
    function addDataAttributes() {

        // Accordion Button
        let accordionCards = document.getElementsByClassName("component--accordion__card");
        for (var i = 0; i < accordionCards.length; i++) {
            let navigationLinks = accordionCards[i].querySelectorAll('button');
            setDataAttributes(navigationLinks, 'data-content', 'accordion-');
        }

        // Tabs
        let navigationTabs = document.getElementsByClassName("navigation--tabs");
        for (var i = 0; i < navigationTabs.length; i++) {
            let tabs = navigationTabs[i].querySelectorAll('.navigation--tabs__tab');
            setDataAttributes(tabs, 'data-content', 'nav-');
        }

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
                        let dropdownToggle = navItem.querySelectorAll('.navigation--dropdown__toggle');
                        setDataAttributes(dropdownToggle, 'data-nav', 'header-nav-' + sectionName + '-');
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
            for (var j = 0; j < logoLinks.length; j++) {
                logoLinks[j].setAttribute('data-nav', 'footer-nav-logo');
            }

            // Footer Links
            let navigationLinks = globalFooters[i].querySelectorAll('a, button');
            setDataAttributes(navigationLinks, 'data-nav', 'footer-nav-');
        }

        // Floating Buttons
        let floatingButtons = document.getElementsByClassName("button--floating");
        setDataAttributes(floatingButtons, 'data-nav', 'header-nav-');

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

    // computeDataAttribute - Helper function to determine the value of the data attribute.
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

    // tagChildren - Helper function to tag child elements of the target.
    function tagChildren(el, dataAttributeName) {
        let dataAttributeValue = el.getAttribute(dataAttributeName);
        let childElements = el.querySelectorAll('i, span, div, img, strong');
        for (let j = 0; j < childElements.length; j++) {
            childElements[j].setAttribute(dataAttributeName, dataAttributeValue);
        }
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        addDataAttributes();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());