"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

!function (t) {
  function o() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t(".component--snippet__block__code__snippet").each(function () {
      var o,
          n,
          e = t(this).find("pre").html().replace(/(\r\n|\n|\r)/gm, "");
      t(this).find("pre").empty(), t(this).find("pre").text((o = e, (n = document.createElement("div")).innerHTML = o.trim(), function t(o, n) {
        for (var e, i = new Array(1 + n++).join("  "), a = new Array(n - 1).join("  "), c = 0; c < o.children.length; c++) {
          e = document.createTextNode("\n" + i), o.insertBefore(e, o.children[c]), t(o.children[c], n), o.lastElementChild == o.children[c] && (e = document.createTextNode("\n" + a), o.appendChild(e));
        }

        return o;
      }(n, 0).innerHTML));
    });
  }

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.initComponentSnippet = {
      attach: function attach(n) {
        t("body", n).once("nds-component-snippet").each(function () {
          o(n);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    o();
  });
}(jQuery), function (t) {
  function o() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t(window).ready(function () {
      stickybits(".component--accordion", {
        useStickyClasses: !0,
        stickyBitStickyOffset: 24
      });
      var t = stickybits(".component--accordion");
      window.addEventListener("resize", function () {
        console.log("resize"), t.update({
          useStickyClasses: !0,
          stickyBitStickyOffset: 24
        });
      });
    });
  }

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.initComponentStickybits = {
      attach: function attach(n) {
        t("body", n).once("nds-component-stickybits").each(function () {
          o(n);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    o();
  });
}(jQuery), function (t) {
  function o(o) {
    t("#custom-styles-toggle").on("click", function () {
      t(".component--style-controls").toggleClass("component--style-controls--open"), t(".component--style-controls").hasClass("component--style-controls--open") ? t("body").css("padding-top", t(".component--style-controls").outerHeight() + "px") : t("body").css("padding-top", 0);
    });
    var n = {
      headings: "public-sans",
      body: "public-sans",
      colors: "theme-1",
      corners: "semirounded"
    };

    function e(o, n, e) {
      var i,
          a,
          c = o.val();
      return t("body").removeClass("style--" + n + "--" + e[n]), t("body").addClass("style--" + n + "--" + c), i = e, a = _defineProperty({}, n, c), _objectSpread({}, i, {}, a);
    }

    t("#text-heading").on("change", function () {
      n = e(t(this), "headings", n);
    }), t("#text-body").on("change", function () {
      n = e(t(this), "body", n);
    }), t("#color-select").on("change", function () {
      n = e(t(this), "colors", n);
    }), t("#shadows").on("change", function () {
      "shadows" == t(this).val() ? t("body").addClass("style--shadows") : t("body").removeClass("style--shadows");
    }), t("#corners").on("change", function () {
      n = e(t(this), "corners", n);
    });
  }

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.init_style_controls = {
      attach: function attach(n) {
        t(".page", n).once("nds-style-controls").each(function () {
          o();
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    t("#builder").length || o();
  });
}(jQuery), function (t) {
  function o(o) {
    t("#tab--mockup").attr("tabindex", "-1");
  }

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.layoutsTabs = {
      attach: function attach(t) {
        o();
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    o();
  });
}(jQuery), $(document).ready(function () {
  $("a:not(:has(img))").each(function () {
    if ($(this).text()) {
      var t = $(this).attr("href"),
          o = this.hostname;
      t && o !== location.hostname && ((t = t.toLowerCase()).indexOf("http://") > -1 || t.indexOf("https://") > -1) && t.indexOf("localhost:3002") <= 0 && ($(this).attr("target", "_blank"), $(this).after('<a title="Link is External" aria-label="Link is External" class="ext-link-icon" href="' + t + '"></a>'));
    }
  }), $('a[href^="mailto:"]').each(function () {
    $(this).addClass("link--external--mail");
  });
}), function (t) {
  function o(o) {
    window.matchMedia("all and (max-width: 991px)");
    var c = {
      tab: "mockup",
      heading: "roboto",
      body: "roboto",
      colors: "theme-1",
      shadows: "false",
      corners: "semirounded",
      hero: "false",
      productIDTop: "",
      productIDBottom: ""
    },
        s = a(window.location.href);

    function r(o) {
      var e = t("input[name='headings']:checked").val();
      return t("body").removeClass("style--headings--" + o.heading), t("body").addClass("style--headings--" + e), n(o, {
        heading: e
      });
    }

    function l(o) {
      var e = t("input[name='body']:checked").val();
      return t("body").removeClass("style--body--" + o.body), t("body").addClass("style--body--" + e), n(o, {
        body: e
      });
    }

    function d(o) {
      var e = t("input[name='colors']:checked").val();
      return t("body").removeClass("style--colors--" + o.colors), t("body").addClass("style--colors--" + e), i(e), n(o, {
        colors: e
      });
    }

    function u(o) {
      return "shadows" == t("input[name='shadow']:checked").val() ? (t("body").addClass("style--shadows"), n(o, {
        shadows: "true"
      })) : (t("body").removeClass("style--shadows"), n(o, {
        shadows: "false"
      }));
    }

    function h(o) {
      var e = t("input[name='corners']:checked").val();
      return "rounded" == e ? (t("body").removeClass("style--corners--semirounded").addClass("style--corners--rounded"), n(o, {
        corners: "rounded"
      })) : "semirounded" == e ? (t("body").removeClass("style--corners--rounded").addClass("style--corners--semirounded"), n(o, {
        corners: "semirounded"
      })) : (t("body").removeClass("style--corners--rounded style--corners--semirounded"), n(o, {
        corners: "straight"
      }));
    }

    function p(o) {
      return "yes" == t("input[name='hero']:checked").val() ? (t("#block--hero").show(), t("body").addClass("style--hero"), n(o, {
        hero: "true"
      })) : (t("#block--hero").hide(), t("body").removeClass("style--hero"), n(o, {
        hero: "false"
      }));
    }

    function f(o, e, i) {
      return t(".layouts--tabs__tab").each(function () {
        t(this).removeClass("active-tab"), t(this).attr("tabindex", "0");
      }), t(".layouts--tabs__window").each(function () {
        t(this).hide();
      }), "mockup" == i ? t("#layouts--tabs__mockup").show() : t("#layouts--tabs__style-tile").show(), t(e).addClass("active-tab"), t(e).attr("tabindex", "-1"), t("table").each(function () {
        t(this).hasClass("dataTable") && t(this).DataTable().columns.adjust().responsive.recalc();
      }), n(o, {
        tab: i
      });
    }

    (function (o) {
      t(".layouts--tabs__tab").each(function () {
        t(this).removeClass("active-tab"), t(this).attr("tabindex", "0");
      }), t(".layouts--tabs__window").each(function () {
        t(this).hide();
      }), "st" == o.tab ? (t("#tab--style-tile").addClass("active-tab"), t("#tab--style-tile").attr("tabindex", "-1"), t("#layouts--tabs__style-tile").show()) : (t("#tab--mockup").addClass("active-tab"), t("#tab--mockup").attr("tabindex", "-1"), t("#layouts--tabs__mockup").show());
      t(".form--controls--headings input[value=" + o.heading + "]").click(), t(".form--controls--body input[value=" + o.body + "]").click(), t(".form--controls--colors input[value=" + o.colors + "]").click(), i(o.colors), "true" == o.shadows ? (t("body").addClass("style--shadows"), t(".form--controls--shadows input[value=shadows]").click()) : (t("body").removeClass("style--shadows"), t(".form--controls--shadows input[value=no_shadows]").click());
      "rounded" == o.corners ? (t("body").removeClass("style--corners--semirounded").addClass("style--corners--rounded"), t(".form--controls--corners input[value=rounded]").click()) : "semirounded" == o.corners ? (t("body").removeClass("style--corners--rounded").addClass("style--corners--semirounded"), t(".form--controls--corners input[value=semirounded]").click()) : (t("body").removeClass("style--corners--rounded style--corners--semirounded"), t(".form--controls--corners input[value=straight]").click());
      "true" == o.hero ? (t("#block--hero").show(), t("#block--header").hide(), t("body").addClass("style--hero"), t(".form--controls--hero input[value=yes]").click()) : (t("#block--hero").hide(), t("#block--header").show(), t("body").removeClass("style--hero"), t(".form--controls--hero input[value=no]").click());
      "" != o.productIDTop && (t("#form--product-identity__inputs__top").val(o.productIDTop), t(".main").find(".component--product-identity__top").text(o.productIDTop));
      "" != o.productIDBottom && (t("#form--product-identity__inputs__bottom").val(o.productIDBottom), t(".main").find(".component--product-identity__bottom").text(o.productIDBottom));
      "" == o.productIDTop && "" == o.productIDBottom || t(".main").find(".component--branding__vertical-bar").css("display", "inline-block");
    })(c = n(c, s)), t("body").addClass("style--headings--" + c.heading), t(".form--controls--headings input[type='radio']").click(function () {
      c = r(c);
    }), t(".form--controls--headings label", o).keypress(function (o) {
      13 == o.which && (t(this).siblings("input").prop("checked", !0), c = r(c));
    }), t("body").addClass("style--body--" + c.body), t(".form--controls--body input[type='radio']").click(function () {
      c = l(c);
    }), t(".form--controls--body label", o).keypress(function (o) {
      13 == o.which && (t(this).siblings("input").prop("checked", !0), c = l(c));
    }), t("body").addClass("style--colors--" + c.colors), t(".form--controls--colors input[type='radio']").click(function () {
      c = d(c);
    }), t(".block--palette").click(function () {
      var o = t(this).attr("class").split(" "),
          e = o[o.length - 1];
      t("input[name='colors'][value=" + e + "]").prop("checked", !0), t("body").removeClass("style--colors--" + c.colors), t("body").addClass("style--colors--" + e), i(e), c = n(c, {
        colors: e
      });
    }), t(".form--controls--colors label", o).keypress(function (o) {
      13 == o.which && (t(this).siblings("input").prop("checked", !0), c = d(c));
    }), t(".form--controls--shadows input[type='radio']").click(function () {
      c = u(c);
    }), t(".form--controls--shadows label", o).keypress(function (o) {
      13 == o.which && (t(this).siblings("input").prop("checked", !0), c = u(c));
    }), t(".form--controls--corners input[type='radio']").click(function () {
      c = h(c);
    }), t(".form--controls--corners label", o).keypress(function (o) {
      13 == o.which && (t(this).siblings("input").prop("checked", !0), c = h(c));
    }), t(".form--controls--hero input[type='radio']").click(function () {
      c = p(c);
    }), t(".form--controls--hero label", o).keypress(function (o) {
      13 == o.which && (t(this).siblings("input").prop("checked", !0), c = p(c));
    }), t("#tab--mockup", o).click(function () {
      c = f(c, this, "mockup");
    }), t("#tab--style-tile", o).click(function () {
      c = f(c, this, "st");
    }), t("#tab--mockup", o).keypress(function (t) {
      13 == t.which && (c = f(c, this, "mockup"));
    }), t("#tab--style-tile", o).keypress(function (t) {
      13 == t.which && (c = f(c, this, "st"));
    }), t("#form--product-identity__inputs__top").on("input", function () {
      c = e(c, this);
    }), t("#form--product-identity__inputs__bottom").on("input", function () {
      c = e(c, this);
    }), t(".button--generate-link").click(function () {
      var o, n;
      t(".builder--side-drawer__copied").css("opacity", 0), function (o) {
        var n = "?",
            e = !0;
        Object.keys(o).forEach(function (t) {
          o[t] && (e ? (n += t + "=" + o[t], e = !1) : "undefined" != o[t] && (n += "&" + t + "=" + o[t]));
        });
        var i = window.location.href.split("?")[0];
        t(".builder--side-drawer__link").text(i + n);
      }(c), o = ".builder--side-drawer__link", n = t("<input>"), t("body").append(n), n.val(t(o).text()).select(), document.execCommand("copy"), n.remove(), t(".builder--side-drawer__copied").css("opacity", 1), setTimeout(function () {
        t(".builder--side-drawer__copied").css("opacity", 0);
      }, 2e3);
    });
  }

  function n(t, o) {
    return _objectSpread({}, t, {}, o);
  }

  function e(o, e) {
    if ("" == t("#form--product-identity__inputs__top").val() && "" == t("#form--product-identity__inputs__bottom").val()) t(".main").find(".component--branding__vertical-bar").css("display", "none"), t(".main").find(".component--product-identity__top").text(""), t(".main").find(".component--product-identity__bottom").text("");else {
      if (t(".main").find(".component--branding__vertical-bar").css("display", "inline-block"), "form--product-identity__inputs__top" == e.name) return t(".main").find(".component--product-identity__top").text(e.value), n(o, {
        productIDTop: e.value
      });
      if ("form--product-identity__inputs__bottom" == e.name) return t(".main").find(".component--product-identity__bottom").text(e.value), n(o, {
        productIDBottom: e.value
      });
    }
  }

  function i(o) {
    t(".block--palette." + o).find(".block--palette__color").each(function (o) {
      if (3 != o) {
        var n = (i = (i = t(this).css("background-color")).match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === i.length ? "#" + ("0" + parseInt(i[1], 10).toString(16)).slice(-2) + ("0" + parseInt(i[2], 10).toString(16)).slice(-2) + ("0" + parseInt(i[3], 10).toString(16)).slice(-2) : "",
            e = ".indicator-color--" + (o + 1);
        t(e).find(".global--color-indicator__color").css("background", n), t(e).find(".global--color-indicator__hex").text(n.toUpperCase());
      }

      var i;
    });
  }

  var a = function a(t) {
    var o = {},
        n = document.createElement("a");
    n.href = t;

    for (var e = n.search.substring(1).split("&"), i = 0; i < e.length; i++) {
      var a = e[i].split("=");
      o[a[0]] = decodeURIComponent(a[1]);
    }

    return o;
  };

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.buildControls = {
      attach: function attach(t) {
        o(t);
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    t("#builder").length && o();
  });
}(jQuery), function (t) {
  function o() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t(".input--date-picker").length && t(".input--date-picker").find("input").datepicker();
  }

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.initInputDatePicker = {
      attach: function attach(n) {
        t("body", n).once("nds-input-date-picker").each(function () {
          o(n);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    o();
  });
}(jQuery), function (t) {
  function o() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t("select").each(function () {
      t(this).select2({
        minimumResultsForSearch: 10
      }), "" != t(this).val() && t(this).siblings(".select2-container").addClass("no-clear selection-made");
    }), t("select").change(function (o, n) {
      o.target.multiple || (t(this).siblings(".select2-container").addClass("selection-made"), t(this).siblings(".select2-container").find(".single-clear").length || "true" == t(this).attr("data-select-all-times") || t(this).siblings(".select2-container").append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>'));
    }), t("select").on("select2:open", function (o) {
      t(".select2-container").find(".select2-search__field").attr("aria-label", "Search for choices"), t(".select2-container").find(".select2-results__options").attr("aria-label", "Available choices");
    }), t(document).on("click", ".single-clear", function (o) {
      o.stopPropagation();
      var n = t(this).parent().siblings("select");
      n.prop("selectedIndex", 0);
      var e = n.attr("data-placeholder");
      t(this).parent().removeClass("selection-made"), t(this).siblings(".selection").find(".select2-selection__rendered").text(e), t(this).remove();
    });
  }

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.initInputSelect = {
      attach: function attach(n) {
        t("body", n).once("nds-input-select").each(function () {
          o(n);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    o();
  });
}(jQuery), function (t) {
  function o() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t("table").each(function () {
      var o = {
        responsive: !0,
        paging: !1,
        info: !1,
        autoWidth: !1,
        searching: !1
      };
      if ("true" != t(this).attr("data-tablesort")) o.ordering = !1;else {
        var n = [];
        t(this).find("thead").find("th").each(function (o) {
          "true" == t(this).attr("data-column-num") && n.push({
            type: "natural",
            targets: o
          });
        }), o.columnDefs = n;
      }
      t(this).dataTable(o);
    });
  }

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.initTableDefault = {
      attach: function attach(n) {
        t("body", n).once("nds-table-default").each(function () {
          o(n);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    o();
  });
}(jQuery), function (t) {
  function o() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t(".parallax").length && t(".parallax").parallax();
  }

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.initBlockHero = {
      attach: function attach(n) {
        t("body", n).once("nds-block-hero").each(function () {
          o(n);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    o();
  });
}(jQuery), function (t) {
  function o() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t(".materialboxed").length && t(".materialboxed").materialbox();
  }

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.initComponentLightbox = {
      attach: function attach(n) {
        t("body", n).once("nds-component-lightbox").each(function () {
          o(n);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    o();
  });
}(jQuery), function (t) {
  function o() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t(".card-header", o).keypress(function (o) {
      13 == o.which && t(this).click();
    });
  }

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.initComponentLocalNavigation = {
      attach: function attach(n) {
        t("body", n).once("nds-component-local-navigation").each(function () {
          o(n);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    o();
  });
}(jQuery), function (t) {
  function o() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t(".scrollspy").length && t(".scrollspy").scrollSpy();
  }

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.initComponentScrollspySection = {
      attach: function attach(n) {
        t("body", n).once("nds-component-scrollspy-section").each(function () {
          o(n);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    o();
  });
}(jQuery), function (t) {
  function o() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var e = t(window).width();
    t("#global-mobile-menu").on("click", function () {
      t("#main-navigation-mobile").addClass("drawer--open"), t("#main-navigation-mobile").siblings(".navigation--drawer--overlay").show(), t(".navigation--drawer__top__button-close").focus(), t("#main-navigation-mobile").find("a, button").each(function () {
        t(this).attr("tabindex", "0");
      });
    }), t(".navigation--drawer--overlay").on("click", function () {
      t(this).hide(), n();
    }), t(".navigation--drawer__top__button-close").on("click", function () {
      n();
    }), t(window).resize(function () {
      e != t(this).width() && (e = t(this).width(), n());
    }), t(".skip-to--top").on("focus", function () {
      t(".navigation--drawer__top__button-close").focus();
    }), t(".skip-to--back").on("focus", function () {
      var o = t(".navigation--drawer__inner").find("a:visible, button:visible");
      t(o[o.length - 1]).focus();
    });
  }

  function n() {
    t("#global-mobile-menu").focus(), t("#main-navigation-mobile").removeClass("drawer--open"), t("#main-navigation-mobile").siblings(".navigation--drawer--overlay").hide(), t("#main-navigation-mobile").find("a, button").each(function () {
      t(this).attr("tabindex", "-1");
    });
  }

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.initNavigationDrawer = {
      attach: function attach(n) {
        t("body", n).once("nds-navigation-drawer").each(function () {
          o(n);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    o();
  });
}(jQuery), function (t) {
  function o() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var n = window.matchMedia("all and (max-width: 990.0625rem)"),
        e = t(window).width();
    n.matches ? t("#localNavMobileTarget").collapse("hide") : t("#localNavMobileTarget").collapse("show"), t(window).resize(function () {
      e != t(this).width() && (e = t(this).width(), n.matches ? t("#localNavMobileTarget").collapse("hide") : t("#localNavMobileTarget").collapse("show"));
    });
  }

  "undefined" != typeof Drupal ? function (t, n) {
    n.behaviors.initNavigationLocal = {
      attach: function attach(n) {
        t("body", n).once("nds-navigation-local").each(function () {
          o(n);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    o();
  });
}(jQuery);