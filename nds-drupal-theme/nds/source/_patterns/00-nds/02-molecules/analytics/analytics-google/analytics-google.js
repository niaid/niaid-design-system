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