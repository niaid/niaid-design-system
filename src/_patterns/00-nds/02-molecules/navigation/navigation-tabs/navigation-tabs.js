var moduleNDS_tabs = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // initNavigationTabs - Initializes tabs.
    function initNavigationTabs() {
        let tabs = document.querySelectorAll('.navigation--tabs__inner-wrapper__tab');
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', function() {
                let activeClass = 'active';
                let tabParent = this.closest('.navigation--tabs');
                let relatedTabs = tabParent.querySelectorAll('.navigation--tabs__inner-wrapper__tab');
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

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initNavigationTabs();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());