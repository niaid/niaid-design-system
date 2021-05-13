// Dependencies
//  - Materialize

var moduleNDS_media = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // initMaterialBoxed - Initializes the materialboxed functionality of Materialize
    function initMaterialBoxed() {
        if (document.querySelectorAll('.materialboxed').length) {
            var elems = document.querySelectorAll('.materialboxed');
            var instances = M.Materialbox.init(elems);
        }
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initMaterialBoxed();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());