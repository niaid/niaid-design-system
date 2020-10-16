"use strict";function ownKeys(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,o)}return n}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(n),!0).forEach(function(e){_defineProperty(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function _defineProperty(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}!function(t){function e(e){t("#tab--mockup").attr("tabindex","-1")}"undefined"!=typeof Drupal?function(t,n){n.behaviors.layoutsTabs={attach:function(t){e()}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),$(document).ready(function(){$("a:not(:has(img))").each(function(){if($(this).text()){var t=$(this).attr("href"),e=this.hostname;t&&e!==location.hostname&&((t=t.toLowerCase()).indexOf("http://")>-1||t.indexOf("https://")>-1)&&t.indexOf("localhost:3002")<=0&&($(this).attr("target","_blank"),$(this).after('<a title="Link is External" aria-label="Link is External" class="ext-link-icon" href="'+t+'"></a>'))}}),$('a[href^="mailto:"]').each(function(){$(this).addClass("link--external--mail")})}),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t(".scrollspy").length&&t(".scrollspy").scrollSpy()}"undefined"!=typeof Drupal?function(t,n){n.behaviors.initComponentScrollspySection={attach:function(n){t("body",n).once("nds-component-scrollspy-section").each(function(){e(n)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t(".component--snippet__block__code__snippet").each(function(){var e,n,o=t(this).find("pre").html().replace(/(\r\n|\n|\r)/gm,"");t(this).find("pre").empty(),t(this).find("pre").text((e=o,(n=document.createElement("div")).innerHTML=e.trim(),function t(e,n){for(var o,i=new Array(1+n++).join("  "),a=new Array(n-1).join("  "),c=0;c<e.children.length;c++)o=document.createTextNode("\n"+i),e.insertBefore(o,e.children[c]),t(e.children[c],n),e.lastElementChild==e.children[c]&&(o=document.createTextNode("\n"+a),e.appendChild(o));return e}(n,0).innerHTML))}),t(".component--snippet").find(".button--icon").on("click",function(){var e,n,o;e=t(this).parentsUntil(".component--snippet").parent().find("pre"),n=e.text(),(o=document.createElement("textarea")).classList.add("hidden-textarea"),o.textContent=n,document.body.append(o),o.select(),document.execCommand("copy"),o.remove()})}"undefined"!=typeof Drupal?function(t,n){n.behaviors.initComponentSnippet={attach:function(n){t("body",n).once("nds-component-snippet").each(function(){e(n)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(e){t("#custom-styles-toggle").on("click",function(){t(".component--style-controls").toggleClass("component--style-controls--open"),t(".component--style-controls").hasClass("component--style-controls--open")?t("body").css("padding-top",t(".component--style-controls").outerHeight()+"px"):t("body").css("padding-top",0)});var n={headings:"public-sans",body:"public-sans",colors:"theme-1",corners:"semirounded"};function o(e,n,o){var i,a,c=e.val();return t("body").removeClass("style--"+n+"--"+o[n]),t("body").addClass("style--"+n+"--"+c),i=o,a=_defineProperty({},n,c),_objectSpread({},i,{},a)}t("#text-heading").on("change",function(){n=o(t(this),"headings",n)}),t("#text-body").on("change",function(){n=o(t(this),"body",n)}),t("#color-select").on("change",function(){n=o(t(this),"colors",n)}),t("#shadows").on("change",function(){"shadows"==t(this).val()?t("body").addClass("style--shadows"):t("body").removeClass("style--shadows")}),t("#corners").on("change",function(){n=o(t(this),"corners",n)})}"undefined"!=typeof Drupal?function(t,n){n.behaviors.init_style_controls={attach:function(n){t(".page",n).once("nds-style-controls").each(function(){e()})}}}(jQuery,Drupal):t(document).ready(function(){t("#builder").length||e()})}(jQuery),function(t){function e(e){window.matchMedia("all and (max-width: 991px)");var c={tab:"mockup",heading:"roboto",body:"roboto",colors:"theme-1",shadows:"false",corners:"semirounded",hero:"false",productIDTop:"",productIDBottom:""},s=a(window.location.href);function r(e){var o=t("input[name='headings']:checked").val();return t("body").removeClass("style--headings--"+e.heading),t("body").addClass("style--headings--"+o),n(e,{heading:o})}function l(e){var o=t("input[name='body']:checked").val();return t("body").removeClass("style--body--"+e.body),t("body").addClass("style--body--"+o),n(e,{body:o})}function d(e){var o=t("input[name='colors']:checked").val();return t("body").removeClass("style--colors--"+e.colors),t("body").addClass("style--colors--"+o),i(o),n(e,{colors:o})}function u(e){return"shadows"==t("input[name='shadow']:checked").val()?(t("body").addClass("style--shadows"),n(e,{shadows:"true"})):(t("body").removeClass("style--shadows"),n(e,{shadows:"false"}))}function p(e){var o=t("input[name='corners']:checked").val();return"rounded"==o?(t("body").removeClass("style--corners--semirounded").addClass("style--corners--rounded"),n(e,{corners:"rounded"})):"semirounded"==o?(t("body").removeClass("style--corners--rounded").addClass("style--corners--semirounded"),n(e,{corners:"semirounded"})):(t("body").removeClass("style--corners--rounded style--corners--semirounded"),n(e,{corners:"straight"}))}function h(e){return"yes"==t("input[name='hero']:checked").val()?(t("#block--hero").show(),t("body").addClass("style--hero"),n(e,{hero:"true"})):(t("#block--hero").hide(),t("body").removeClass("style--hero"),n(e,{hero:"false"}))}function f(e,o,i){return t(".layouts--tabs__tab").each(function(){t(this).removeClass("active-tab"),t(this).attr("tabindex","0")}),t(".layouts--tabs__window").each(function(){t(this).hide()}),"mockup"==i?t("#layouts--tabs__mockup").show():t("#layouts--tabs__style-tile").show(),t(o).addClass("active-tab"),t(o).attr("tabindex","-1"),t("table").each(function(){t(this).hasClass("dataTable")&&t(this).DataTable().columns.adjust().responsive.recalc()}),n(e,{tab:i})}(function(e){t(".layouts--tabs__tab").each(function(){t(this).removeClass("active-tab"),t(this).attr("tabindex","0")}),t(".layouts--tabs__window").each(function(){t(this).hide()}),"st"==e.tab?(t("#tab--style-tile").addClass("active-tab"),t("#tab--style-tile").attr("tabindex","-1"),t("#layouts--tabs__style-tile").show()):(t("#tab--mockup").addClass("active-tab"),t("#tab--mockup").attr("tabindex","-1"),t("#layouts--tabs__mockup").show());t(".form--controls--headings input[value="+e.heading+"]").click(),t(".form--controls--body input[value="+e.body+"]").click(),t(".form--controls--colors input[value="+e.colors+"]").click(),i(e.colors),"true"==e.shadows?(t("body").addClass("style--shadows"),t(".form--controls--shadows input[value=shadows]").click()):(t("body").removeClass("style--shadows"),t(".form--controls--shadows input[value=no_shadows]").click());"rounded"==e.corners?(t("body").removeClass("style--corners--semirounded").addClass("style--corners--rounded"),t(".form--controls--corners input[value=rounded]").click()):"semirounded"==e.corners?(t("body").removeClass("style--corners--rounded").addClass("style--corners--semirounded"),t(".form--controls--corners input[value=semirounded]").click()):(t("body").removeClass("style--corners--rounded style--corners--semirounded"),t(".form--controls--corners input[value=straight]").click());"true"==e.hero?(t("#block--hero").show(),t("#block--header").hide(),t("body").addClass("style--hero"),t(".form--controls--hero input[value=yes]").click()):(t("#block--hero").hide(),t("#block--header").show(),t("body").removeClass("style--hero"),t(".form--controls--hero input[value=no]").click());""!=e.productIDTop&&(t("#form--product-identity__inputs__top").val(e.productIDTop),t(".main").find(".component--product-identity__top").text(e.productIDTop));""!=e.productIDBottom&&(t("#form--product-identity__inputs__bottom").val(e.productIDBottom),t(".main").find(".component--product-identity__bottom").text(e.productIDBottom));""==e.productIDTop&&""==e.productIDBottom||t(".main").find(".component--branding__vertical-bar").css("display","inline-block")})(c=n(c,s)),t("body").addClass("style--headings--"+c.heading),t(".form--controls--headings input[type='radio']").click(function(){c=r(c)}),t(".form--controls--headings label",e).keypress(function(e){13==e.which&&(t(this).siblings("input").prop("checked",!0),c=r(c))}),t("body").addClass("style--body--"+c.body),t(".form--controls--body input[type='radio']").click(function(){c=l(c)}),t(".form--controls--body label",e).keypress(function(e){13==e.which&&(t(this).siblings("input").prop("checked",!0),c=l(c))}),t("body").addClass("style--colors--"+c.colors),t(".form--controls--colors input[type='radio']").click(function(){c=d(c)}),t(".block--palette").click(function(){var e=t(this).attr("class").split(" "),o=e[e.length-1];t("input[name='colors'][value="+o+"]").prop("checked",!0),t("body").removeClass("style--colors--"+c.colors),t("body").addClass("style--colors--"+o),i(o),c=n(c,{colors:o})}),t(".form--controls--colors label",e).keypress(function(e){13==e.which&&(t(this).siblings("input").prop("checked",!0),c=d(c))}),t(".form--controls--shadows input[type='radio']").click(function(){c=u(c)}),t(".form--controls--shadows label",e).keypress(function(e){13==e.which&&(t(this).siblings("input").prop("checked",!0),c=u(c))}),t(".form--controls--corners input[type='radio']").click(function(){c=p(c)}),t(".form--controls--corners label",e).keypress(function(e){13==e.which&&(t(this).siblings("input").prop("checked",!0),c=p(c))}),t(".form--controls--hero input[type='radio']").click(function(){c=h(c)}),t(".form--controls--hero label",e).keypress(function(e){13==e.which&&(t(this).siblings("input").prop("checked",!0),c=h(c))}),t("#tab--mockup",e).click(function(){c=f(c,this,"mockup")}),t("#tab--style-tile",e).click(function(){c=f(c,this,"st")}),t("#tab--mockup",e).keypress(function(t){13==t.which&&(c=f(c,this,"mockup"))}),t("#tab--style-tile",e).keypress(function(t){13==t.which&&(c=f(c,this,"st"))}),t("#form--product-identity__inputs__top").on("input",function(){c=o(c,this)}),t("#form--product-identity__inputs__bottom").on("input",function(){c=o(c,this)}),t(".button--generate-link").click(function(){var e,n;t(".builder--side-drawer__copied").css("opacity",0),function(e){var n="?",o=!0;Object.keys(e).forEach(function(t){e[t]&&(o?(n+=t+"="+e[t],o=!1):"undefined"!=e[t]&&(n+="&"+t+"="+e[t]))});var i=window.location.href.split("?")[0];t(".builder--side-drawer__link").text(i+n)}(c),e=".builder--side-drawer__link",n=t("<input>"),t("body").append(n),n.val(t(e).text()).select(),document.execCommand("copy"),n.remove(),t(".builder--side-drawer__copied").css("opacity",1),setTimeout(function(){t(".builder--side-drawer__copied").css("opacity",0)},2e3)})}function n(t,e){return _objectSpread({},t,{},e)}function o(e,o){if(""==t("#form--product-identity__inputs__top").val()&&""==t("#form--product-identity__inputs__bottom").val())t(".main").find(".component--branding__vertical-bar").css("display","none"),t(".main").find(".component--product-identity__top").text(""),t(".main").find(".component--product-identity__bottom").text("");else{if(t(".main").find(".component--branding__vertical-bar").css("display","inline-block"),"form--product-identity__inputs__top"==o.name)return t(".main").find(".component--product-identity__top").text(o.value),n(e,{productIDTop:o.value});if("form--product-identity__inputs__bottom"==o.name)return t(".main").find(".component--product-identity__bottom").text(o.value),n(e,{productIDBottom:o.value})}}function i(e){t(".block--palette."+e).find(".block--palette__color").each(function(e){if(3!=e){var n=(i=(i=t(this).css("background-color")).match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===i.length?"#"+("0"+parseInt(i[1],10).toString(16)).slice(-2)+("0"+parseInt(i[2],10).toString(16)).slice(-2)+("0"+parseInt(i[3],10).toString(16)).slice(-2):"",o=".indicator-color--"+(e+1);t(o).find(".global--color-indicator__color").css("background",n),t(o).find(".global--color-indicator__hex").text(n.toUpperCase())}var i})}var a=function(t){var e={},n=document.createElement("a");n.href=t;for(var o=n.search.substring(1).split("&"),i=0;i<o.length;i++){var a=o[i].split("=");e[a[0]]=decodeURIComponent(a[1])}return e};"undefined"!=typeof Drupal?function(t,n){n.behaviors.buildControls={attach:function(t){e(t)}}}(jQuery,Drupal):t(document).ready(function(){t("#builder").length&&e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t(".input--date-picker").length&&t(".input--date-picker").find("input").datepicker()}"undefined"!=typeof Drupal?function(t,n){n.behaviors.initInputDatePicker={attach:function(n){t("body",n).once("nds-input-date-picker").each(function(){e(n)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t("select").each(function(){t(this).select2({minimumResultsForSearch:10}),""!=t(this).val()&&t(this).siblings(".select2-container").addClass("no-clear selection-made")}),t("select").change(function(e,n){e.target.multiple?t(this).find("option:selected").length>0?t(this).siblings(".select2-container").addClass("selection-made-multi"):t(this).siblings(".select2-container").removeClass("selection-made-multi"):(t(this).siblings(".select2-container").addClass("selection-made"),t(this).siblings(".select2-container").find(".single-clear").length||"true"==t(this).attr("data-select-all-times")||t(this).siblings(".select2-container").append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>'))}),t("select").on("select2:open",function(e){t(".select2-container").find(".select2-search__field").attr("aria-label","Search for choices"),t(".select2-container").find(".select2-results__options").attr("aria-label","Available choices")}),t(document).on("click",".single-clear",function(e){e.stopPropagation();var n=t(this).parent().siblings("select");n.prop("selectedIndex",0);var o=n.attr("data-placeholder");t(this).parent().removeClass("selection-made"),t(this).siblings(".selection").find(".select2-selection__rendered").text(o),t(this).remove()})}"undefined"!=typeof Drupal?function(t,n){n.behaviors.initInputSelect={attach:function(n){t("body",n).once("nds-input-select").each(function(){e(n)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t("table").each(function(){if("true"==t(this).attr("nds-datatable")){var e={responsive:!0,paging:!1,info:!1,autoWidth:!1,searching:!1};if("true"!=t(this).attr("data-tablesort"))e.ordering=!1;else{var n=[];t(this).find("thead").find("th").each(function(e){"true"==t(this).attr("data-column-num")&&n.push({type:"natural",targets:e})}),e.columnDefs=n}t(this).dataTable(e)}})}"undefined"!=typeof Drupal?function(t,n){n.behaviors.initTableDefault={attach:function(n){t("body",n).once("nds-table-default").each(function(){e(n)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t(".parallax").length&&t(".parallax").parallax()}"undefined"!=typeof Drupal?function(t,n){n.behaviors.initBlockHero={attach:function(n){t("body",n).once("nds-block-hero").each(function(){e(n)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t(".materialboxed").length&&t(".materialboxed").materialbox()}"undefined"!=typeof Drupal?function(t,n){n.behaviors.initComponentLightbox={attach:function(n){t("body",n).once("nds-component-lightbox").each(function(){e(n)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;var e=t(window).width();t("#global-mobile-menu").on("click",function(){t("#main-navigation-mobile").addClass("drawer--open"),t("#main-navigation-mobile").siblings(".navigation--drawer--overlay").show(),t(".navigation--drawer__top__button-close").focus(),t("#main-navigation-mobile").find("a, button").each(function(){t(this).attr("tabindex","0")})}),t(".navigation--drawer--overlay").on("click",function(){t(this).hide(),n()}),t(".navigation--drawer__top__button-close").on("click",function(){n()}),t(window).resize(function(){e!=t(this).width()&&(e=t(this).width(),n())}),t(".skip-to--top").on("focus",function(){t(".navigation--drawer__top__button-close").focus()}),t(".skip-to--back").on("focus",function(){var e=t(".navigation--drawer__inner").find("a:visible, button:visible");t(e[e.length-1]).focus()})}function n(){t("#global-mobile-menu").focus(),t("#main-navigation-mobile").removeClass("drawer--open"),t("#main-navigation-mobile").siblings(".navigation--drawer--overlay").hide(),t("#main-navigation-mobile").find("a, button").each(function(){t(this).attr("tabindex","-1")})}"undefined"!=typeof Drupal?function(t,n){n.behaviors.initNavigationDrawer={attach:function(n){t("body",n).once("nds-navigation-drawer").each(function(){e(n)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t(".navigation--local").length&&t(".navigation--local__group__label",e).keypress(function(e){13==e.which&&t(this).click()})}"undefined"!=typeof Drupal?function(t,n){n.behaviors.initNavigationLocal={attach:function(n){t(".page",n).once("nds-local-navigation").each(function(){e(n)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery);