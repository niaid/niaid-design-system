// Dependencies
//  - jQuery

var moduleNDS_dropdown = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    // initNavigationDropdown - Initializes the dropdown component.
    function initNavigationDropdown() {
        jQuery(".navigation--dropdown.hover").on('mouseover', function() {
            openDropdown(jQuery(this));
        });
        jQuery(".navigation--dropdown.hover").on('mouseout', function() {
            closeDropdown(jQuery(this));
        });

        jQuery(".navigation--dropdown").on('click', function() {
            if (!jQuery(this).hasClass('hover') && isDropdownOpen(jQuery(this))) {
                closeDropdown(jQuery(this));
            }
            else if (!jQuery(this).hasClass('hover') && !isDropdownOpen(jQuery(this))) {
                openDropdown(jQuery(this));
            }
        });

        jQuery(".navigation--dropdown").on('focusout', function(e) {
            if (this.contains(e.relatedTarget)) {
                return;
            }
            closeDropdown(jQuery(this));
        });
    }

    // isDropdownOpen = Helper function to determine if the dropdown is open.
    function isDropdownOpen($el) {
        return $el.hasClass('is-open');
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