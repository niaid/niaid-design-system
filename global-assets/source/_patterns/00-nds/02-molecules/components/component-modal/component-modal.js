(function($) {
    function initComponentModal(context = document) {
        if ($('.component--modal').length) {
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

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initComponentModal = {
                attach: function(context) {
                    $("body", context).once('nds-component-modal').each(function() {
                        initComponentModal(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initComponentModal();
        });
    }
})(jQuery);