// Generic Utilities
// DO NOT REMOVE

// Global Variables
var viewportPreviousWidth;
var viewportWidthIsDifferent = false;
var viewportMobileBreakpoint = 992;

document.addEventListener("DOMContentLoaded", function(e) {
    // Polyfill for "Closest" method.
    if (window.Element && !Element.prototype.closest) {
        Element.prototype.closest =
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i, el = this;
            do {
                i = matches.length;
                while (--i >= 0 && matches.item(i) !== el) {};
            } while ((i < 0) && (el = el.parentElement));
            return el;
        };
    }

    // Set Initial Viewport Width
    viewportPreviousWidth = windowWidth();
    window.addEventListener('resize', function() {
        if (viewportPreviousWidth != windowWidth()) {
            viewportWidthIsDifferent = true;
            viewportPreviousWidth = windowWidth();
        }
        else {
            viewportWidthIsDifferent = false;
        }
    });
});

var getNextSibling = function (elem, selector) {
    var sibling = elem.nextElementSibling;
    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.nextElementSibling
    }
};

function windowWidth() {
    var docElemProp = window.document.documentElement.clientWidth, body = window.document.body;
    return window.document.compatMode === "CSS1Compat" && docElemProp || body && body.clientWidth || docElemProp;
}

function hasClass(el, className) {
    return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function stickyElement(elClass, offset, matchMediaDefinition) {
    if (jQuery(elClass).length) {
        var mql = window.matchMedia(matchMediaDefinition);

        jQuery('.layouts--main').each(function() {
            if (mql.matches) {
                stickybits(jQuery(this).find(elClass), { stickyBitStickyOffset: offset });
            }
        });

        window.addEventListener('resize', function() {
            if (viewportWidthIsDifferent) {
                jQuery('.layouts--main').each(function() {
                    if (mql.matches) {
                        stickybits(jQuery(this).find(elClass), { stickyBitStickyOffset: offset });
                    }
                    else {
                        stickybits(jQuery(this).find(elClass)).cleanup();
                        jQuery(this).find(elClass).css('position', 'relative');
                    }
                });
            }
        });
    }
}