// Dependencies
//  - Bootstrap

var moduleNDS_modal = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    //  initComponentModal - Initializes the modal component.
    function initComponentModal() {
        if (document.querySelectorAll('.component--modal').length) {
            let focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

            var modalsList = document.getElementsByClassName("component--modal");
            for (var i = 0; i < modalsList.length; i++) {
                let firstFocusableElement = modalsList[i].querySelectorAll(focusableElements)[0];
                let focusableContent = modalsList[i].querySelectorAll(focusableElements);
                let lastFocusableElement = focusableContent[focusableContent.length - 1];
             
                document.addEventListener('keydown', function(e) {
                    let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
                    if (!isTabPressed) {
                        return;
                    }
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus();
                            e.preventDefault();
                        }
                    }
                    else {
                        if (document.activeElement === lastFocusableElement) {
                            firstFocusableElement.focus();
                            e.preventDefault();
                        }
                    }
                });
                firstFocusableElement.focus();
            }
        }
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initComponentModal();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());