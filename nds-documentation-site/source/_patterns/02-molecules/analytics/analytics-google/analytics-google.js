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
        let menuDropdown = document.getElementsByClassName("navigation--primary")[i].querySelectorAll('.navigation--primary__inner__item');
        for (var i = 0; i < menuDropdown.length; i++) {
            let sectionText = menuDropdown[i].querySelectorAll('button');
            if (sectionText.length > 0) {
                sectionText = sectionText[0].textContent.trim();
                sectionText = sectionText.replace(/\//g, '-');
                sectionText = sectionText.replace(/\s+/g, '-').toLowerCase();
                let dropdownLinks = menuDropdown[i].querySelectorAll('.dropdown-item');
                for (var j = 0; j < dropdownLinks.length; j++) {
                    setDataAttributes(dropdownLinks, 'data-nav', 'header-nav-' + sectionText + '-');
                }
            }
            else {
                let linkText = menuDropdown[i].querySelectorAll('a');
                setDataAttributes(linkText, 'data-nav', 'header-nav-');
            }
        }
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