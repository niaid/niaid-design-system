// Dependencies
//  - Materialize

var moduleNDS_hero = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // initParallax - Initializes Materialize parallax functionality.
    function initParallax() {
        if (document.querySelectorAll('.parallax').length) {
            var elems = document.querySelectorAll('.parallax');
            var instances = M.Parallax.init(elems);
        }
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initParallax();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());