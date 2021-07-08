// Dependencies
//  - Bootstrap 4

var moduleNDS_accordion = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // initAccordion - Initializes the accordion to open sections via the url.
    function initAccordion() {
        let accordions = document.getElementsByClassName("component--accordion");
        if (accordions.length > 0) {
            let hash = window.location.hash;
            let accordionHeaders = document.getElementsByClassName("component--accordion__card__header");
            for (let i = 0; i < accordionHeaders.length; i++) {
                let accordionID = accordionHeaders[i].getAttribute('id');
                if (hash == '#' + accordionID) {
                    let accordionButton = accordionHeaders[i].querySelector('.component--accordion__card__header__button');
                    accordionButton.setAttribute('aria-expanded', 'true');
                    let targetID = accordionButton.getAttribute('data-target').replace('#', '');
                    let target = document.getElementById(targetID);
                    target.classList.add("show");
                    break;
                }
            }
        }
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initAccordion();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());