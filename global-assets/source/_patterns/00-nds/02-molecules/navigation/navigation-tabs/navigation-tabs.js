(function($) {
    function initNavigationTabs(context = document) {
        document.querySelectorAll('.navigation--tabs__tab').forEach(function(clickedTab) {
            clickedTab.addEventListener('click', function(event) {
                let activeClass = 'active';
                let tabParent = this.closest('.navigation--tabs');
                let tabs = tabParent.querySelectorAll('.navigation--tabs__tab');
                if (!hasClass(this, activeClass)) {
                    for (let i = 0; i < tabs.length; i++) {
                        if (hasClass(tabs[i], activeClass)) {
                            tabs[i].classList.remove(activeClass);
                        }
                    }
                    this.classList.add(activeClass);
                }
            });
        });
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