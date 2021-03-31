(function($) {
    function initNavigationTabs(context = document) {
        let tabs = document.querySelectorAll('.navigation--tabs__tab');
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', function() {
                let activeClass = 'active';
                let tabParent = this.closest('.navigation--tabs');
                let relatedTabs = tabParent.querySelectorAll('.navigation--tabs__tab');
                if (!hasClass(this, activeClass)) {
                    for (let j = 0; j < relatedTabs.length; j++) {
                        if (hasClass(relatedTabs[j], activeClass)) {
                            relatedTabs[j].classList.remove(activeClass);
                        }
                    }
                    this.classList.add(activeClass);
                }
            });
        }
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initNavigationTabs = {
                attach: function(context) {
                    $("body", context).once('nds-navigation-tabs').each(function() {
                        initNavigationTabs(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initNavigationTabs();
        });
    }
})(jQuery);