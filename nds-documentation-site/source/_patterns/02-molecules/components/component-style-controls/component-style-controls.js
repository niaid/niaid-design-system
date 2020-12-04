(function($) {
    function init_style_controls(context = document) {
        var mql = window.matchMedia('all and (max-width: 992px)');
        var wWidth = $(window).width();
        if (mql.matches) {
            $('#custom-styles-toggle').hide();
        }
        else {
            $('#custom-styles-toggle').show();
        }

        $(window).on('resize', function() {
            if (wWidth != $(this).width()) {
                wWidth = $(this).width();
                if (mql.matches) {
                    $('#custom-styles-toggle').hide();
                    $('.component--style-controls').removeClass('component--style-controls--open');
                    $('body').css('padding-top', 0);
                }
                else {
                    $('#custom-styles-toggle').show();
                }
            }
        });

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
            "shadows": "false",
            "corners": "semirounded"
        }

        state = initStyleChoices(state);

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
            let cookieName = "NDS_DOC_SITE_PROP--shadows";
            if ($(this).val() == "shadows") {
                $('body').addClass("style--shadows");
                $.cookie(cookieName, true, { expires: 30, path: '/' });
            }
            else {
                $('body').removeClass("style--shadows");
                $.removeCookie(cookieName, { path: '/' });
            }
        });
        $('#corners').on('change', function() {
            state = updateProperty($(this), "corners", state);
        });

        function updateProperty($field, property, state) {
            var propertyValue = $field.val();
            $('body').removeClass("style--" + property + "--" + state[property]);
            $('body').addClass("style--" + property + "--" + propertyValue);

            let cookieName = "NDS_DOC_SITE_PROP--" + property;
            $.cookie(cookieName, propertyValue, { expires: 30, path: '/' });

            return updateState(state, { [property]: propertyValue });
        }

        function updateState(oldState, newValue) {
            return {...oldState, ...newValue };
        }

        function initStyleChoices(state) {
            let tempState = state;

            // Shadows:
            if ($.cookie("NDS_DOC_SITE_PROP--shadows")) {
                $('body').addClass("style--shadows");
                $.cookie("NDS_DOC_SITE_PROP--shadows", true, { expires: 30, path: '/' });
                $('#shadows option[value="shadows"]').prop('selected', true);
            }

            // All other styles:
            for (let key in tempState) {
                let cookieName = "NDS_DOC_SITE_PROP--" + key;
                if ($.cookie(cookieName)) {
                    switch(key) {
                        case 'headings':
                            $('#text-heading option[value=' +  $.cookie(cookieName) + ']').prop('selected', true);
                            tempState = updateProperty($('#text-heading'), key, tempState);
                            break;
                        case 'body':
                            $('#text-body option[value=' +  $.cookie(cookieName) + ']').prop('selected', true);
                            tempState = updateProperty($('#text-body'), key, tempState);
                            break;
                        case 'colors':
                            $('#color-select option[value=' +  $.cookie(cookieName) + ']').prop('selected', true);
                            tempState = updateProperty($('#color-select'), key, tempState);
                            break;
                        case 'corners':
                            $('#corners option[value=' +  $.cookie(cookieName) + ']').prop('selected', true);
                            tempState = updateProperty($('#corners'), key, tempState);
                            break;
                        default:
                            break;
                    }
                }
            }
            return tempState;
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