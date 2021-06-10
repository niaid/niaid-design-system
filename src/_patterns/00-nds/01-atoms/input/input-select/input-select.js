var moduleNDS_select = (function() {
    'use strict';
    
    /* =================== PRIVATE METHODS ================= */
    function initInputSelect() {
        jQuery('[data-toggle="tooltip"]').tooltip();
        
        jQuery('select').each(function() {
            if (jQuery(this).attr('nds-select') == 'true') {
                jQuery(this).select2({
                    minimumResultsForSearch: 10
                });
                if (jQuery(this).val() != "") {
                    jQuery(this).siblings('.select2-container').addClass('no-clear selection-made');
                }
            }
        });

        jQuery('select').change(function(e, p) {
            if (jQuery(this).attr('nds-select') == 'true') {
                if (!e.target.multiple) {
                    jQuery(this).siblings('.select2-container').addClass('selection-made');
                    if (!jQuery(this).siblings('.select2-container').find('.single-clear').length && jQuery(this).attr('data-select-all-times') != "true" ) {
                        jQuery(this).siblings('.select2-container').append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>');
                    }
                } 
                else {
                    jQuery(this).find('option:selected').length > 0 ? jQuery(this).siblings('.select2-container').addClass('selection-made-multi') : jQuery(this).siblings('.select2-container').removeClass('selection-made-multi');
                }
            }
        });

        // Listener to Add Accessibility Compliance to Open Modals
        jQuery('select').on('select2:open', function (e) {
            jQuery('.select2-container').find('.select2-search__field').attr('aria-label', 'Search for choices');
            jQuery('.select2-container').find('.select2-results__options').attr('aria-label', 'Available choices');
        });

        // Add Accessibility Compliane to Loaded Select Field
        jQuery('.select2-selection--single').find('.select2-selection__rendered').attr('aria-label', 'Click to select option.');
        jQuery('.select2-selection--multiple').attr('aria-label', 'Click to select option(s).');

        // Remove selection on click of "X"
        jQuery(document).on('click', '.single-clear', function(e) {
            e.stopPropagation();
            var $selectField = jQuery(this).parent().siblings('select');
            $selectField.prop('selectedIndex', 0);
            var placeholder = $selectField.attr("data-placeholder");
            jQuery(this).parent().removeClass('selection-made');
            jQuery(this).siblings('.selection').find('.select2-selection__rendered').text(placeholder);
            jQuery(this).remove();
        });
    }

    /* =================== PUBLIC METHODS ================== */
    function init() {
        initInputSelect();
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
      init: init
    };
}());