// Part of NDS Lite

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

        // Facets (Filters)
        let facets = document.getElementsByClassName("facet-item");
        for (var i = 0; i < facets.length; i++) {
            let facetLink = facets[i].querySelector('a');
            let facetLabel = facets[i].querySelector('label');
            let facetName = facets[i].querySelector('.facet-item__value').textContent.trim();
            if (facetName !== "") {
                facetName = facetName.replace(/\//g, '-');
                facetName = facetName.replace(/\s+/g, '-').toLowerCase();
                facetLink.setAttribute('data-content', 'filter-' + facetName);
                facetLabel.setAttribute('data-content', 'filter-' + facetName);
                tagChildren(facetLink, 'data-content');
                tagChildren(facetLabel, 'data-content');
            }

            // Filter Title
            let facetParent = facets[i].closest("ul.item-list__checkbox");
            if (facetParent != null) {
                let titleName = facetParent.getAttribute('data-drupal-facet-alias');
                if (titleName != null) {
                    facetLink.setAttribute('data-filter-title', titleName);
                    facetLabel.setAttribute('data-filter-title', titleName);
                    tagChildren(facetLink, 'data-filter-title');
                    tagChildren(facetLabel, 'data-filter-title');
                }
            }
        }

        // Primary Navigation
        let primaryNavigations = document.getElementsByClassName("navigation--primary");
        for (var i = 0; i < primaryNavigations.length; i++) {
            let navigationLinks = primaryNavigations[i].querySelectorAll('.navigation--primary__item');
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

        // Mobile Rail & Local Navigation
        let leftNavigation = document.querySelectorAll(".navigation--mobile-rail__content a, .navigation--local a");
        for (var i = 0; i < leftNavigation.length; i++) {
            let targetedNavigationLinks = [];
            if (!leftNavigation[i].hasAttribute('data-content')) {
                targetedNavigationLinks.push(leftNavigation[i]);    
            }
            setDataAttributes(targetedNavigationLinks, 'data-nav', 'nav-left-');
        }
    }

    // computeDataAttribute - Helper function to determine the value of the data attribute.
    function computeDataAttribute(el, dataAttributeName, dataAttributeValuePrefix) {
        var linkText = formatAttributeValue(el);
        if (linkText !== "") {
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

    // formatAttributeValue - Finds the text content of an element and formats the value for use in a data attribute.
    function formatAttributeValue(el) {
        let processedValue = el.textContent.trim();
        processedValue = processedValue.replace(/\//g, '-');
        processedValue = processedValue.replace(/\s+/g, '-').toLowerCase();
        return processedValue;
    }

    // setDataAttributes - Public function to add data attributes to elements. Pass the set of elements to tag, the name of the data attribute, and the prefix name for the data attribute.
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

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init,
      setDataAttributes: setDataAttributes,
      formatAttributeValue: formatAttributeValue
    };
}());