"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function ($) {
  function initParallax() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if ($('.parallax').length) {
      $('.parallax').parallax();
    }
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initParallax = {
        attach: function attach(context) {
          $('body', context).once('initParallax').each(function () {
            initParallax(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initParallax();
    });
  }
})(jQuery);

(function ($) {
  function initDatepicker() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if ($('.input--date-picker').length) {
      $('.input--date-picker').find('input').datepicker();
    }
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initDatepicker = {
        attach: function attach(context) {
          $('body', context).once('initDatepicker').each(function () {
            initDatepicker(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initDatepicker();
    });
  }
})(jQuery);

(function ($) {
  function init_input_select(context) {
    $('select').each(function () {
      $(this).select2({
        minimumResultsForSearch: 10
      }); // If a select is initialized with a chosen value

      if ($(this).val() != "") {
        $(this).siblings('.select2-container').addClass('no-clear selection-made');
      }
    });
    $('select').change(function (e, p) {
      if (!e.target.multiple) {
        $(this).siblings('.select2-container').addClass('selection-made');

        if (!$(this).siblings('.select2-container').find('.single-clear').length && $(this).attr('data-select-all-times') != "true") {
          $(this).siblings('.select2-container').append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>');
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
      Drupal.behaviors.inputSelect = {
        attach: function attach(context) {
          init_input_select(context);
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      init_input_select();
    });
  }
})(jQuery);

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

(function ($) {
  function initExternalLink() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
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
            $(this).after('<a aria-label="Read More about External Link policy" class="ext-link-icon" href="#"></a>');
          }
        }
      }
    });
  }

  function initMailto() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    $('a[href^="mailto:"]').each(function () {
      $(this).addClass('link--external--mail');
    });
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initMailto = {
        attach: function attach(context) {
          $('body', context).once('initMailto').each(function () {
            initMailto(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initExternalLink();
      initMailto();
    });
  }
})(jQuery);

(function ($) {
  function init_table(context) {
    /* KEY
        Sorting: Add data-tablesort="true" to the <table> tag.
        Numeric Sort Support for a Column: Add data-column-num="true" to the <th> tag of the appropriate column.
    */
    $("table").each(function () {
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
    });
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.table = {
        attach: function attach(context) {
          $(".page-body", context).once('vnext-table-default').each(function () {
            init_table(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      init_table();
    });
  }
})(jQuery); // (function($) {
//     // init_block_palette = (context) => {
//     //     $("#tab--style-tile").click(function() {
//     //         setTimeout(function() {
//     //             console.log("Bang");
//     //             $('.block--full-palette__set').each(function() {
//     //                 $(this).find('.block--full-palette__set__block').each(function() {
//     //                     $(this).find('.block--full-palette__set__block__label').text(rgb2hex($(this).css('background-color')));
//     //                 });
//     //             });
//     //         }, 500);
//     //     });
//     //     $(".block--palette").click(function() {
//     //         setTimeout(function() {
//     //             console.log("Bang");
//     //             $('.block--full-palette__set').each(function() {
//     //                 $(this).find('.block--full-palette__set__block').each(function() {
//     //                     $(this).find('.block--full-palette__set__block__label').text(rgb2hex($(this).css('background-color')));
//     //                 });
//     //             });
//     //         }, 500);
//     //     });
//     // }
//     function rgb2hex(rgb){
//         rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
//         return (rgb && rgb.length === 4) ? "#" +
//          ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
//          ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
//          ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
//        }
//        $('button').click(function(){
//            var hex = rgb2hex( $('input').val() );
//            $('.result').html( hex );
//     });
//     if (typeof Drupal !== 'undefined') {
//         // Define Drupal behavior.
//         (function($, Drupal) {
//             Drupal.behaviors.blockPalette = {
//                 attach: function(context) {
//                     init_block_palette(context);
//                 },
//             };
//         })(jQuery, Drupal);
//     } else {
//         // If Drupal isn't loaded, add JS for Pattern Lab.
//         $(window).ready(function() {
//             init_block_palette();
//         });
//     }
// })(jQuery);


(function ($) {
  function init_local_nav(context) {
    $('.card-header', context).keypress(function (e) {
      if (e.which == 13) {
        $(this).click();
      }
    });
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initLocalNav = {
        attach: function attach(context) {
          $(".page", context).once('niaid-local-navigation').each(function () {
            init_local_nav(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      init_local_nav();
    });
  }
})(jQuery);

(function ($) {
  function initPushpin() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if ($('.pushpin').length) {
      $('.pushpin').each(function () {
        var $this = $(this);
        var $target = $('#' + $(this).attr('data-target'));
        $this.pushpin({
          top: $target.offset().top,
          bottom: $target.offset().top + $target.outerHeight() - $this.height()
        });
      });
    }
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initPushpin = {
        attach: function attach(context) {
          $('body', context).once('initPushpin').each(function () {
            initPushpin(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initPushpin();
    });
  }
})(jQuery);

(function ($) {
  function initScrollspy() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if ($('.scrollspy').length) {
      $('.scrollspy').scrollSpy();
    }
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initScrollspy = {
        attach: function attach(context) {
          $('body', context).once('initScrollspy').each(function () {
            initScrollspy(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initScrollspy();
    });
  }
})(jQuery);

(function ($) {
  function init_style_controls(context) {
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
      return _objectSpread(_objectSpread({}, oldState), newValue);
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
      init_style_controls();
    });
  }
})(jQuery);

(function ($) {
  function init_form_upload(context) {
    $('#form--upload__input').change(function (e) {
      var image = $('#output');
      var src = URL.createObjectURL(e.target.files[0]);
      $(image).attr('src', src);
      $('.component--branding__vertical-bar').css('display', 'inline-block');
      $('.component--branding__logo').attr('src', src);
      $('.component--branding__logo').attr('alt', "Web Property Branding");
    });
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.formUpload = {
        attach: function attach(context) {
          init_form_upload(context);
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      init_form_upload();
    });
  }
})(jQuery);

(function ($) {
  function initNavigationDrawer() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var mql = window.matchMedia('all and (max-width: 950px)');
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
          $('body', context).once('initNavigationDrawer').each(function () {
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
  function init_local_nav(context) {
    var mql = window.matchMedia('all and (max-width: 990.0625rem)');
    var wWidth = $(window).width();

    if (mql.matches) {
      $("#localNavMobileTarget").collapse('hide');
    } else {
      $("#localNavMobileTarget").collapse('show');
    }

    $(window).resize(function () {
      if (wWidth != $(this).width()) {
        wWidth = $(this).width();

        if (mql.matches) {
          $("#localNavMobileTarget").collapse('hide');
        } else {
          $("#localNavMobileTarget").collapse('show');
        }
      }
    });
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.localNav = {
        attach: function attach(context) {
          init_local_nav(context);
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      init_local_nav();
    });
  }
})(jQuery);

(function ($) {
  function initMobileRail() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var mql = window.matchMedia('all and (max-width: 950px)');
    var wWidth = $(window).width();
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initMobileRail = {
        attach: function attach(context) {
          $('body', context).once('initMobileRail').each(function () {
            initMobileRail(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initMobileRail();
    });
  }
})(jQuery);