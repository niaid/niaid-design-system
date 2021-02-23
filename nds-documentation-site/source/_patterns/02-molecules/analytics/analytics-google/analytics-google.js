// Part of NDS Lite

document.addEventListener("DOMContentLoaded", (e) => {
    initDataAttributes();
});


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

    for (var i = 0; i < document.getElementsByClassName("global--footer").length; i++) {
        let navigationLinks = document.getElementsByClassName("global--footer")[i].querySelectorAll('a');
        setDataAttributes(navigationLinks, 'data-nav', 'footer-nav-');
    }

    for (var i = 0; i < document.getElementsByClassName("component--accordion__card").length; i++) {
        let navigationLinks = document.getElementsByClassName("component--accordion__card")[i].querySelectorAll('button');
        setDataAttributes(navigationLinks, 'data-content', 'accordion-');
    }

    for (var i = 0; i < document.getElementsByClassName("navigation--mobile-rail__content").length; i++) {
        let navigationLinks = document.getElementsByClassName("navigation--mobile-rail__content")[i].querySelectorAll('a');
        setDataAttributes(navigationLinks, 'data-nav', 'nav-left-');
    }
}

// setDataAttributes - Helper function to add data attributes to elements.
function setDataAttributes(els, dataAttributeName, dataAttributeValuePrefix) {
    for (var i = 0; i < els.length; i++) {
        var linkText = els[i].textContent.trim();
        if (linkText !== "" && els[i].closest('.component--snippet') == null) {
            linkText = linkText.replace(/\//g, '-');
            linkText = linkText.replace(/\s+/g, '-').toLowerCase();
            els[i].setAttribute(dataAttributeName, dataAttributeValuePrefix + linkText);
        }
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