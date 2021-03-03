"use strict";

// Generic Utilities
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
} // Part of NDS Lite


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
})(jQuery); // Part of NDS Lite


(function ($) {
  // initDataAttributes - Adds Data Attributes to certain elements for Google Analytics tracking purposes.
  function initDataAttributes() {
    for (var i = 0; i < document.getElementsByClassName("layouts--body").length; i++) {
      var bodyAnchorLinks = document.getElementsByClassName("layouts--body")[i].querySelectorAll('a');
      setDataAttributes(bodyAnchorLinks, 'data-content', 'body-anchor-');
    }

    for (var i = 0; i < document.getElementsByClassName("navigation--primary").length; i++) {
      var navigationLinks = document.getElementsByClassName("navigation--primary")[i].querySelectorAll('a');
      setDataAttributes(navigationLinks, 'data-nav', 'header-nav-');
    }

    for (var i = 0; i < document.getElementsByClassName("global--header").length; i++) {
      var logoLinks = document.getElementsByClassName("global--header")[i].querySelectorAll('.component--branding');

      for (var i = 0; i < logoLinks.length; i++) {
        logoLinks[i].setAttribute('data-nav', 'header-nav-logo');
      }
    }

    for (var i = 0; i < document.getElementsByClassName("global--footer").length; i++) {
      var _navigationLinks = document.getElementsByClassName("global--footer")[i].querySelectorAll('a');

      setDataAttributes(_navigationLinks, 'data-nav', 'footer-nav-');

      var _logoLinks = document.getElementsByClassName("global--footer")[i].querySelectorAll('.image--logo');

      for (var i = 0; i < _logoLinks.length; i++) {
        _logoLinks[i].setAttribute('data-nav', 'footer-nav-logo');
      }
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