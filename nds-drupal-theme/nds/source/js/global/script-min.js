"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

!function (n) {
  function t() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    n(".parallax").length && n(".parallax").parallax();
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.initParallax = {
      attach: function attach(e) {
        n("body", e).once("initParallax").each(function () {
          t(e);
        });
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    t();
  });
}(jQuery), function (n) {
  function t() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    n(".input--date-picker").length && n(".input--date-picker").find("input").datepicker();
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.initDatepicker = {
      attach: function attach(e) {
        n("body", e).once("initDatepicker").each(function () {
          t(e);
        });
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    t();
  });
}(jQuery), function (n) {
  function t(t) {
    n("select").each(function () {
      n(this).select2({
        minimumResultsForSearch: 10
      }), "" != n(this).val() && n(this).siblings(".select2-container").addClass("no-clear selection-made");
    }), n("select").change(function (t, e) {
      t.target.multiple || (n(this).siblings(".select2-container").addClass("selection-made"), n(this).siblings(".select2-container").find(".single-clear").length || "true" == n(this).attr("data-select-all-times") || n(this).siblings(".select2-container").append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>'));
    }), n("select").on("select2:open", function (t) {
      n(".select2-container").find(".select2-search__field").attr("aria-label", "Search for choices"), n(".select2-container").find(".select2-results__options").attr("aria-label", "Available choices");
    }), n(document).on("click", ".single-clear", function (t) {
      t.stopPropagation();
      var e = n(this).parent().siblings("select");
      e.prop("selectedIndex", 0);
      var i = e.attr("data-placeholder");
      n(this).parent().removeClass("selection-made"), n(this).siblings(".selection").find(".select2-selection__rendered").text(i), n(this).remove();
    });
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.inputSelect = {
      attach: function attach(n) {
        t();
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    t();
  });
}(jQuery), function (n) {
  function t(t) {
    n("#tab--mockup").attr("tabindex", "-1");
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.layoutsTabs = {
      attach: function attach(n) {
        t();
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    t();
  });
}(jQuery), function (n) {
  function t() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    n('a[href^="mailto:"]').each(function () {
      n(this).addClass("link--external--mail");
    });
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.initMailto = {
      attach: function attach(e) {
        n("body", e).once("initMailto").each(function () {
          t(e);
        });
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    n("a:not(:has(img))").each(function () {
      if (n(this).text()) {
        var t = n(this).attr("href"),
            e = this.hostname;
        t && e !== location.hostname && ((t = t.toLowerCase()).indexOf("http://") > -1 || t.indexOf("https://") > -1) && t.indexOf("localhost:3002") <= 0 && (n(this).attr("target", "_blank"), n(this).after('<a aria-label="Read More about External Link policy" class="ext-link-icon" href="#"></a>'));
      }
    }), t();
  });
}(jQuery), function (n) {
  function t(t) {
    n("table").each(function () {
      var t = {
        responsive: !0,
        paging: !1,
        info: !1,
        autoWidth: !1,
        searching: !1
      };
      if ("true" != n(this).attr("data-tablesort")) t.ordering = !1;else {
        var e = [];
        n(this).find("thead").find("th").each(function (t) {
          "true" == n(this).attr("data-column-num") && e.push({
            type: "natural",
            targets: t
          });
        }), t.columnDefs = e;
      }
      n(this).dataTable(t);
    });
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.table = {
      attach: function attach(e) {
        n(".page-body", e).once("vnext-table-default").each(function () {
          t();
        });
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    t();
  });
}(jQuery), function (n) {
  function t(t) {
    n(".card-header", t).keypress(function (t) {
      13 == t.which && n(this).click();
    });
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.initLocalNav = {
      attach: function attach(e) {
        n(".page", e).once("niaid-local-navigation").each(function () {
          t(e);
        });
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    t();
  });
}(jQuery), function (n) {
  function t() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    n(".pushpin").length && n(".pushpin").each(function () {
      var t = n(this),
          e = n("#" + n(this).attr("data-target"));
      t.pushpin({
        top: e.offset().top,
        bottom: e.offset().top + e.outerHeight() - t.height()
      });
    });
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.initPushpin = {
      attach: function attach(e) {
        n("body", e).once("initPushpin").each(function () {
          t(e);
        });
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    t();
  });
}(jQuery), function (n) {
  function t() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    n(".scrollspy").length && n(".scrollspy").scrollSpy();
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.initScrollspy = {
      attach: function attach(e) {
        n("body", e).once("initScrollspy").each(function () {
          t(e);
        });
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    t();
  });
}(jQuery), function (n) {
  function t(t) {
    var e = {
      headings: "public-sans",
      body: "public-sans",
      colors: "theme-1",
      corners: "semirounded"
    };

    function i(t, e, i) {
      var a,
          o,
          c = t.val();
      return n("body").removeClass("style--" + e + "--" + i[e]), n("body").addClass("style--" + e + "--" + c), a = i, o = _defineProperty({}, e, c), _objectSpread(_objectSpread({}, a), o);
    }

    n("#text-heading").on("change", function () {
      e = i(n(this), "headings", e);
    }), n("#text-body").on("change", function () {
      e = i(n(this), "body", e);
    }), n("#color-select").on("change", function () {
      e = i(n(this), "colors", e);
    }), n("#shadows").on("change", function () {
      "shadows" == n(this).val() ? n("body").addClass("style--shadows") : n("body").removeClass("style--shadows");
    }), n("#corners").on("change", function () {
      e = i(n(this), "corners", e);
    });
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.init_style_controls = {
      attach: function attach(e) {
        n(".page", e).once("nds-style-controls").each(function () {
          t();
        });
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    t();
  });
}(jQuery), function (n) {
  function t(t) {
    n("#form--upload__input").change(function (t) {
      var e = n("#output"),
          i = URL.createObjectURL(t.target.files[0]);
      n(e).attr("src", i), n(".component--branding__vertical-bar").css("display", "inline-block"), n(".component--branding__logo").attr("src", i), n(".component--branding__logo").attr("alt", "Web Property Branding");
    });
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.formUpload = {
      attach: function attach(n) {
        t();
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    t();
  });
}(jQuery), function (n) {
  function t() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    window.matchMedia("all and (max-width: 950px)");
    var i = n(window).width();
    n("#global-mobile-menu").on("click", function () {
      n("#main-navigation-mobile").addClass("drawer--open"), n("#main-navigation-mobile").siblings(".navigation--drawer--overlay").show(), n(".navigation--drawer__top__button-close").focus(), n("#main-navigation-mobile").find("a, button").each(function () {
        n(this).attr("tabindex", "0");
      });
    }), n(".navigation--drawer--overlay").on("click", function () {
      n(this).hide(), e();
    }), n(".navigation--drawer__top__button-close").on("click", function () {
      e();
    }), n(window).resize(function () {
      i != n(this).width() && (i = n(this).width(), e());
    }), n(".skip-to--top").on("focus", function () {
      n(".navigation--drawer__top__button-close").focus();
    }), n(".skip-to--back").on("focus", function () {
      var t = n(".navigation--drawer__inner").find("a:visible, button:visible");
      n(t[t.length - 1]).focus();
    });
  }

  function e() {
    n("#global-mobile-menu").focus(), n("#main-navigation-mobile").removeClass("drawer--open"), n("#main-navigation-mobile").siblings(".navigation--drawer--overlay").hide(), n("#main-navigation-mobile").find("a, button").each(function () {
      n(this).attr("tabindex", "-1");
    });
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.initNavigationDrawer = {
      attach: function attach(e) {
        n("body", e).once("initNavigationDrawer").each(function () {
          t(e);
        });
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    t();
  });
}(jQuery), function (n) {
  function t(t) {
    var e = window.matchMedia("all and (max-width: 990.0625rem)"),
        i = n(window).width();
    e.matches ? n("#localNavMobileTarget").collapse("hide") : n("#localNavMobileTarget").collapse("show"), n(window).resize(function () {
      i != n(this).width() && (i = n(this).width(), e.matches ? n("#localNavMobileTarget").collapse("hide") : n("#localNavMobileTarget").collapse("show"));
    });
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.localNav = {
      attach: function attach(n) {
        t();
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    t();
  });
}(jQuery), function (n) {
  function t() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    window.matchMedia("all and (max-width: 950px)"), n(window).width();
  }

  "undefined" != typeof Drupal ? function (n, e) {
    e.behaviors.initMobileRail = {
      attach: function attach(e) {
        n("body", e).once("initMobileRail").each(function () {
          t(e);
        });
      }
    };
  }(jQuery, Drupal) : n(document).ready(function () {
    t();
  });
}(jQuery);