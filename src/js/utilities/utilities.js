// Generic Utilities

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
    if ($(elClass).length) {
        var mql = window.matchMedia(matchMediaDefinition);
        var wWidth = $(window).width();

        $('.layouts--main').each(function() {
            if (mql.matches) {
                stickybits($(this).find(elClass), { stickyBitStickyOffset: offset });
            }
        });

        $(window).on('resize', function() {
            if (wWidth != $(this).width()) {
                wWidth = $(this).width();
                $('.layouts--main').each(function() {
                    if (mql.matches) {
                        stickybits($(this).find(elClass), { stickyBitStickyOffset: offset });
                    }
                    else {
                        stickybits($(this).find(elClass)).cleanup();
                        $(this).find(elClass).css('position', 'relative');
                    }
                });
            }
        });
    }
}