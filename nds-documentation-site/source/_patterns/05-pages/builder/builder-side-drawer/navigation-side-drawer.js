(function($) {
    function init_build_controls(context) {
        var mql = window.matchMedia('all and (max-width: 991px)');

        /* SET DEFAULTS */
        var state = {
            "tab": "mockup",
            "heading": "roboto",
            "body": "roboto",
            "colors": "theme-1",
            "shadows": "false",
            "corners": "semirounded",
            "hero": "false",
            "productIDTop": "",
            "productIDBottom": ""
        }

        // Parse the URL, update the current active state
        // Apply the active state
        var urlState = getURLParams(window.location.href);
        state = updateState(state, urlState);
        applyState(state);

        /**************************************************************/

        // Fonts
        // Headings
        $('body').addClass("style--headings--" + state.heading);
        $(".form--controls--headings input[type='radio']").click(function() {
            state = headingsHandler(state);
        });

        $(".form--controls--headings label", context).keypress(function(e) {
            if (e.which == 13) {
                $(this).siblings('input').prop("checked", true);
                state = headingsHandler(state);
            }
        });

        function headingsHandler(state) {
            var radioValue = $("input[name='headings']:checked").val();
            $('body').removeClass("style--headings--" + state.heading);
            $('body').addClass("style--headings--" + radioValue);
            return updateState(state, { "heading": radioValue });
        }

        /**************************************************************/

        // Body
        $('body').addClass("style--body--" + state.body);
        $(".form--controls--body input[type='radio']").click(function() {
            state = bodyHandler(state);
        });

        $(".form--controls--body label", context).keypress(function(e) {
            if (e.which == 13) {
                $(this).siblings('input').prop("checked", true);
                state = bodyHandler(state);
            }
        });

        function bodyHandler(state) {
            var radioValue = $("input[name='body']:checked").val();
            $('body').removeClass("style--body--" + state.body);
            $('body').addClass("style--body--" + radioValue);
            return updateState(state, { "body": radioValue });
        }

        /**************************************************************/

        // Colors
        $('body').addClass("style--colors--" + state.colors);
        $(".form--controls--colors input[type='radio']").click(function() {
            state = colorHandler(state);
        });
        // If user clicks on the color palette
        $('.block--palette').click(function() {
            var target = $(this).attr('class').split(' ');
            var radioValue = target[target.length - 1];
            $("input[name='colors'][value=" + radioValue + "]").prop('checked', true);
            $('body').removeClass("style--colors--" + state.colors);
            $('body').addClass("style--colors--" + radioValue);
            updateHexes(radioValue);
            state = updateState(state, { "colors": radioValue });
        });

        $(".form--controls--colors label", context).keypress(function(e) {
            if (e.which == 13) {
                $(this).siblings('input').prop("checked", true);
                state = colorHandler(state);
            }
        });

        function colorHandler(state) {
            var radioValue = $("input[name='colors']:checked").val();
            $('body').removeClass("style--colors--" + state.colors);
            $('body').addClass("style--colors--" + radioValue);
            updateHexes(radioValue);
            return updateState(state, { "colors": radioValue });
        }

        /**************************************************************/

        // Shadows
        $(".form--controls--shadows input[type='radio']").click(function() {
            state = shadowHandler(state);
        });

        $(".form--controls--shadows label", context).keypress(function(e) {
            if (e.which == 13) {
                $(this).siblings('input').prop("checked", true);
                state = shadowHandler(state);
            }
        });

        function shadowHandler(state) {
            var radioValue = $("input[name='shadow']:checked").val();
            if (radioValue == "shadows") {
                $('body').addClass('style--shadows');
                return updateState(state, { "shadows": "true" });
            } else {
                $('body').removeClass('style--shadows');
                return updateState(state, { "shadows": "false" });
            }
        }

        /**************************************************************/

        // Corners
        $(".form--controls--corners input[type='radio']").click(function() {
            state = cornersHandler(state);
        });

        $(".form--controls--corners label", context).keypress(function(e) {
            if (e.which == 13) {
                $(this).siblings('input').prop("checked", true);
                state = cornersHandler(state);
            }
        });

        function cornersHandler(state) {
            var radioValue = $("input[name='corners']:checked").val();
            if (radioValue == "rounded") {
                $('body').removeClass('style--corners--semirounded').addClass('style--corners--rounded');
                return updateState(state, { "corners": "rounded" });
            } else if (radioValue == "semirounded") {
                $('body').removeClass('style--corners--rounded').addClass('style--corners--semirounded');
                return updateState(state, { "corners": "semirounded" });
            } else {
                $('body').removeClass('style--corners--rounded style--corners--semirounded');
                return updateState(state, { "corners": "straight" });
            }
        }

        /**************************************************************/

        // Hero
        $(".form--controls--hero input[type='radio']").click(function() {
            state = heroHandler(state);
        });

        $(".form--controls--hero label", context).keypress(function(e) {
            if (e.which == 13) {
                $(this).siblings('input').prop("checked", true);
                state = heroHandler(state);
            }
        });

        function heroHandler(state) {
            var radioValue = $("input[name='hero']:checked").val();
            if (radioValue == "yes") {
                $('#block--hero').show();
                //$('#block--header').hide();
                $('body').addClass('style--hero');
                return updateState(state, { "hero": "true" });
            } else {
                $('#block--hero').hide();
                //$('#block--header').show();
                $('body').removeClass('style--hero');
                return updateState(state, { "hero": "false" });
            }
        }

        /* Tab Navigation */
        $('#tab--mockup', context).click(function() {
            state = navigationHandler(state, this, 'mockup');
        });

        $('#tab--style-tile', context).click(function() {
            state = navigationHandler(state, this, 'st');
        });

        $('#tab--mockup', context).keypress(function(e) {
            if (e.which == 13) {
                state = navigationHandler(state, this, 'mockup');
            }
        });

        $('#tab--style-tile', context).keypress(function(e) {
            if (e.which == 13) {
                state = navigationHandler(state, this, 'st');
            }
        });

        function navigationHandler(state, target, active) {
            $('.layouts--tabs__tab').each(function() {
                $(this).removeClass('active-tab');
                $(this).attr('tabindex', '0');
            });
            $('.layouts--tabs__window').each(function() {
                $(this).hide();
            });
            if (active == 'mockup') {
                $('#layouts--tabs__mockup').show();
            } else {
                $('#layouts--tabs__style-tile').show();
            }
            $(target).addClass('active-tab');
            $(target).attr('tabindex', '-1');

            // Redraw Datatables
            $('table').each(function() {
                if ($(this).hasClass('dataTable')) {
                    $(this).DataTable().columns.adjust().responsive.recalc();
                }
            });

            return updateState(state, { "tab": active });
        }

        /**************************************************************/

        // Product Identity
        $('#form--product-identity__inputs__top').on('input', function() {
            state = updateProductID(state, this);
        });
        $('#form--product-identity__inputs__bottom').on('input', function() {
            state = updateProductID(state, this);
        });

        // Product ID - Styles
        /*$('.form--product-identity__inputs__buttons').click(function() {
            //$(this).toggleClass('active');
            var tempArr = $(this).attr('class').split(' ')[$(this).attr('class').split(' ').length - 1];
            var style = tempArr.split('--')[tempArr.split('--').length - 1];
            var name = $(this).siblings('input').attr('name');
            if (name == "form--product-identity__inputs__top") {
                $('.text--product-identity__top').toggleClass(style);
                var styles = state["productIDTopStyles"];
                styles = toggleElement(styles, style);
                state = updateState(state, { "productIDTopStyles":  styles});
            }
            if (name == "form--product-identity__inputs__bottom") {
                $('.text--product-identity__bottom').toggleClass(style);
                var styles = state["productIDBottomStyles"];
                styles = toggleElement(styles, style);
                state = updateState(state, { "productIDBottomStyles":  styles});
            }
        });*/


        // Use Theme Button
        $('.button--use-theme').on('click', function() {
            let bodyClasses = '"bodyClass": "';
            bodyClasses += 'style--headings--' + state.heading;
            bodyClasses += ' style--body--' + state.body;
            bodyClasses += ' style--colors--' + state.colors;
            state.shadows == 'true' ? bodyClasses += ' style--shadows' : bodyClasses += '';
            state.hero == 'true' ? bodyClasses += ' style--hero' : bodyClasses += '';
            bodyClasses += ' style--corners--' + state.corners;
            bodyClasses += '"';
            $('#selected-choices').text(bodyClasses);
        });

        // Share Button
        $('.button--share-theme').click(function() {
            $('.builder--side-drawer__copied').css('opacity', 0);
            generateShareLink(state);
            copyToClipboard('.builder--side-drawer__link');
            $('.builder--side-drawer__copied').css('opacity', 1);
            setTimeout(function() {
                $('.builder--side-drawer__copied').css('opacity', 0);
            }, 2000);
        });
    }

    /*function toggleElement(array, value) {
        var index = array.indexOf(value);
        if (index === -1) {
            array.push(value);
        } else {
            array.splice(index, 1);
        }
        return array;
    }*/

    function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }

    function updateState(oldState, newValue) {
        return {...oldState, ...newValue };
    }

    function applyState(state) {

        // Navigation
        $('.layouts--tabs__tab').each(function() {
            $(this).removeClass('active-tab');
            $(this).attr('tabindex', '0');
        });
        $('.layouts--tabs__window').each(function() {
            $(this).hide();
        });
        if (state.tab == 'st') {
            $('#tab--style-tile').addClass('active-tab');
            $('#tab--style-tile').attr('tabindex', '-1');
            $('#layouts--tabs__style-tile').show();
        } else {
            $('#tab--mockup').addClass('active-tab');
            $('#tab--mockup').attr('tabindex', '-1');
            $('#layouts--tabs__mockup').show();
        }

        $('.form--controls--headings input[value=' + state.heading + ']').click();
        $('.form--controls--body input[value=' + state.body + ']').click();
        $('.form--controls--colors input[value=' + state.colors + ']').click();
        updateHexes(state.colors);

        // Shadows
        if (state.shadows == "true") {
            $('body').addClass('style--shadows');
            $('.form--controls--shadows input[value=shadows]').click();
        } else {
            $('body').removeClass('style--shadows');
            $('.form--controls--shadows input[value=no_shadows]').click();
        }

        // Corners
        if (state.corners == "rounded") {
            $('body').removeClass('style--corners--semirounded').addClass('style--corners--rounded');
            $('.form--controls--corners input[value=rounded]').click();
        } else if (state.corners == "semirounded") {
            $('body').removeClass('style--corners--rounded').addClass('style--corners--semirounded');
            $('.form--controls--corners input[value=semirounded]').click();
        } else {
            $('body').removeClass('style--corners--rounded style--corners--semirounded');
            $('.form--controls--corners input[value=straight]').click();
        }

        // Hero
        if (state.hero == "true") {
            $('#block--hero').show();
            $('#block--header').hide();
            $('body').addClass('style--hero');
            $('.form--controls--hero input[value=yes]').click();
        } else {
            $('#block--hero').hide();
            $('#block--header').show();
            $('body').removeClass('style--hero');
            $('.form--controls--hero input[value=no]').click();
        }

        if (state.productIDTop != "") {
            $('#form--product-identity__inputs__top').val(state.productIDTop);
            $('.main').find('.text--product-identity__top').text(state.productIDTop);
        }
        if (state.productIDBottom != "") {
            $('#form--product-identity__inputs__bottom').val(state.productIDBottom);
            $('.main').find('.text--product-identity__bottom').text(state.productIDBottom);
        }
        if (state.productIDTop != "" || state.productIDBottom != "") {
            $('.main').find('.component--branding__vertical-bar').css('display', 'inline-block');
        }
    }

    // Product Identity
    function updateProductID(state, inputID) {
        if ($('#form--product-identity__inputs__top').val() == "" && $('#form--product-identity__inputs__bottom').val() == "") {
            $('.main').find('.component--branding__vertical-bar').css('display', 'none');
            $('.main').find('.text--product-identity__top').text("");
            $('.main').find('.text--product-identity__bottom').text("");
        } else {
            $('.main').find('.component--branding__vertical-bar').css('display', 'inline-block');
            if (inputID.name == "form--product-identity__inputs__top") {
                $('.main').find('.text--product-identity__top').text(inputID.value);
                return updateState(state, { "productIDTop": inputID.value });
            }
            if (inputID.name == "form--product-identity__inputs__bottom") {
                $('.main').find('.text--product-identity__bottom').text(inputID.value);
                return updateState(state, { "productIDBottom": inputID.value });
            }
        }
    }

    function generateShareLink(params) {
        var query = "?";
        var first = true;
        Object.keys(params).forEach(function(key) {
            if (params[key]) {
                /*if (key === 'productIDTopStyles' || key === 'productIDBottomStyles') {
                    if (params[key].length) {
                        if (first) {
                            query += key + '=';
                            for (i = 0; i < params[key].length; i++) {
                                query += params[key][i];
                            }
                            first = false;
                        }
                        else {
                            query += '&' + key + '=';
                            for (i = 0; i < params[key].length; i++) {
                                query += params[key][i];
                            }
                        }
                    }
                }
                else {*/
                if (first) {
                    query += key + '=' + params[key];
                    first = false;
                } else {
                    if (params[key] != 'undefined') {
                        query += '&' + key + '=' + params[key];
                    }
                }
                /*}*/
            }
        });
        var hostname = window.location.href.split("?")[0];
        $('.builder--side-drawer__link').text(hostname + query);
    }

    function updateHexes(theme) {
        var target = '.block--palette.' + theme;
        $(target).find('.block--palette__color').each(function(i) {
            if (i != 3) {
                var hex = rgb2hex($(this).css('background-color'));
                var indicator = '.indicator-color--' + (i + 1);
                $(indicator).find('.global--color-indicator__color').css('background', hex);
                $(indicator).find('.global--color-indicator__hex').text(hex.toUpperCase());
            }
        });
    }

    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }

    // $('button').click(function() {
    //     var hex = rgb2hex($('input').val());
    //     $('.result').html(hex);
    // });

    var getURLParams = function(url) {
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.buildControls = {
                attach: function(context) {
                    init_build_controls(context);
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            if ($("#builder").length) {
                init_build_controls();
            }
        });
    }
})(jQuery);