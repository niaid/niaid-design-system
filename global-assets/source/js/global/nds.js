"use strict";

// Part of NDS Lite
document.addEventListener("DOMContentLoaded", function (e) {
  initInputNDS();
}); // initInputNDS - Functionality to support keyboard accessibility on radio and checkbox inputs.

function initInputNDS() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var inputElements = document.querySelectorAll('.input--radio, .input--checkbox');

  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener('keydown', function (e) {
      if (e.code === "Enter" || e.keyCode === "13" || e.code === "Space" || e.keyCode === "23") {
        e.target.querySelector('input').click();
      }
    });
  }
} // Dependencies
//  - Bootstrap Datepicker
//  - jQuery


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
})(jQuery); // Dependencies
//  - Select2
//  - jQuery


(function ($) {
  function initInputSelect() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    $('[data-toggle="tooltip"]').tooltip();
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
    }); // Add Accessibility Compliane to Loaded Select Field

    $('.select2-selection--single').attr('aria-label', 'Click to select option.');
    $('.select2-selection--multiple').attr('aria-label', 'Click to select option(s).'); // Remove selection on click of "X"

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
})(jQuery); // Part of NDS Lite


document.addEventListener("DOMContentLoaded", function (e) {
  initLinkExternal();
  initLinkExternalMailto();
}); // initLinkExternal - Adds external link icons to links that qualify as external.

function initLinkExternal() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var externalLinks = document.querySelectorAll('a');

  for (var i = 0; i < externalLinks.length; i++) {
    if (externalLinks[i].innerHTML != "") {
      var url = externalLinks[i].getAttribute('href');
      var hostname = externalLinks[i].hostname;

      if (url && hostname !== location.hostname) {
        url = url.toLowerCase();

        if ((url.indexOf('http://') > -1 || url.indexOf('https://') > -1) && url.indexOf('localhost:3002') <= 0) {
          externalLinks[i].setAttribute('target', '_blank');
          var linkIcon = document.createElement('a');
          linkIcon.setAttribute('href', url);
          linkIcon.setAttribute('class', "ext-link-icon");
          linkIcon.setAttribute('aria-label', "External Link");
          externalLinks[i].insertAdjacentElement('afterend', linkIcon);
        }
      }
    }
  }
} // initLinkExternalMailto - Adds envelope icons to mailto links.


function initLinkExternalMailto() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');

  for (var i = 0; i < mailtoLinks.length; i++) {
    mailtoLinks[i].classList.add('link--external--mail');
  }
} // Dependencies
//  - DataTables
//  - jQuery


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
})(jQuery); // Part of NDS Lite


document.addEventListener("DOMContentLoaded", function (e) {
  initDataAttributes();
}); // initDataAttributes - Adds Data Attributes to certain elements for Google Analytics tracking purposes.

function initDataAttributes() {
  for (var i = 0; i < document.getElementsByClassName("layouts--body").length; i++) {
    var bodyAnchorLinks = document.getElementsByClassName("layouts--body")[i].querySelectorAll('a');
    setDataAttributes(bodyAnchorLinks, 'data-content', 'body-anchor-');
  }

  for (var i = 0; i < document.getElementsByClassName("navigation--primary").length; i++) {
    var navigationLinks = document.getElementsByClassName("navigation--primary")[i].querySelectorAll('a');
    setDataAttributes(navigationLinks, 'data-nav', 'header-nav-');
  }

  for (var i = 0; i < document.getElementsByClassName("global--footer").length; i++) {
    var _navigationLinks = document.getElementsByClassName("global--footer")[i].querySelectorAll('a');

    setDataAttributes(_navigationLinks, 'data-nav', 'footer-nav-');
  }

  for (var i = 0; i < document.getElementsByClassName("component--accordion__card").length; i++) {
    var _navigationLinks2 = document.getElementsByClassName("component--accordion__card")[i].querySelectorAll('button');

    setDataAttributes(_navigationLinks2, 'data-content', 'accordion-');
  }
} // setDataAttributes - Helper function to add data attributes to elements.


