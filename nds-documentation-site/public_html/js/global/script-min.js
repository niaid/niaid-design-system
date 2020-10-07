"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

!function (t) {
  function n() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t(".scrollspy").length && t(".scrollspy").scrollSpy();
  }

  "undefined" != typeof Drupal ? function (t, o) {
    o.behaviors.initComponentScrollspySection = {
      attach: function attach(o) {
        t("body", o).once("nds-component-scrollspy-section").each(function () {
          n(o);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    n();
  });
}(jQuery), function (t) {
  function n() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t(".component--snippet__block__code__snippet").each(function () {
      var n,
          o,
          e = t(this).find("pre").html().replace(/(\r\n|\n|\r)/gm, "");
      t(this).find("pre").empty(), t(this).find("pre").text((n = e, (o = document.createElement("div")).innerHTML = n.trim(), function t(n, o) {
        for (var e, i = new Array(1 + o++).join("  "), a = new Array(o - 1).join("  "), c = 0; c < n.children.length; c++) {
          e = document.createTextNode("\n" + i), n.insertBefore(e, n.children[c]), t(n.children[c], o), n.lastElementChild == n.children[c] && (e = document.createTextNode("\n" + a), n.appendChild(e));
        }

        return n;
      }(o, 0).innerHTML));
    }), t(".component--snippet").find(".button--icon").on("click", function () {
      !function (t) {
        var n = t.text(),
            o = document.createElement("textarea");
        o.classList.add("hidden-textarea"), o.textContent = n, document.body.append(o), o.select(), document.execCommand("copy"), o.remove();
      }(t(this).parentsUntil(".component--snippet").parent().find("pre"));
    });
  }

  "undefined" != typeof Drupal ? function (t, o) {
    o.behaviors.initComponentSnippet = {
      attach: function attach(o) {
        t("body", o).once("nds-component-snippet").each(function () {
          n(o);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    n();
  });
}(jQuery), function (t) {
  function n(n) {
    t("#custom-styles-toggle").on("click", function () {
      t(".component--style-controls").toggleClass("component--style-controls--open"), t(".component--style-controls").hasClass("component--style-controls--open") ? t("body").css("padding-top", t(".component--style-controls").outerHeight() + "px") : t("body").css("padding-top", 0);
    });
    var o = {
      headings: "public-sans",
      body: "public-sans",
      colors: "theme-1",
      corners: "semirounded"
    };

    function e(n, o, e) {
      var i,
          a,
          c = n.val();
      return t("body").removeClass("style--" + o + "--" + e[o]), t("body").addClass("style--" + o + "--" + c), i = e, a = _defineProperty({}, o, c), _objectSpread({}, i, {}, a);
    }

    t("#text-heading").on("change", function () {
      o = e(t(this), "headings", o);
    }), t("#text-body").on("change", function () {
      o = e(t(this), "body", o);
    }), t("#color-select").on("change", function () {
      o = e(t(this), "colors", o);
    }), t("#shadows").on("change", function () {
      "shadows" == t(this).val() ? t("body").addClass("style--shadows") : t("body").removeClass("style--shadows");
    }), t("#corners").on("change", function () {
      o = e(t(this), "corners", o);
    });
  }

  "undefined" != typeof Drupal ? function (t, o) {
    o.behaviors.init_style_controls = {
      attach: function attach(o) {
        t(".page", o).once("nds-style-controls").each(function () {
          n();
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    t("#builder").length || n();
  });
}(jQuery), function (t) {
  function n(n) {
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

    function r(n) {
      var e = t("input[name='headings']:checked").val();
      return t("body").removeClass("style--headings--" + n.heading), t("body").addClass("style--headings--" + e), o(n, {
        heading: e
      });
    }

    function l(n) {
      var e = t("input[name='body']:checked").val();
      return t("body").removeClass("style--body--" + n.body), t("body").addClass("style--body--" + e), o(n, {
        body: e
      });
    }

    function d(n) {
      var e = t("input[name='colors']:checked").val();
      return t("body").removeClass("style--colors--" + n.colors), t("body").addClass("style--colors--" + e), i(e), o(n, {
        colors: e
      });
    }

    function u(n) {
      return "shadows" == t("input[name='shadow']:checked").val() ? (t("body").addClass("style--shadows"), o(n, {
        shadows: "true"
      })) : (t("body").removeClass("style--shadows"), o(n, {
        shadows: "false"
      }));
    }

    function p(n) {
      var e = t("input[name='corners']:checked").val();
      return "rounded" == e ? (t("body").removeClass("style--corners--semirounded").addClass("style--corners--rounded"), o(n, {
        corners: "rounded"
      })) : "semirounded" == e ? (t("body").removeClass("style--corners--rounded").addClass("style--corners--semirounded"), o(n, {
        corners: "semirounded"
      })) : (t("body").removeClass("style--corners--rounded style--corners--semirounded"), o(n, {
        corners: "straight"
      }));
    }

    function h(n) {
      return "yes" == t("input[name='hero']:checked").val() ? (t("#block--hero").show(), t("body").addClass("style--hero"), o(n, {
        hero: "true"
      })) : (t("#block--hero").hide(), t("body").removeClass("style--hero"), o(n, {
        hero: "false"
      }));
    }

    function f(n, e, i) {
      return t(".layouts--tabs__tab").each(function () {
        t(this).removeClass("active-tab"), t(this).attr("tabindex", "0");
      }), t(".layouts--tabs__window").each(function () {
        t(this).hide();
      }), "mockup" == i ? t("#layouts--tabs__mockup").show() : t("#layouts--tabs__style-tile").show(), t(e).addClass("active-tab"), t(e).attr("tabindex", "-1"), t("table").each(function () {
        t(this).hasClass("dataTable") && t(this).DataTable().columns.adjust().responsive.recalc();
      }), o(n, {
        tab: i
      });
    }

    (function (n) {
      t(".layouts--tabs__tab").each(function () {
        t(this).removeClass("active-tab"), t(this).attr("tabindex", "0");
      }), t(".layouts--tabs__window").each(function () {
        t(this).hide();
      }), "st" == n.tab ? (t("#tab--style-tile").addClass("active-tab"), t("#tab--style-tile").attr("tabindex", "-1"), t("#layouts--tabs__style-tile").show()) : (t("#tab--mockup").addClass("active-tab"), t("#tab--mockup").attr("tabindex", "-1"), t("#layouts--tabs__mockup").show());
      t(".form--controls--headings input[value=" + n.heading + "]").click(), t(".form--controls--body input[value=" + n.body + "]").click(), t(".form--controls--colors input[value=" + n.colors + "]").click(), i(n.colors), "true" == n.shadows ? (t("body").addClass("style--shadows"), t(".form--controls--shadows input[value=shadows]").click()) : (t("body").removeClass("style--shadows"), t(".form--controls--shadows input[value=no_shadows]").click());
      "rounded" == n.corners ? (t("body").removeClass("style--corners--semirounded").addClass("style--corners--rounded"), t(".form--controls--corners input[value=rounded]").click()) : "semirounded" == n.corners ? (t("body").removeClass("style--corners--rounded").addClass("style--corners--semirounded"), t(".form--controls--corners input[value=semirounded]").click()) : (t("body").removeClass("style--corners--rounded style--corners--semirounded"), t(".form--controls--corners input[value=straight]").click());
      "true" == n.hero ? (t("#block--hero").show(), t("#block--header").hide(), t("body").addClass("style--hero"), t(".form--controls--hero input[value=yes]").click()) : (t("#block--hero").hide(), t("#block--header").show(), t("body").removeClass("style--hero"), t(".form--controls--hero input[value=no]").click());
      "" != n.productIDTop && (t("#form--product-identity__inputs__top").val(n.productIDTop), t(".main").find(".component--product-identity__top").text(n.productIDTop));
      "" != n.productIDBottom && (t("#form--product-identity__inputs__bottom").val(n.productIDBottom), t(".main").find(".component--product-identity__bottom").text(n.productIDBottom));
      "" == n.productIDTop && "" == n.productIDBottom || t(".main").find(".component--branding__vertical-bar").css("display", "inline-block");
    })(c = o(c, s)), t("body").addClass("style--headings--" + c.heading), t(".form--controls--headings input[type='radio']").click(function () {
      c = r(c);
    }), t(".form--controls--headings label", n).keypress(function (n) {
      13 == n.which && (t(this).siblings("input").prop("checked", !0), c = r(c));
    }), t("body").addClass("style--body--" + c.body), t(".form--controls--body input[type='radio']").click(function () {
      c = l(c);
    }), t(".form--controls--body label", n).keypress(function (n) {
      13 == n.which && (t(this).siblings("input").prop("checked", !0), c = l(c));
    }), t("body").addClass("style--colors--" + c.colors), t(".form--controls--colors input[type='radio']").click(function () {
      c = d(c);
    }), t(".block--palette").click(function () {
      var n = t(this).attr("class").split(" "),
          e = n[n.length - 1];
      t("input[name='colors'][value=" + e + "]").prop("checked", !0), t("body").removeClass("style--colors--" + c.colors), t("body").addClass("style--colors--" + e), i(e), c = o(c, {
        colors: e
      });
    }), t(".form--controls--colors label", n).keypress(function (n) {
      13 == n.which && (t(this).siblings("input").prop("checked", !0), c = d(c));
    }), t(".form--controls--shadows input[type='radio']").click(function () {
      c = u(c);
    }), t(".form--controls--shadows label", n).keypress(function (n) {
      13 == n.which && (t(this).siblings("input").prop("checked", !0), c = u(c));
    }), t(".form--controls--corners input[type='radio']").click(function () {
      c = p(c);
    }), t(".form--controls--corners label", n).keypress(function (n) {
      13 == n.which && (t(this).siblings("input").prop("checked", !0), c = p(c));
    }), t(".form--controls--hero input[type='radio']").click(function () {
      c = h(c);
    }), t(".form--controls--hero label", n).keypress(function (n) {
      13 == n.which && (t(this).siblings("input").prop("checked", !0), c = h(c));
    }), t("#tab--mockup", n).click(function () {
      c = f(c, this, "mockup");
    }), t("#tab--style-tile", n).click(function () {
      c = f(c, this, "st");
    }), t("#tab--mockup", n).keypress(function (t) {
      13 == t.which && (c = f(c, this, "mockup"));
    }), t("#tab--style-tile", n).keypress(function (t) {
      13 == t.which && (c = f(c, this, "st"));
    }), t("#form--product-identity__inputs__top").on("input", function () {
      c = e(c, this);
    }), t("#form--product-identity__inputs__bottom").on("input", function () {
      c = e(c, this);
    }), t(".button--generate-link").click(function () {
      var n, o;
      t(".builder--side-drawer__copied").css("opacity", 0), function (n) {
        var o = "?",
            e = !0;
        Object.keys(n).forEach(function (t) {
          n[t] && (e ? (o += t + "=" + n[t], e = !1) : "undefined" != n[t] && (o += "&" + t + "=" + n[t]));
        });
        var i = window.location.href.split("?")[0];
        t(".builder--side-drawer__link").text(i + o);
      }(c), n = ".builder--side-drawer__link", o = t("<input>"), t("body").append(o), o.val(t(n).text()).select(), document.execCommand("copy"), o.remove(), t(".builder--side-drawer__copied").css("opacity", 1), setTimeout(function () {
        t(".builder--side-drawer__copied").css("opacity", 0);
      }, 2e3);
    });
  }

  function o(t, n) {
    return _objectSpread({}, t, {}, n);
  }

  function e(n, e) {
    if ("" == t("#form--product-identity__inputs__top").val() && "" == t("#form--product-identity__inputs__bottom").val()) t(".main").find(".component--branding__vertical-bar").css("display", "none"), t(".main").find(".component--product-identity__top").text(""), t(".main").find(".component--product-identity__bottom").text("");else {
      if (t(".main").find(".component--branding__vertical-bar").css("display", "inline-block"), "form--product-identity__inputs__top" == e.name) return t(".main").find(".component--product-identity__top").text(e.value), o(n, {
        productIDTop: e.value
      });
      if ("form--product-identity__inputs__bottom" == e.name) return t(".main").find(".component--product-identity__bottom").text(e.value), o(n, {
        productIDBottom: e.value
      });
    }
  }

  function i(n) {
    t(".block--palette." + n).find(".block--palette__color").each(function (n) {
      if (3 != n) {
        var o = (i = (i = t(this).css("background-color")).match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === i.length ? "#" + ("0" + parseInt(i[1], 10).toString(16)).slice(-2) + ("0" + parseInt(i[2], 10).toString(16)).slice(-2) + ("0" + parseInt(i[3], 10).toString(16)).slice(-2) : "",
            e = ".indicator-color--" + (n + 1);
        t(e).find(".global--color-indicator__color").css("background", o), t(e).find(".global--color-indicator__hex").text(o.toUpperCase());
      }

      var i;
    });
  }

  var a = function a(t) {
    var n = {},
        o = document.createElement("a");
    o.href = t;

    for (var e = o.search.substring(1).split("&"), i = 0; i < e.length; i++) {
      var a = e[i].split("=");
      n[a[0]] = decodeURIComponent(a[1]);
    }

    return n;
  };

  "undefined" != typeof Drupal ? function (t, o) {
    o.behaviors.buildControls = {
      attach: function attach(t) {
        n(t);
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    t("#builder").length && n();
  });
}(jQuery), $(document).ready(function () {
  $("a:not(:has(img))").each(function () {
    if ($(this).text()) {
      var t = $(this).attr("href"),
          n = this.hostname;
      t && n !== location.hostname && ((t = t.toLowerCase()).indexOf("http://") > -1 || t.indexOf("https://") > -1) && t.indexOf("localhost:3002") <= 0 && ($(this).attr("target", "_blank"), $(this).after('<a title="Link is External" aria-label="Link is External" class="ext-link-icon" href="' + t + '"></a>'));
    }
  }), $('a[href^="mailto:"]').each(function () {
    $(this).addClass("link--external--mail");
  });
}), function (t) {
  function n(n) {
    t("#tab--mockup").attr("tabindex", "-1");
  }

  "undefined" != typeof Drupal ? function (t, o) {
    o.behaviors.layoutsTabs = {
      attach: function attach(t) {
        n();
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    n();
  });
}(jQuery), function (t) {
  function n() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t(".parallax").length && t(".parallax").parallax();
  }

  "undefined" != typeof Drupal ? function (t, o) {
    o.behaviors.initBlockHero = {
      attach: function attach(o) {
        t("body", o).once("nds-block-hero").each(function () {
          n(o);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    n();
  });
}(jQuery), function (t) {
  function n() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t(".materialboxed").length && t(".materialboxed").materialbox();
  }

  "undefined" != typeof Drupal ? function (t, o) {
    o.behaviors.initComponentLightbox = {
      attach: function attach(o) {
        t("body", o).once("nds-component-lightbox").each(function () {
          n(o);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    n();
  });
}(jQuery), function (t) {
  function n() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var e = t(window).width();
    t("#global-mobile-menu").on("click", function () {
      t("#main-navigation-mobile").addClass("drawer--open"), t("#main-navigation-mobile").siblings(".navigation--drawer--overlay").show(), t(".navigation--drawer__top__button-close").focus(), t("#main-navigation-mobile").find("a, button").each(function () {
        t(this).attr("tabindex", "0");
      });
    }), t(".navigation--drawer--overlay").on("click", function () {
      t(this).hide(), o();
    }), t(".navigation--drawer__top__button-close").on("click", function () {
      o();
    }), t(window).resize(function () {
      e != t(this).width() && (e = t(this).width(), o());
    }), t(".skip-to--top").on("focus", function () {
      t(".navigation--drawer__top__button-close").focus();
    }), t(".skip-to--back").on("focus", function () {
      var n = t(".navigation--drawer__inner").find("a:visible, button:visible");
      t(n[n.length - 1]).focus();
    });
  }

  function o() {
    t("#global-mobile-menu").focus(), t("#main-navigation-mobile").removeClass("drawer--open"), t("#main-navigation-mobile").siblings(".navigation--drawer--overlay").hide(), t("#main-navigation-mobile").find("a, button").each(function () {
      t(this).attr("tabindex", "-1");
    });
  }

  "undefined" != typeof Drupal ? function (t, o) {
    o.behaviors.initNavigationDrawer = {
      attach: function attach(o) {
        t("body", o).once("nds-navigation-drawer").each(function () {
          n(o);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    n();
  });
}(jQuery), function (t) {
  function n() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t(".navigation--local").length && t(".navigation--local__group__label", n).keypress(function (n) {
      13 == n.which && t(this).click();
    });
  }

  "undefined" != typeof Drupal ? function (t, o) {
    o.behaviors.initNavigationLocal = {
      attach: function attach(o) {
        t(".page", o).once("nds-local-navigation").each(function () {
          n(o);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    n();
  });
}(jQuery), function (t) {
  function n() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t(".input--date-picker").length && t(".input--date-picker").find("input").datepicker();
  }

  "undefined" != typeof Drupal ? function (t, o) {
    o.behaviors.initInputDatePicker = {
      attach: function attach(o) {
        t("body", o).once("nds-input-date-picker").each(function () {
          n(o);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    n();
  });
}(jQuery), function (t) {
  function n() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t("select").each(function () {
      t(this).select2({
        minimumResultsForSearch: 10
      }), "" != t(this).val() && t(this).siblings(".select2-container").addClass("no-clear selection-made");
    }), t("select").change(function (n, o) {
      n.target.multiple || (t(this).siblings(".select2-container").addClass("selection-made"), t(this).siblings(".select2-container").find(".single-clear").length || "true" == t(this).attr("data-select-all-times") || t(this).siblings(".select2-container").append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>'));
    }), t("select").on("select2:open", function (n) {
      t(".select2-container").find(".select2-search__field").attr("aria-label", "Search for choices"), t(".select2-container").find(".select2-results__options").attr("aria-label", "Available choices");
    }), t(document).on("click", ".single-clear", function (n) {
      n.stopPropagation();
      var o = t(this).parent().siblings("select");
      o.prop("selectedIndex", 0);
      var e = o.attr("data-placeholder");
      t(this).parent().removeClass("selection-made"), t(this).siblings(".selection").find(".select2-selection__rendered").text(e), t(this).remove();
    });
  }

  "undefined" != typeof Drupal ? function (t, o) {
    o.behaviors.initInputSelect = {
      attach: function attach(o) {
        t("body", o).once("nds-input-select").each(function () {
          n(o);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    n();
  });
}(jQuery), function (t) {
  function n() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    t("table").each(function () {
      var n = {
        responsive: !0,
        paging: !1,
        info: !1,
        autoWidth: !1,
        searching: !1
      };
      if ("true" != t(this).attr("data-tablesort")) n.ordering = !1;else {
        var o = [];
        t(this).find("thead").find("th").each(function (n) {
          "true" == t(this).attr("data-column-num") && o.push({
            type: "natural",
            targets: n
          });
        }), n.columnDefs = o;
      }
      t(this).dataTable(n);
    });
  }

  "undefined" != typeof Drupal ? function (t, o) {
    o.behaviors.initTableDefault = {
      attach: function attach(o) {
        t("body", o).once("nds-table-default").each(function () {
          n(o);
        });
      }
    };
  }(jQuery, Drupal) : t(document).ready(function () {
    n();
  });
}(jQuery);