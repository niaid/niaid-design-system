"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function ($) {
  function init_layouts_tabs(context) {
    $('#tab--mockup').attr('tabindex', '-1');
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.layoutsTabs = {
        attach: function attach(context) {
          init_layouts_tabs(context);
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      init_layouts_tabs();
    });
  }
})(jQuery);

$(document).ready(function () {
  $('a:not(:has(img))').each(function () {
    var varText = $(this).text();

    if (varText) {
      // Get URL and verify it exists
      var url = $(this).attr('href');
      var hostName = this.hostname;

      if (url && hostName !== location.hostname) {
        url = url.toLowerCase();

        if ((url.indexOf('http://') > -1 || url.indexOf('https://') > -1) && url.indexOf('localhost:3002') <= 0) {
          $(this).attr('target', '_blank');
          $(this).after('<a title="Link is External" aria-label="Link is External" class="ext-link-icon" href="' + url + '"></a>');
        }
      }
    }
  });
  $('a[href^="mailto:"]').each(function () {
    $(this).addClass('link--external--mail');
  });
});

(function ($) {
  function initComponentScrollspySection() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if ($('.scrollspy').length) {
      $('.scrollspy').scrollSpy();
    }
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initComponentScrollspySection = {
        attach: function attach(context) {
          $('body', context).once('nds-component-scrollspy-section').each(function () {
            initComponentScrollspySection(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initComponentScrollspySection();
    });
  }
})(jQuery);

(function ($) {
  function initComponentSnippet() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    $('.component--snippet__block__code__snippet').each(function () {
      var codeSnippet = $(this).find('pre').html().replace(/(\r\n|\n|\r)/gm, "");
      $(this).find('pre').empty();
      $(this).find('pre').text(process(codeSnippet));
    });
    $('.component--snippet').find('.button--icon').on('click', function () {
      var $copyText = $(this).siblings('.component--snippet__button__copied');
      $copyText.css('opacity', 0);
      copyToClipboard($(this).parentsUntil('.component--snippet').parent().find('pre'));
      $copyText.css('opacity', 1);
      setTimeout(function () {
        $copyText.css('opacity', 0);
      }, 2000);
    });
  }

  function copyToClipboard($element) {
    var copyText = $element.text();
    var textArea = document.createElement('textarea');
    textArea.classList.add("hidden-textarea");
    textArea.textContent = copyText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }

  function process(str) {
    var div = document.createElement('div');
    div.innerHTML = str.trim();
    return format(div, 0).innerHTML;
  }

  function format(node, level) {
    var indentBefore = new Array(level++ + 1).join('  '),
        indentAfter = new Array(level - 1).join('  '),
        textNode;

    for (var i = 0; i < node.children.length; i++) {
      textNode = document.createTextNode('\n' + indentBefore);
      node.insertBefore(textNode, node.children[i]);
      format(node.children[i], level);

      if (node.lastElementChild == node.children[i]) {
        textNode = document.createTextNode('\n' + indentAfter);
        node.appendChild(textNode);
      }
    }

    return node;
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initComponentSnippet = {
        attach: function attach(context) {
          $('body', context).once('nds-component-snippet').each(function () {
            initComponentSnippet(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initComponentSnippet();
    });
  }
})(jQuery);

(function ($) {
  function init_style_controls() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var mql = window.matchMedia('all and (max-width: 992px)');
    var wWidth = $(window).width();

    if (mql.matches) {
      $('#custom-styles-toggle').hide();
    } else {
      $('#custom-styles-toggle').show();
    }

    $(window).on('resize', function () {
      if (wWidth != $(this).width()) {
        wWidth = $(this).width();

        if (mql.matches) {
          $('#custom-styles-toggle').hide();
          $('.component--style-controls').removeClass('component--style-controls--open');
          $('body').css('padding-top', 0);
        } else {
          $('#custom-styles-toggle').show();
        }
      }
    });
    $('#custom-styles-toggle').on('click', function () {
      $('.component--style-controls').toggleClass('component--style-controls--open');

      if ($('.component--style-controls').hasClass('component--style-controls--open')) {
        $('body').css('padding-top', $('.component--style-controls').outerHeight() + 'px');
      } else {
        $('body').css('padding-top', 0);
      }
    });
    var state = {
      "headings": "public-sans",
      "body": "public-sans",
      "colors": "theme-1",
      "corners": "semirounded"
    };
    $('#text-heading').on('change', function () {
      state = updateProperty($(this), "headings", state);
    });
    $('#text-body').on('change', function () {
      state = updateProperty($(this), "body", state);
    });
    $('#color-select').on('change', function () {
      state = updateProperty($(this), "colors", state);
    });
    $('#shadows').on('change', function () {
      if ($(this).val() == "shadows") {
        $('body').addClass("style--shadows");
      } else {
        $('body').removeClass("style--shadows");
      }
    });
    $('#corners').on('change', function () {
      state = updateProperty($(this), "corners", state);
    });

    function updateProperty($field, property, state) {
      var propertyValue = $field.val();
      $('body').removeClass("style--" + property + "--" + state[property]);
      $('body').addClass("style--" + property + "--" + propertyValue);
      return updateState(state, _defineProperty({}, property, propertyValue));
    }

    function updateState(oldState, newValue) {
      return _objectSpread({}, oldState, {}, newValue);
    }
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.init_style_controls = {
        attach: function attach(context) {
          $(".page", context).once('nds-style-controls').each(function () {
            init_style_controls(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      if (!$("#builder").length) {
        init_style_controls();
      }
    });
  }
})(jQuery); // Functionality for Sticky Local Nav, NOT IN USE
// (function($) {
//     function initComponentStickybits(context = document) {
//         $(window).ready(function() {
//             stickybits(".component--accordion", { useStickyClasses: true, stickyBitStickyOffset: 24 });
//             const stickybitsInstancetoBeUpdated = stickybits(".component--accordion");
//             window.addEventListener('resize', function() {
//                 console.log('resize');
//                 stickybitsInstancetoBeUpdated.update({ useStickyClasses: true, stickyBitStickyOffset: 24 });
//             });
//         });
//     }
//     if (typeof Drupal !== 'undefined') {
//         // Define Drupal behavior.
//         (function($, Drupal) {
//             Drupal.behaviors.initComponentStickybits = {
//                 attach: function(context) {
//                     $('body', context).once('nds-component-stickybits').each(function() {
//                         initComponentStickybits(context);
//                     });
//                 },
//             };
//         })(jQuery, Drupal);
//     } else {
//         // If Drupal isn't loaded, add JS for Pattern Lab.
//         $(document).ready(function() {
//             initComponentStickybits();
//         });
//     }
// })(jQuery);


(function ($) {
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
    }; // Parse the URL, update the current active state
    // Apply the active state

    var urlState = getURLParams(window.location.href);
    state = updateState(state, urlState);
    applyState(state);
    /**************************************************************/
    // Fonts
    // Headings

    $('body').addClass("style--headings--" + state.heading);
    $(".form--controls--headings input[type='radio']").click(function () {
      state = headingsHandler(state);
    });
    $(".form--controls--headings label", context).keypress(function (e) {
      if (e.which == 13) {
        $(this).siblings('input').prop("checked", true);
        state = headingsHandler(state);
      }
    });

    function headingsHandler(state) {
      var radioValue = $("input[name='headings']:checked").val();
      $('body').removeClass("style--headings--" + state.heading);
      $('body').addClass("style--headings--" + radioValue);
      return updateState(state, {
        "heading": radioValue
      });
    }
    /**************************************************************/
    // Body


    $('body').addClass("style--body--" + state.body);
    $(".form--controls--body input[type='radio']").click(function () {
      state = bodyHandler(state);
    });
    $(".form--controls--body label", context).keypress(function (e) {
      if (e.which == 13) {
        $(this).siblings('input').prop("checked", true);
        state = bodyHandler(state);
      }
    });

    function bodyHandler(state) {
      var radioValue = $("input[name='body']:checked").val();
      $('body').removeClass("style--body--" + state.body);
      $('body').addClass("style--body--" + radioValue);
      return updateState(state, {
        "body": radioValue
      });
    }
    /**************************************************************/
    // Colors


    $('body').addClass("style--colors--" + state.colors);
    $(".form--controls--colors input[type='radio']").click(function () {
      state = colorHandler(state);
    }); // If user clicks on the color palette

    $('.block--palette').click(function () {
      var target = $(this).attr('class').split(' ');
      var radioValue = target[target.length - 1];
      $("input[name='colors'][value=" + radioValue + "]").prop('checked', true);
      $('body').removeClass("style--colors--" + state.colors);
      $('body').addClass("style--colors--" + radioValue);
      updateHexes(radioValue);
      state = updateState(state, {
        "colors": radioValue
      });
    });
    $(".form--controls--colors label", context).keypress(function (e) {
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
      return updateState(state, {
        "colors": radioValue
      });
    }
    /**************************************************************/
    // Shadows


    $(".form--controls--shadows input[type='radio']").click(function () {
      state = shadowHandler(state);
    });
    $(".form--controls--shadows label", context).keypress(function (e) {
      if (e.which == 13) {
        $(this).siblings('input').prop("checked", true);
        state = shadowHandler(state);
      }
    });

    function shadowHandler(state) {
      var radioValue = $("input[name='shadow']:checked").val();

      if (radioValue == "shadows") {
        $('body').addClass('style--shadows');
        return updateState(state, {
          "shadows": "true"
        });
      } else {
        $('body').removeClass('style--shadows');
        return updateState(state, {
          "shadows": "false"
        });
      }
    }
    /**************************************************************/
    // Corners


    $(".form--controls--corners input[type='radio']").click(function () {
      state = cornersHandler(state);
    });
    $(".form--controls--corners label", context).keypress(function (e) {
      if (e.which == 13) {
        $(this).siblings('input').prop("checked", true);
        state = cornersHandler(state);
      }
    });

    function cornersHandler(state) {
      var radioValue = $("input[name='corners']:checked").val();

      if (radioValue == "rounded") {
        $('body').removeClass('style--corners--semirounded').addClass('style--corners--rounded');
        return updateState(state, {
          "corners": "rounded"
        });
      } else if (radioValue == "semirounded") {
        $('body').removeClass('style--corners--rounded').addClass('style--corners--semirounded');
        return updateState(state, {
          "corners": "semirounded"
        });
      } else {
        $('body').removeClass('style--corners--rounded style--corners--semirounded');
        return updateState(state, {
          "corners": "straight"
        });
      }
    }
    /**************************************************************/
    // Hero


    $(".form--controls--hero input[type='radio']").click(function () {
      state = heroHandler(state);
    });
    $(".form--controls--hero label", context).keypress(function (e) {
      if (e.which == 13) {
        $(this).siblings('input').prop("checked", true);
        state = heroHandler(state);
      }
    });

    function heroHandler(state) {
      var radioValue = $("input[name='hero']:checked").val();

      if (radioValue == "yes") {
        $('#block--hero').show(); //$('#block--header').hide();

        $('body').addClass('style--hero');
        return updateState(state, {
          "hero": "true"
        });
      } else {
        $('#block--hero').hide(); //$('#block--header').show();

        $('body').removeClass('style--hero');
        return updateState(state, {
          "hero": "false"
        });
      }
    }
    /* Tab Navigation */


    $('#tab--mockup', context).click(function () {
      state = navigationHandler(state, this, 'mockup');
    });
    $('#tab--style-tile', context).click(function () {
      state = navigationHandler(state, this, 'st');
    });
    $('#tab--mockup', context).keypress(function (e) {
      if (e.which == 13) {
        state = navigationHandler(state, this, 'mockup');
      }
    });
    $('#tab--style-tile', context).keypress(function (e) {
      if (e.which == 13) {
        state = navigationHandler(state, this, 'st');
      }
    });

    function navigationHandler(state, target, active) {
      $('.layouts--tabs__tab').each(function () {
        $(this).removeClass('active-tab');
        $(this).attr('tabindex', '0');
      });
      $('.layouts--tabs__window').each(function () {
        $(this).hide();
      });

      if (active == 'mockup') {
        $('#layouts--tabs__mockup').show();
      } else {
        $('#layouts--tabs__style-tile').show();
      }

      $(target).addClass('active-tab');
      $(target).attr('tabindex', '-1'); // Redraw Datatables

      $('table').each(function () {
        if ($(this).hasClass('dataTable')) {
          $(this).DataTable().columns.adjust().responsive.recalc();
        }
      });
      return updateState(state, {
        "tab": active
      });
    }
    /**************************************************************/
    // Product Identity


    $('#form--product-identity__inputs__top').on('input', function () {
      state = updateProductID(state, this);
    });
    $('#form--product-identity__inputs__bottom').on('input', function () {
      state = updateProductID(state, this);
    }); // Product ID - Styles

    /*$('.form--product-identity__inputs__buttons').click(function() {
        //$(this).toggleClass('active');
        var tempArr = $(this).attr('class').split(' ')[$(this).attr('class').split(' ').length - 1];
        var style = tempArr.split('--')[tempArr.split('--').length - 1];
        var name = $(this).siblings('input').attr('name');
        if (name == "form--product-identity__inputs__top") {
            $('.component--product-identity__top').toggleClass(style);
            var styles = state["productIDTopStyles"];
            styles = toggleElement(styles, style);
            state = updateState(state, { "productIDTopStyles":  styles});
        }
        if (name == "form--product-identity__inputs__bottom") {
            $('.component--product-identity__bottom').toggleClass(style);
            var styles = state["productIDBottomStyles"];
            styles = toggleElement(styles, style);
            state = updateState(state, { "productIDBottomStyles":  styles});
        }
    });*/
    // Use Theme Button

    $('.button--use-theme').on('click', function () {
      var bodyClasses = '"bodyClass": "';
      bodyClasses += 'style--headings--' + state.heading;
      bodyClasses += ' style--body--' + state.body;
      bodyClasses += ' style--colors--' + state.colors;
      state.shadows == 'true' ? bodyClasses += ' style--shadows' : bodyClasses += '';
      state.hero == 'true' ? bodyClasses += ' style--hero' : bodyClasses += '';
      bodyClasses += ' style--corners--' + state.corners;
      bodyClasses += '"';
      $('#selected-choices').text(bodyClasses);
    }); // Share Button

    $('.button--share-theme').click(function () {
      $('.builder--side-drawer__copied').css('opacity', 0);
      generateShareLink(state);
      copyToClipboard('.builder--side-drawer__link');
      $('.builder--side-drawer__copied').css('opacity', 1);
      setTimeout(function () {
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
    return _objectSpread({}, oldState, {}, newValue);
  }

  function applyState(state) {
    // Navigation
    $('.layouts--tabs__tab').each(function () {
      $(this).removeClass('active-tab');
      $(this).attr('tabindex', '0');
    });
    $('.layouts--tabs__window').each(function () {
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
    updateHexes(state.colors); // Shadows

    if (state.shadows == "true") {
      $('body').addClass('style--shadows');
      $('.form--controls--shadows input[value=shadows]').click();
    } else {
      $('body').removeClass('style--shadows');
      $('.form--controls--shadows input[value=no_shadows]').click();
    } // Corners


    if (state.corners == "rounded") {
      $('body').removeClass('style--corners--semirounded').addClass('style--corners--rounded');
      $('.form--controls--corners input[value=rounded]').click();
    } else if (state.corners == "semirounded") {
      $('body').removeClass('style--corners--rounded').addClass('style--corners--semirounded');
      $('.form--controls--corners input[value=semirounded]').click();
    } else {
      $('body').removeClass('style--corners--rounded style--corners--semirounded');
      $('.form--controls--corners input[value=straight]').click();
    } // Hero


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
      $('.main').find('.component--product-identity__top').text(state.productIDTop);
    }

    if (state.productIDBottom != "") {
      $('#form--product-identity__inputs__bottom').val(state.productIDBottom);
      $('.main').find('.component--product-identity__bottom').text(state.productIDBottom);
    }

    if (state.productIDTop != "" || state.productIDBottom != "") {
      $('.main').find('.component--branding__vertical-bar').css('display', 'inline-block');
    }
  } // Product Identity


  function updateProductID(state, inputID) {
    if ($('#form--product-identity__inputs__top').val() == "" && $('#form--product-identity__inputs__bottom').val() == "") {
      $('.main').find('.component--branding__vertical-bar').css('display', 'none');
      $('.main').find('.component--product-identity__top').text("");
      $('.main').find('.component--product-identity__bottom').text("");
    } else {
      $('.main').find('.component--branding__vertical-bar').css('display', 'inline-block');

      if (inputID.name == "form--product-identity__inputs__top") {
        $('.main').find('.component--product-identity__top').text(inputID.value);
        return updateState(state, {
          "productIDTop": inputID.value
        });
      }

      if (inputID.name == "form--product-identity__inputs__bottom") {
        $('.main').find('.component--product-identity__bottom').text(inputID.value);
        return updateState(state, {
          "productIDBottom": inputID.value
        });
      }
    }
  }

  function generateShareLink(params) {
    var query = "?";
    var first = true;
    Object.keys(params).forEach(function (key) {
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
    $(target).find('.block--palette__color').each(function (i) {
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
    return rgb && rgb.length === 4 ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  } // $('button').click(function() {
  //     var hex = rgb2hex($('input').val());
  //     $('.result').html(hex);
  // });


  var getURLParams = function getURLParams(url) {
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
  };

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.buildControls = {
        attach: function attach(context) {
          init_build_controls(context);
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      if ($("#builder").length) {
        init_build_controls();
      }
    });
  }
})(jQuery);

(function ($) {
  function initInputDatePicker() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    $('.input--date-picker').each(function () {
      if ($(this).find('input').attr('nds-date-picker') == 'true') {
        $(this).find('input').datepicker();
      }
    });
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initInputDatePicker = {
        attach: function attach(context) {
          $('body', context).once('nds-input-date-picker').each(function () {
            initInputDatePicker(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initInputDatePicker();
    });
  }
})(jQuery);

(function ($) {
  function initInputSelect() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    $('select').each(function () {
      if ($(this).attr('nds-select') == 'true') {
        $(this).select2({
          minimumResultsForSearch: 10
        });

        if ($(this).val() != "") {
          $(this).siblings('.select2-container').addClass('no-clear selection-made');
        }
      }
    });
    $('select').change(function (e, p) {
      if ($(this).attr('nds-select') == 'true') {
        if (!e.target.multiple) {
          $(this).siblings('.select2-container').addClass('selection-made');

          if (!$(this).siblings('.select2-container').find('.single-clear').length && $(this).attr('data-select-all-times') != "true") {
            $(this).siblings('.select2-container').append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>');
          }
        } else {
          $(this).find('option:selected').length > 0 ? $(this).siblings('.select2-container').addClass('selection-made-multi') : $(this).siblings('.select2-container').removeClass('selection-made-multi');
        }
      }
    }); // Listener to Add Accessibility Compliance to Open Modals

    $('select').on('select2:open', function (e) {
      $('.select2-container').find('.select2-search__field').attr('aria-label', 'Search for choices');
      $('.select2-container').find('.select2-results__options').attr('aria-label', 'Available choices');
    });
    $(document).on('click', '.single-clear', function (e) {
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
    (function ($, Drupal) {
      Drupal.behaviors.initInputSelect = {
        attach: function attach(context) {
          $('body', context).once('nds-input-select').each(function () {
            initInputSelect(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initInputSelect();
    });
  }
})(jQuery);

(function ($) {
  function initTableDefault() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    /* KEY
        Sorting: Add data-tablesort="true" to the <table> tag.
        Numeric Sort Support for a Column: Add data-column-num="true" to the <th> tag of the appropriate column.
    */
    $("table").each(function () {
      if ($(this).attr('nds-datatable') == 'true') {
        var defaultConfigs = {
          "responsive": true,
          "paging": false,
          "info": false,
          "autoWidth": false,
          "searching": false
        };

        if (!($(this).attr('data-tablesort') == "true")) {
          defaultConfigs['ordering'] = false;
        } else {
          // Determine Column Type
          var columns = [];
          $(this).find('thead').find('th').each(function (i) {
            if ($(this).attr('data-column-num') == "true") {
              columns.push({
                "type": "natural",
                "targets": i
              });
            }
          });
          defaultConfigs['columnDefs'] = columns;
        }

        $(this).dataTable(defaultConfigs);
      }
    });
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initTableDefault = {
        attach: function attach(context) {
          $("body", context).once('nds-table-default').each(function () {
            initTableDefault(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initTableDefault();
    });
  }
})(jQuery);

(function ($) {
  function initBlockHero() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if ($('.parallax').length) {
      $('.parallax').parallax();
    }
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initBlockHero = {
        attach: function attach(context) {
          $('body', context).once('nds-block-hero').each(function () {
            initBlockHero(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initBlockHero();
    });
  }
})(jQuery);

(function ($) {
  function initComponentLightbox() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if ($('.materialboxed').length) {
      $('.materialboxed').materialbox();
    }
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initComponentLightbox = {
        attach: function attach(context) {
          $("body", context).once('nds-component-lightbox').each(function () {
            initComponentLightbox(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initComponentLightbox();
    });
  }
})(jQuery);

(function ($) {
  function initComponentModal() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if ($('.component--modal').length) {
      var focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      $('.component--modal').each(function () {
        var firstFocusableElement = $(this).find(focusableElements)[0];
        var focusableContent = $(this).find(focusableElements);
        var lastFocusableElement = focusableContent[focusableContent.length - 1];
        document.addEventListener('keydown', function (e) {
          var isTabPressed = e.key === 'Tab' || e.keyCode === 9;

          if (!isTabPressed) {
            return;
          }

          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
              e.preventDefault();
            }
          }
        });
        firstFocusableElement.focus();
      });
    }
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initComponentModal = {
        attach: function attach(context) {
          $("body", context).once('nds-component-modal').each(function () {
            initComponentModal(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initComponentModal();
    });
  }
})(jQuery);

(function ($) {
  function initNavigationDrawer() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var wWidth = $(window).width();
    $("#global-mobile-menu").on('click', function () {
      $('#main-navigation-mobile').addClass('drawer--open');
      $('#main-navigation-mobile').siblings('.navigation--drawer--overlay').show();
      $('.navigation--drawer__top__button-close').focus();
      $('#main-navigation-mobile').find('a, button').each(function () {
        $(this).attr('tabindex', '0');
      });
    });
    $('.navigation--drawer--overlay').on('click', function () {
      $(this).hide();
      closeMenu();
    });
    $('.navigation--drawer__top__button-close').on('click', function () {
      closeMenu();
    });
    $(window).resize(function () {
      if (wWidth != $(this).width()) {
        wWidth = $(this).width();
        closeMenu();
      }
    }); // 508 Compliance Focus Helpers

    $('.skip-to--top').on('focus', function () {
      $('.navigation--drawer__top__button-close').focus();
    });
    $('.skip-to--back').on('focus', function () {
      var focusable = $(".navigation--drawer__inner").find("a:visible, button:visible");
      $(focusable[focusable.length - 1]).focus();
    });
  }

  function closeMenu() {
    $("#global-mobile-menu").focus();
    $('#main-navigation-mobile').removeClass('drawer--open');
    $('#main-navigation-mobile').siblings('.navigation--drawer--overlay').hide();
    $('#main-navigation-mobile').find('a, button').each(function () {
      $(this).attr('tabindex', '-1');
    });
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initNavigationDrawer = {
        attach: function attach(context) {
          $('body', context).once('nds-navigation-drawer').each(function () {
            initNavigationDrawer(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initNavigationDrawer();
    });
  }
})(jQuery);

(function ($) {
  function initNavigationLocal() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if ($('.navigation--local').length) {
      $('.navigation--local__group__label', context).keypress(function (e) {
        if (e.which == 13) {
          $(this).click();
        }
      });
    }
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initNavigationLocal = {
        attach: function attach(context) {
          $(".page", context).once('nds-local-navigation').each(function () {
            initNavigationLocal(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initNavigationLocal();
    });
  }
})(jQuery);