function setDataAttributes(els, dataAttributeName, dataAttributeValuePrefix) {
  for (var i = 0; i < els.length; i++) {
    var linkText = els[i].textContent.trim();

    if (linkText !== "") {
      linkText = linkText.replace(/\//g, '-');
      linkText = linkText.replace(/\s+/g, '-').toLowerCase();
      els[i].setAttribute(dataAttributeName, dataAttributeValuePrefix + linkText);
    }
  }
}

(function ($) {
  function initComponentMedia() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if (document.querySelectorAll('.materialboxed').length) {
      var elems = document.querySelectorAll('.materialboxed');
      var instances = M.Materialbox.init(elems);
    }
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initComponentMedia = {
        attach: function attach(context) {
          $("body", context).once('nds-component-media').each(function () {
            initComponentMedia(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initComponentMedia();
    });
  }
})(jQuery); // Part of NDS Lite


document.addEventListener("DOMContentLoaded", function (e) {
  initComponentUSWDSBanner();
}); // initComponentUSWDSBanner - Toggles the USWDS Banner Component open and closed.

function initComponentUSWDSBanner() {
  if (document.querySelectorAll('#uswds-banner-toggle').length > 0) {
    document.querySelector('#uswds-banner-toggle').addEventListener("click", function (e) {
      if (document.getElementById("uswds-banner-toggle").getAttribute('aria-expanded') == 'true') {
        document.getElementById("uswds-banner-toggle").setAttribute('aria-expanded', 'false');
        document.getElementById("uswds-banner-content").style.display = 'none';
      } else {
        document.getElementById("uswds-banner-toggle").setAttribute('aria-expanded', 'true');
        document.getElementById("uswds-banner-content").style.display = 'block';
      }
    });
  }
}

(function ($) {
  function initComponentModal() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if (document.querySelectorAll('.component--modal').length) {
      var focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      var modalsList = document.getElementsByClassName("component--modal");

      var _loop = function _loop() {
        var firstFocusableElement = modalsList[i].querySelectorAll(focusableElements)[0];
        var focusableContent = modalsList[i].querySelectorAll(focusableElements);
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
      };

      for (var i = 0; i < modalsList.length; i++) {
        _loop();
      }
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
  function initBlockHero() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    if (document.querySelectorAll('.parallax').length) {
      var elems = document.querySelectorAll('.parallax');
      var instances = M.Parallax.init(elems);
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
})(jQuery); // Part of NDS Lite


document.addEventListener("DOMContentLoaded", function (e) {
  initNavigationLocal();
}); // initNavigationLocal - Functionality to support the local navigation pattern, specifically adding keyboard accessibility.

function initNavigationLocal() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

  if (document.querySelectorAll('.navigation--local').length) {
    var localNavigationItems = document.getElementsByClassName('navigation--local__group__label');

    for (var i = 0; i < localNavigationItems.length; i++) {
      localNavigationItems[i].addEventListener("keydown", function (event) {
        if (event.isComposing || event.keyCode === 13) {
          this.click();
        }
      });
    }
  }
} // Part of NDS Lite


document.addEventListener("DOMContentLoaded", function (e) {
  initNavigationDrawer();
}); // initNavigationDrawer - Functionality to support the NDS mobile drawer.

function initNavigationDrawer() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

  if (document.querySelectorAll('.navigation--drawer').length > 0) {
    var wWidth = windowWidth();
    document.querySelector('#global-mobile-menu').addEventListener("click", function (e) {
      document.querySelector('#main-navigation-mobile').classList.add("drawer--open");
      var overlay = getNextSibling(document.querySelector('#main-navigation-mobile'), '.navigation--drawer--overlay');
      overlay.style.display = 'block';
      document.querySelector('.navigation--drawer__top__button-close').focus();
      var tabElements = document.querySelector('#main-navigation-mobile').querySelectorAll('button, a');

      for (var i = 0; i < tabElements.length; i++) {
        tabElements[i].setAttribute('tabindex', '0');
      }
    });
    document.querySelector('.navigation--drawer--overlay').addEventListener("click", function (e) {
      closeMenu();
    });
    document.querySelector('.navigation--drawer__top__button-close').addEventListener("click", function (e) {
      closeMenu();
    });

    window.onresize = function (e) {
      if (wWidth != windowWidth()) {
        wWidth = windowWidth();
        closeMenu();
      }
    }; // 508 Compliance Focus Helpers


    document.querySelector('.skip-to--top').addEventListener("focus", function (e) {
      document.querySelector('.navigation--drawer__top__button-close').focus();
    });
    document.querySelector('.skip-to--back').addEventListener("focus", function (e) {
      var tabElements = document.querySelector('.navigation--drawer__inner').querySelectorAll('button, a');
      tabElements[tabElements.length - 1].focus();
    });
  }
} // closeMenu - Helper function to close the mobile drawer.


function closeMenu() {
  document.querySelector('#global-mobile-menu').focus();
  document.querySelector('#main-navigation-mobile').classList.remove("drawer--open");
  var overlay = getNextSibling(document.querySelector('#main-navigation-mobile'), '.navigation--drawer--overlay');
  overlay.style.display = 'none';
  var tabElements = document.querySelector('#main-navigation-mobile').querySelectorAll('button, a');

  for (var i = 0; i < tabElements.length; i++) {
    tabElements[i].setAttribute('tabindex', '-1');
  }
}