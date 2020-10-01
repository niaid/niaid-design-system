(function($) {
    function init_style_controls(context) {

        $('#custom-styles-toggle').on('click', function() {
            $('.component--style-controls').toggleClass('component--style-controls--open');
            if ($('.component--style-controls').hasClass('component--style-controls--open')) {
                $('body').css('padding-top', $('.component--style-controls').outerHeight() + 'px');
            }
            else {
                $('body').css('padding-top', 0);
            }
        });

        var state = {
            "headings": "public-sans",
            "body": "public-sans",
            "colors": "theme-1",
            "corners": "semirounded"
        }

        $('#text-heading').on('change', function() {
            state = updateProperty($(this), "headings", state);
        });
        $('#text-body').on('change', function() {
            state = updateProperty($(this), "body", state);
        });
        $('#color-select').on('change', function() {
            state = updateProperty($(this), "colors", state);
        });
        $('#shadows').on('change', function() {
            if ($(this).val() == "shadows") {
                $('body').addClass("style--shadows");
            }
            else {
                $('body').removeClass("style--shadows");
            }
        });
        $('#corners').on('change', function() {
            state = updateProperty($(this), "corners", state);
        });

        function updateProperty($field, property, state) {
            var propertyValue = $field.val();
            $('body').removeClass("style--" + property + "--" + state[property]);
            $('body').addClass("style--" + property + "--" + propertyValue);
            return updateState(state, { [property]: propertyValue });
        }

        function updateState(oldState, newValue) {
            return {...oldState, ...newValue };
        }
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.init_style_controls = {
                attach: function(context) {
                    $(".page", context).once('nds-style-controls').each(function() {
                        init_style_controls(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            if (!$("#builder").length) {
                init_style_controls();
            }
        });
    }
})(jQuery);