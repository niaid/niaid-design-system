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

    // addHeroClassToBody - Adds the 'style--hero' class to the body if there is a hero present. This is separate from the initialization because users may have a custom hero without wanting the layout offset (or other styling) provided with the style--hero body class.
    function addHeroClassToBody() {
        if (document.querySelectorAll('.block--hero').length > 0) {
            document.body.className += ' style--hero';
        } 
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init,
      addHeroClassToBody: addHeroClassToBody
    };
}());