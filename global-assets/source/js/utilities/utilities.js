// Generic Utilities
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