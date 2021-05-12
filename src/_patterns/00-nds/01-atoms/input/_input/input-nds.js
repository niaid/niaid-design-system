var moduleNDS_input = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // enableKeyboardAccessibility - Functionality to support keyboard accessibility on radio and checkbox inputs.
    function enableKeyboardAccessibility() {
        let inputElements = document.querySelectorAll('.input--radio, .input--checkbox');
        for (let i = 0; i < inputElements.length; i++) {
            inputElements[i].addEventListener('keydown', function(e) {
                if (e.code === "Enter" || e.keyCode === "13" || e.code === "Space" || e.keyCode === "23") {
                    e.target.querySelector('input').click();
                }
            });
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