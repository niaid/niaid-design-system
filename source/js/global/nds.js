"use strict";

// Generic Utilities
document.addEventListener("DOMContentLoaded", function (e) {
  // Polyfill for "Closest" method.
  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i,
          el = this;

      do {
        i = matches.length;

        while (--i >= 0 && matches.item(i) !== el) {}

        ;
      } while (i < 0 && (el = el.parentElement));

      return el;
    };
  }
});

var getNextSibling = function getNextSibling(elem, selector) {
  var sibling = elem.nextElementSibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
};

function windowWidth() {
  var docElemProp = window.document.documentElement.clientWidth,
      body = window.document.body;
  return window.document.compatMode === "CSS1Compat" && docElemProp || body && body.clientWidth || docElemProp;
}

function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
} // Part of NDS Lite


(function ($) {
  // initDataAttributes - Adds Data Attributes to certain elements for Google Analytics tracking purposes.
  function initDataAttributes() {
    // Accordion Button
    var accordionCards = document.getElementsByClassName("component--accordion__card");

    for (var i = 0; i < accordionCards.length; i++) {
      var navigationLinks = accordionCards[i].querySelectorAll('button');
      setDataAttributes(navigationLinks, 'data-content', 'accordion-');
    } // Tabs


    var navigationTabs = document.getElementsByClassName("navigation--tabs");

    for (var i = 0; i < navigationTabs.length; i++) {
      var tabs = navigationTabs[i].querySelectorAll('.navigation--tabs__tab');
      setDataAttributes(tabs, 'data-content', 'nav-');
    } // Generic Body


    var bodyLayouts = document.getElementsByClassName("layouts--body");

    for (var i = 0; i < bodyLayouts.length; i++) {
      var bodyElements = bodyLayouts[i].querySelectorAll('a, button');
      setDataAttributes(bodyElements, 'data-content', 'body-anchor-');
    } // Header


    var globalHeaders = document.getElementsByClassName("global--header");

    for (var _i = 0; _i < globalHeaders.length; _i++) {
      // Branding Component
      var logoLinks = globalHeaders[_i].querySelectorAll('.component--branding');

      for (var _j = 0; _j < logoLinks.length; _j++) {
        logoLinks[_j].setAttribute('data-nav', 'header-nav-logo');
      } // Generic


      var headerElements = globalHeaders[_i].querySelectorAll('a, button');

      setDataAttributes(headerElements, 'data-nav', 'header-nav-');
    } // Primary Navigation


    var primaryNavigations = document.getElementsByClassName("navigation--primary");

    for (var i = 0; i < primaryNavigations.length; i++) {
      var _navigationLinks = primaryNavigations[i].querySelectorAll('.navigation--primary__inner__item');

      for (var _j2 = 0; _j2 < _navigationLinks.length; _j2++) {
        var navItem = _navigationLinks[_j2].children[0];

        if (hasClass(navItem, 'navigation--dropdown')) {
          var sectionName = _navigationLinks[_j2].children[0].children[0].textContent.trim();

          if (sectionName !== "") {
            sectionName = sectionName.replace(/\//g, '-');
            sectionName = sectionName.replace(/\s+/g, '-').toLowerCase();
            var dropdownItems = navItem.querySelectorAll('.navigation--dropdown__menu > a');
            setDataAttributes(dropdownItems, 'data-nav', 'header-nav-' + sectionName + '-');
          }
        } else {
          computeDataAttribute(navItem, 'data-nav', 'header-nav-');
        }
      }
    } // Footer


    var globalFooters = document.getElementsByClassName("global--footer");

    for (var i = 0; i < globalFooters.length; i++) {
      // Branding Component
      var _logoLinks = globalFooters[i].querySelectorAll('.image--logo');

      for (var j = 0; j < _logoLinks.length; j++) {
        _logoLinks[j].setAttribute('data-nav', 'footer-nav-logo');
      } // Footer Links


      var _navigationLinks2 = globalFooters[i].querySelectorAll('a, button');

      setDataAttributes(_navigationLinks2, 'data-nav', 'footer-nav-');
    } // Floating Buttons


    var floatingButtons = document.getElementsByClassName("button--floating");
    setDataAttributes(floatingButtons, 'data-nav', 'header-nav-'); // Mobile Rail

    var mobileRails = document.getElementsByClassName("navigation--mobile-rail__content");

    for (var i = 0; i < mobileRails.length; i++) {
      var _navigationLinks3 = mobileRails[i].querySelectorAll('a');

      setDataAttributes(_navigationLinks3, 'data-nav', 'nav-left-');
    }
  } // setDataAttributes - Helper function to add data attributes to elements.


  function setDataAttributes(els, dataAttributeName, dataAttributeValuePrefix) {
    if (els.length > 0 && els !== undefined) {
      for (var i = 0; i < els.length; i++) {
        if (els[i].hasAttribute(dataAttributeName)) {
          tagChildren(els[i], dataAttributeName);
        } else {
          computeDataAttribute(els[i], dataAttributeName, dataAttributeValuePrefix);
        }
      }
    }
  }

  function computeDataAttribute(el, dataAttributeName, dataAttributeValuePrefix) {
    var linkText = el.textContent.trim();

    if (linkText !== "") {
      linkText = linkText.replace(/\//g, '-');
      linkText = linkText.replace(/\s+/g, '-').toLowerCase();
      el.setAttribute(dataAttributeName, dataAttributeValuePrefix + linkText);
      tagChildren(el, dataAttributeName);
    } else {
      if (hasClass(el, 'button--share')) {
        var typeArray = el.classList[2].split('button--share--');
        var type = typeArray[typeArray.length - 1];
        var prefix = '';

        if (dataAttributeValuePrefix == "header-nav-") {
          prefix = 'header-nav-social-share-';
        } else if (dataAttributeValuePrefix == "footer-nav-") {
          prefix = 'footer-nav-social-share-';
        } else {
          prefix = 'body-social-share-';
        }

        el.setAttribute(dataAttributeName, prefix + type);
        tagChildren(el, dataAttributeName);
      }
    }
  }

  function tagChildren(el, dataAttributeName) {
    var dataAttributeValue = el.getAttribute(dataAttributeName);
    var childElements = el.querySelectorAll('i, span, div, img, strong');

    for (var j = 0; j < childElements.length; j++) {
      childElements[j].setAttribute(dataAttributeName, dataAttributeValue);
    }
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initDataAttributes = {
        attach: function attach(context) {
          $("body", context).once('nds-data-attributes').each(function () {
            initDataAttributes(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initDataAttributes();
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
})(jQuery);

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
})(jQuery);

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
})(jQuery); // Part of NDS Lite


(function ($) {
  // initComponentUSWDSBanner - Toggles the USWDS Banner Component open and closed.
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

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initComponentUSWDSBanner = {
        attach: function attach(context) {
          $("body", context).once('nds-component-uswds-banner').each(function () {
            initComponentUSWDSBanner(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initComponentUSWDSBanner();
    });
  }
})(jQuery);

(function ($) {
  function initNavigationDropdown() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    $(".navigation--dropdown.hover").on('mouseover', function () {
      openDropdown($(this));
    });
    $(".navigation--dropdown.hover").on('mouseout', function () {
      closeDropdown($(this));
    });
    $(".navigation--dropdown").on('focusin', function (e) {
      openDropdown($(this));
    });
    $(".navigation--dropdown").on('focusout', function (e) {
      if (this.contains(e.relatedTarget)) {
        return;
      }

      closeDropdown($(this));
    });
  }

  function openDropdown($el) {
    $el.addClass('is-open');
    $el.find('.navigation--dropdown__toggle').attr('aria-expanded', 'true');
  }

  function closeDropdown($el) {
    $el.removeClass('is-open');
    $el.find('.navigation--dropdown__toggle').attr('aria-expanded', 'false');
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initNavigationDropdown = {
        attach: function attach(context) {
          $("body", context).once('nds-navigation-dropdown').each(function () {
            initNavigationDropdown(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initNavigationDropdown();
    });
  }
})(jQuery); // Part of NDS Lite


(function ($) {
  // initNavigationDrawer - Functionality to support the NDS mobile drawer.
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

        if (hasClass(tabElements[tabElements.length - 1], "ext-link-icon")) {
          tabElements[tabElements.length - 2].focus();
        } else {
          tabElements[tabElements.length - 1].focus();
        }
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

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initNavigationDrawer = {
        attach: function attach(context) {
          $("body", context).once('nds-navigation-drawer').each(function () {
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
  function initNavigationTabs() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var tabs = document.querySelectorAll('.navigation--tabs__tab');

    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function () {
        var activeClass = 'active';
        var tabParent = this.closest('.navigation--tabs');
        var relatedTabs = tabParent.querySelectorAll('.navigation--tabs__tab');

        if (!hasClass(this, activeClass)) {
          for (var j = 0; j < relatedTabs.length; j++) {
            if (hasClass(relatedTabs[j], activeClass)) {
              relatedTabs[j].classList.remove(activeClass);
            }
          }

          this.classList.add(activeClass);
        }
      });
    }
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initNavigationTabs = {
        attach: function attach(context) {
          $("body", context).once('nds-navigation-tabs').each(function () {
            initNavigationTabs(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initNavigationTabs();
    });
  }
})(jQuery); // Part of NDS Lite


(function ($) {
  // initInputNDS - Functionality to support keyboard accessibility on radio and checkbox inputs.
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
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initInputNDS = {
        attach: function attach(context) {
          $("body", context).once('nds-input').each(function () {
            initInputNDS(context);
          });
        }
      };
    })(jQuery, Drupal);
  } else {
    // If Drupal isn't loaded, add JS for Pattern Lab.
    $(document).ready(function () {
      initInputNDS();
    });
  }
})(jQuery); // Dependencies
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

    $('.select2-selection--single').find('.select2-selection__rendered').attr('aria-label', 'Click to select option.');
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


(function ($) {
  // initLinkExternal - Adds external link icons to links that qualify as external.
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
  }

  if (typeof Drupal !== 'undefined') {
    // Define Drupal behavior.
    (function ($, Drupal) {
      Drupal.behaviors.initLinks = {
        attach: function attach(context) {
          $("body", context).once('nds-links').each(function () {
            initLinkExternal(context);
            initLinkExternalMailto(context);
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
})(jQuery); // Dependencies
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
})(jQuery);