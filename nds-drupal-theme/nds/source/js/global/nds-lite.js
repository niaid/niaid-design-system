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
} // Part of NDS Lite


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
} // Part of NDS Lite


document.addEventListener("DOMContentLoaded", function (e) {
  initNavigationDrawer();
}); // initNavigationDrawer - Functionality to support the NDS mobile drawer.

function initNavigationDrawer() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
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
} // Part of NDS Lite


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
}