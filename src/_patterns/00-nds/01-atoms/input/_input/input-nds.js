var moduleNDS_input = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // enableKeyboardAccessibility - Functionality to support keyboard accessibility on radio and checkbox inputs.
    function enableKeyboardAccessibility() {
        let inputElements = document.querySelectorAll('.input--radio, .input--checkbox, .facet-item');
        for (let i = 0; i < inputElements.length; i++) {
            inputElements[i].addEventListener('keydown', function(e) {
                if (e.code === "Enter" || e.keyCode === "13" || e.code === "Space" || e.keyCode === "23") {
                    e.target.querySelector('input').click();
                }
            });
        }

        let facetItems = document.querySelectorAll('.facet-item');
        for (let j = 0; j < facetItems.length; j++) {
            if (!facetItems[j].hasAttribute('tabindex')) {
                facetItems[j].setAttribute('tabindex', '0');
            }
            if (!facetItems[j].querySelector('input').hasAttribute('tabindex')) {
                facetItems[j].querySelector('input').setAttribute('tabindex', '-1');
            }
        }
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        enableKeyboardAccessibility();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());