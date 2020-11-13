"use strict";

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
  function initLinkExternal() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    $('a:not(:has(img))').each(function () {
      if ($(this).text()) {
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

  function initLinkExternalMailto() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    $('a[href^="mailto:"]').each(function () {
      $(this).addClass('link--external--mail');
    });
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initLinkExternal = {
        attach: function attach(context) {
          $('body', context).once('nds-link-external').each(function () {
            initLinkExternal(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initLinkExternal();
      initLinkExternalMailto();
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