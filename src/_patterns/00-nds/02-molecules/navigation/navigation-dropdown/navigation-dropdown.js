// Dependencies
//  - jQuery

var moduleNDS_dropdown = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // initNavigationDropdown - Initializes the dropdown component.
    function initNavigationDropdown() {
        $(".navigation--dropdown.hover").on('mouseover', function() {
            openDropdown($(this));
        });
        $(".navigation--dropdown.hover").on('mouseout', function() {
            closeDropdown($(this));
        });

        $(".navigation--dropdown").on('focusin', function(e) {
            openDropdown($(this));
        });
        $(".navigation--dropdown").on('focusout', function(e) {
            if (this.contains(e.relatedTarget)) {
                return;
            }
            closeDropdown($(this));
        });
    }

    // openDropdown - Helper function to open the dropdown.
    function openDropdown($el) {
        $el.addClass('is-open');
        $el.find('.navigation--dropdown__toggle').attr('aria-expanded', 'true');
    }

    // removeClass - Helper function to close the dropdown.
    function closeDropdown($el) {
        $el.removeClass('is-open');
        $el.find('.navigation--dropdown__toggle').attr('aria-expanded', 'false');
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initNavigationDropdown();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());