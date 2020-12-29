(function($) {
    function initNavigationLocal(context = document) {
        if (document.querySelectorAll('.navigation--local').length) {
            var localNavigationItems = document.getElementsByClassName('navigation--local__group__label');
            for (var i = 0; i < localNavigationItems.length; i++) {
                localNavigationItems[i].addEventListener("keydown", function(event) {
                    if (event.isComposing || event.keyCode === 13) {
                        this.click();
                    }
                });
            }
        }
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initNavigationLocal = {
                attach: function(context) {
                    $(".page", context).once('nds-local-navigation').each(function() {
                        initNavigationLocal(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initNavigationLocal();
        });
    }
})(jQuery);