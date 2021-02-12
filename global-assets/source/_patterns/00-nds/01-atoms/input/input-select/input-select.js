// Dependencies
//  - Select2
//  - jQuery

(function($) {
    function initInputSelect(context = document) {
        $('[data-toggle="tooltip"]').tooltip();
        
        $('select').each(function() {
            if ($(this).attr('nds-select') == 'true') {
                $(this).select2({
                    minimumResultsForSearch: 10
                });
                if ($(this).val() != "") {
                    $(this).siblings('.select2-container').addClass('no-clear selection-made');
                }
            }
        });

        $('select').change(function(e, p) {
            if ($(this).attr('nds-select') == 'true') {
                if (!e.target.multiple) {
                    $(this).siblings('.select2-container').addClass('selection-made');
                    if (!$(this).siblings('.select2-container').find('.single-clear').length && $(this).attr('data-select-all-times') != "true" ) {
                        $(this).siblings('.select2-container').append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>');
                    }
                } 
                else {
                    $(this).find('option:selected').length > 0 ? $(this).siblings('.select2-container').addClass('selection-made-multi') : $(this).siblings('.select2-container').removeClass('selection-made-multi');
                }
            }
        });

        // Listener to Add Accessibility Compliance to Open Modals
        $('select').on('select2:open', function (e) {
            $('.select2-container').find('.select2-search__field').attr('aria-label', 'Search for choices');
            $('.select2-container').find('.select2-results__options').attr('aria-label', 'Available choices');
        });

        // Add Accessibility Compliane to Loaded Select Field
        $('.select2-selection--single').attr('aria-label', 'Click to select option.');
        $('.select2-selection--multiple').attr('aria-label', 'Click to select option(s).');

        // Remove selection on click of "X"
        $(document).on('click', '.single-clear', function(e) {
            e.stopPropagation();
            var $selectField = $(this).parent().siblings('select');
            $selectField.prop('selectedIndex', 0);
            var placeholder = $selectField.attr("data-placeholder");
            $(this).parent().removeClass('selection-made');
            $(this).siblings('.selection').find('.select2-selection__rendered').text(placeholder);
            $(this).remove();
        });
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initInputSelect = {
                attach: function(context) {
                    $('body', context).once('nds-input-select').each(function() {
                        initInputSelect(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initInputSelect();
        });
    }
})(jQuery);