"use strict";function ownKeys(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,n)}return o}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(o),!0).forEach(function(e){_defineProperty(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}function _defineProperty(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}!function(t){function e(e){t("#tab--mockup").attr("tabindex","-1")}"undefined"!=typeof Drupal?function(t,o){o.behaviors.layoutsTabs={attach:function(t){e()}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),$(document).ready(function(){var t=window.matchMedia("all and (min-width: 992px)"),e=$(window).width();$(".fixed-left").each(function(){t.matches&&stickybits($(this).find(".layouts--main__first"))}),$(window).on("resize",function(){e!=$(this).width()&&(e=$(this).width(),$(".fixed-left").each(function(){t.matches?stickybits($(this).find(".layouts--main__first")):(stickybits($(this).find(".layouts--main__first")).cleanup(),$(this).find(".layouts--main__first").css("position","relative"))}))})}),$(document).ready(function(){$("a:not(:has(img))").each(function(){if($(this).text()){var t=$(this).attr("href"),e=this.hostname;t&&e!==location.hostname&&((t=t.toLowerCase()).indexOf("http://")>-1||t.indexOf("https://")>-1)&&t.indexOf("localhost:3002")<=0&&($(this).attr("target","_blank"),$(this).after('<a title="Link is External" aria-label="Link is External" class="ext-link-icon" href="'+t+'"></a>'))}}),$('a[href^="mailto:"]').each(function(){$(this).addClass("link--external--mail")})}),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t(".scrollspy").length&&t(".scrollspy").scrollSpy()}"undefined"!=typeof Drupal?function(t,o){o.behaviors.initComponentScrollspySection={attach:function(o){t("body",o).once("nds-component-scrollspy-section").each(function(){e(o)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t(".component--snippet__block__code__snippet").each(function(){var e,o,n=t(this).find("pre").html().replace(/(\r\n|\n|\r)/gm,"");t(this).find("pre").empty(),t(this).find("pre").text((e=n,(o=document.createElement("div")).innerHTML=e.trim(),function t(e,o){for(var n,i=new Array(1+o++).join("  "),a=new Array(o-1).join("  "),s=0;s<e.children.length;s++)n=document.createTextNode("\n"+i),e.insertBefore(n,e.children[s]),t(e.children[s],o),e.lastElementChild==e.children[s]&&(n=document.createTextNode("\n"+a),e.appendChild(n));return e}(o,0).innerHTML))}),t(".component--snippet").find(".button--icon").on("click",function(){var e,o,n,i=t(this).siblings(".component--snippet__button__copied");i.css("opacity",0),e=t(this).parentsUntil(".component--snippet").parent().find("pre"),o=e.text(),(n=document.createElement("textarea")).classList.add("hidden-textarea"),n.textContent=o,document.body.append(n),n.select(),document.execCommand("copy"),n.remove(),i.css("opacity",1),setTimeout(function(){i.css("opacity",0)},2e3)})}"undefined"!=typeof Drupal?function(t,o){o.behaviors.initComponentSnippet={attach:function(o){t("body",o).once("nds-component-snippet").each(function(){e(o)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;var e=window.matchMedia("all and (max-width: 992px)"),o=t(window).width();e.matches?t("#custom-styles-toggle").hide():t("#custom-styles-toggle").show(),t(window).on("resize",function(){o!=t(this).width()&&(o=t(this).width(),e.matches?(t("#custom-styles-toggle").hide(),t(".component--style-controls").removeClass("component--style-controls--open"),t("body").css("padding-top",0)):t("#custom-styles-toggle").show())}),t("#custom-styles-toggle").on("click",function(){t(".component--style-controls").toggleClass("component--style-controls--open"),t(".component--style-controls").hasClass("component--style-controls--open")?t("body").css("padding-top",t(".component--style-controls").outerHeight()+"px"):t("body").css("padding-top",0)});var n={headings:"public-sans",body:"public-sans",colors:"theme-1",shadows:"false",corners:"semirounded"};function i(e,o,n){var i=e.val();t("body").removeClass("style--"+o+"--"+n[o]),t("body").addClass("style--"+o+"--"+i);var a,s,c="NDS_DOC_SITE_PROP--"+o;return t.cookie(c,i,{expires:30,path:"/"}),a=n,s=_defineProperty({},o,i),_objectSpread({},a,{},s)}n=function(e){var o=e;t.cookie("NDS_DOC_SITE_PROP--shadows")&&(t("body").addClass("style--shadows"),t.cookie("NDS_DOC_SITE_PROP--shadows",!0,{expires:30,path:"/"}),t('#shadows option[value="shadows"]').prop("selected",!0));for(var n in o){var a="NDS_DOC_SITE_PROP--"+n;if(t.cookie(a))switch(n){case"headings":t("#text-heading option[value="+t.cookie(a)+"]").prop("selected",!0),o=i(t("#text-heading"),n,o);break;case"body":t("#text-body option[value="+t.cookie(a)+"]").prop("selected",!0),o=i(t("#text-body"),n,o);break;case"colors":t("#color-select option[value="+t.cookie(a)+"]").prop("selected",!0),o=i(t("#color-select"),n,o);break;case"corners":t("#corners option[value="+t.cookie(a)+"]").prop("selected",!0),o=i(t("#corners"),n,o)}}return o}(n),t("#text-heading").on("change",function(){n=i(t(this),"headings",n)}),t("#text-body").on("change",function(){n=i(t(this),"body",n)}),t("#color-select").on("change",function(){n=i(t(this),"colors",n)}),t("#shadows").on("change",function(){"shadows"==t(this).val()?(t("body").addClass("style--shadows"),t.cookie("NDS_DOC_SITE_PROP--shadows",!0,{expires:30,path:"/"})):(t("body").removeClass("style--shadows"),t.removeCookie("NDS_DOC_SITE_PROP--shadows",{path:"/"}))}),t("#corners").on("change",function(){n=i(t(this),"corners",n)})}"undefined"!=typeof Drupal?function(t,o){o.behaviors.init_style_controls={attach:function(o){t(".page",o).once("nds-style-controls").each(function(){e(o)})}}}(jQuery,Drupal):t(document).ready(function(){t("#builder").length||e()})}(jQuery),function(t){function e(e){window.matchMedia("all and (max-width: 991px)");var s={tab:"mockup",heading:"roboto",body:"roboto",colors:"theme-1",shadows:"false",corners:"semirounded",hero:"false",productIDTop:"",productIDBottom:""},c=a(window.location.href);function r(e){var n=t("input[name='headings']:checked").val();return t("body").removeClass("style--headings--"+e.heading),t("body").addClass("style--headings--"+n),o(e,{heading:n})}function d(e){var n=t("input[name='body']:checked").val();return t("body").removeClass("style--body--"+e.body),t("body").addClass("style--body--"+n),o(e,{body:n})}function l(e){var n=t("input[name='colors']:checked").val();return t("body").removeClass("style--colors--"+e.colors),t("body").addClass("style--colors--"+n),i(n),o(e,{colors:n})}function u(e){return"shadows"==t("input[name='shadow']:checked").val()?(t("body").addClass("style--shadows"),o(e,{shadows:"true"})):(t("body").removeClass("style--shadows"),o(e,{shadows:"false"}))}function h(e){var n=t("input[name='corners']:checked").val();return"rounded"==n?(t("body").removeClass("style--corners--semirounded").addClass("style--corners--rounded"),o(e,{corners:"rounded"})):"semirounded"==n?(t("body").removeClass("style--corners--rounded").addClass("style--corners--semirounded"),o(e,{corners:"semirounded"})):(t("body").removeClass("style--corners--rounded style--corners--semirounded"),o(e,{corners:"straight"}))}function p(e){return"yes"==t("input[name='hero']:checked").val()?(t("#block--hero").show(),t("body").addClass("style--hero"),o(e,{hero:"true"})):(t("#block--hero").hide(),t("body").removeClass("style--hero"),o(e,{hero:"false"}))}function f(e,n,i){return t(".layouts--tabs__tab").each(function(){t(this).removeClass("active-tab"),t(this).attr("tabindex","0")}),t(".layouts--tabs__window").each(function(){t(this).hide()}),"mockup"==i?t("#layouts--tabs__mockup").show():t("#layouts--tabs__style-tile").show(),t(n).addClass("active-tab"),t(n).attr("tabindex","-1"),t("table").each(function(){t(this).hasClass("dataTable")&&t(this).DataTable().columns.adjust().responsive.recalc()}),o(e,{tab:i})}(function(e){t(".layouts--tabs__tab").each(function(){t(this).removeClass("active-tab"),t(this).attr("tabindex","0")}),t(".layouts--tabs__window").each(function(){t(this).hide()}),"st"==e.tab?(t("#tab--style-tile").addClass("active-tab"),t("#tab--style-tile").attr("tabindex","-1"),t("#layouts--tabs__style-tile").show()):(t("#tab--mockup").addClass("active-tab"),t("#tab--mockup").attr("tabindex","-1"),t("#layouts--tabs__mockup").show());t(".form--controls--headings input[value="+e.heading+"]").click(),t(".form--controls--body input[value="+e.body+"]").click(),t(".form--controls--colors input[value="+e.colors+"]").click(),i(e.colors),"true"==e.shadows?(t("body").addClass("style--shadows"),t(".form--controls--shadows input[value=shadows]").click()):(t("body").removeClass("style--shadows"),t(".form--controls--shadows input[value=no_shadows]").click());"rounded"==e.corners?(t("body").removeClass("style--corners--semirounded").addClass("style--corners--rounded"),t(".form--controls--corners input[value=rounded]").click()):"semirounded"==e.corners?(t("body").removeClass("style--corners--rounded").addClass("style--corners--semirounded"),t(".form--controls--corners input[value=semirounded]").click()):(t("body").removeClass("style--corners--rounded style--corners--semirounded"),t(".form--controls--corners input[value=straight]").click());"true"==e.hero?(t("#block--hero").show(),t("#block--header").hide(),t("body").addClass("style--hero"),t(".form--controls--hero input[value=yes]").click()):(t("#block--hero").hide(),t("#block--header").show(),t("body").removeClass("style--hero"),t(".form--controls--hero input[value=no]").click());""!=e.productIDTop&&(t("#form--product-identity__inputs__top").val(e.productIDTop),t(".main").find(".component--product-identity__top").text(e.productIDTop));""!=e.productIDBottom&&(t("#form--product-identity__inputs__bottom").val(e.productIDBottom),t(".main").find(".component--product-identity__bottom").text(e.productIDBottom));""==e.productIDTop&&""==e.productIDBottom||t(".main").find(".component--branding__vertical-bar").css("display","inline-block")})(s=o(s,c)),t("body").addClass("style--headings--"+s.heading),t(".form--controls--headings input[type='radio']").click(function(){s=r(s)}),t(".form--controls--headings label",e).keypress(function(e){13==e.which&&(t(this).siblings("input").prop("checked",!0),s=r(s))}),t("body").addClass("style--body--"+s.body),t(".form--controls--body input[type='radio']").click(function(){s=d(s)}),t(".form--controls--body label",e).keypress(function(e){13==e.which&&(t(this).siblings("input").prop("checked",!0),s=d(s))}),t("body").addClass("style--colors--"+s.colors),t(".form--controls--colors input[type='radio']").click(function(){s=l(s)}),t(".block--palette").click(function(){var e=t(this).attr("class").split(" "),n=e[e.length-1];t("input[name='colors'][value="+n+"]").prop("checked",!0),t("body").removeClass("style--colors--"+s.colors),t("body").addClass("style--colors--"+n),i(n),s=o(s,{colors:n})}),t(".form--controls--colors label",e).keypress(function(e){13==e.which&&(t(this).siblings("input").prop("checked",!0),s=l(s))}),t(".form--controls--shadows input[type='radio']").click(function(){s=u(s)}),t(".form--controls--shadows label",e).keypress(function(e){13==e.which&&(t(this).siblings("input").prop("checked",!0),s=u(s))}),t(".form--controls--corners input[type='radio']").click(function(){s=h(s)}),t(".form--controls--corners label",e).keypress(function(e){13==e.which&&(t(this).siblings("input").prop("checked",!0),s=h(s))}),t(".form--controls--hero input[type='radio']").click(function(){s=p(s)}),t(".form--controls--hero label",e).keypress(function(e){13==e.which&&(t(this).siblings("input").prop("checked",!0),s=p(s))}),t("#tab--mockup",e).click(function(){s=f(s,this,"mockup")}),t("#tab--style-tile",e).click(function(){s=f(s,this,"st")}),t("#tab--mockup",e).keypress(function(t){13==t.which&&(s=f(s,this,"mockup"))}),t("#tab--style-tile",e).keypress(function(t){13==t.which&&(s=f(s,this,"st"))}),t("#form--product-identity__inputs__top").on("input",function(){s=n(s,this)}),t("#form--product-identity__inputs__bottom").on("input",function(){s=n(s,this)}),t(".button--use-theme").on("click",function(){var e='"bodyClass": "';e+="style--headings--"+s.heading,e+=" style--body--"+s.body,e+=" style--colors--"+s.colors,"true"==s.shadows?e+=" style--shadows":e+="","true"==s.hero?e+=" style--hero":e+="",e+=" style--corners--"+s.corners,e+='"',t("#selected-choices").text(e)}),t(".button--share-theme").click(function(){var e,o;t(".builder--side-drawer__copied").css("opacity",0),function(e){var o="?",n=!0;Object.keys(e).forEach(function(t){e[t]&&(n?(o+=t+"="+e[t],n=!1):"undefined"!=e[t]&&(o+="&"+t+"="+e[t]))});var i=window.location.href.split("?")[0];t(".builder--side-drawer__link").text(i+o)}(s),e=".builder--side-drawer__link",o=t("<input>"),t("body").append(o),o.val(t(e).text()).select(),document.execCommand("copy"),o.remove(),t(".builder--side-drawer__copied").css("opacity",1),setTimeout(function(){t(".builder--side-drawer__copied").css("opacity",0)},2e3)})}function o(t,e){return _objectSpread({},t,{},e)}function n(e,n){if(""==t("#form--product-identity__inputs__top").val()&&""==t("#form--product-identity__inputs__bottom").val())t(".main").find(".component--branding__vertical-bar").css("display","none"),t(".main").find(".component--product-identity__top").text(""),t(".main").find(".component--product-identity__bottom").text("");else{if(t(".main").find(".component--branding__vertical-bar").css("display","inline-block"),"form--product-identity__inputs__top"==n.name)return t(".main").find(".component--product-identity__top").text(n.value),o(e,{productIDTop:n.value});if("form--product-identity__inputs__bottom"==n.name)return t(".main").find(".component--product-identity__bottom").text(n.value),o(e,{productIDBottom:n.value})}}function i(e){t(".block--palette."+e).find(".block--palette__color").each(function(e){if(3!=e){var o=(i=(i=t(this).css("background-color")).match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===i.length?"#"+("0"+parseInt(i[1],10).toString(16)).slice(-2)+("0"+parseInt(i[2],10).toString(16)).slice(-2)+("0"+parseInt(i[3],10).toString(16)).slice(-2):"",n=".indicator-color--"+(e+1);t(n).find(".global--color-indicator__color").css("background",o),t(n).find(".global--color-indicator__hex").text(o.toUpperCase())}var i})}var a=function(t){var e={},o=document.createElement("a");o.href=t;for(var n=o.search.substring(1).split("&"),i=0;i<n.length;i++){var a=n[i].split("=");e[a[0]]=decodeURIComponent(a[1])}return e};"undefined"!=typeof Drupal?function(t,o){o.behaviors.buildControls={attach:function(t){e(t)}}}(jQuery,Drupal):t(document).ready(function(){t("#builder").length&&e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t(function(){t('[data-toggle="tooltip"]').tooltip()})}"undefined"!=typeof Drupal?function(t,o){o.behaviors.initInputNDS={attach:function(o){t("body",o).once("nds-input").each(function(){e(o)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t(".input--date-picker").each(function(){"true"==t(this).find("input").attr("nds-date-picker")&&t(this).find("input").datepicker()})}"undefined"!=typeof Drupal?function(t,o){o.behaviors.initInputDatePicker={attach:function(o){t("body",o).once("nds-input-date-picker").each(function(){e(o)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t("select").each(function(){"true"==t(this).attr("nds-select")&&(t(this).select2({minimumResultsForSearch:10}),""!=t(this).val()&&t(this).siblings(".select2-container").addClass("no-clear selection-made"))}),t("select").change(function(e,o){"true"==t(this).attr("nds-select")&&(e.target.multiple?t(this).find("option:selected").length>0?t(this).siblings(".select2-container").addClass("selection-made-multi"):t(this).siblings(".select2-container").removeClass("selection-made-multi"):(t(this).siblings(".select2-container").addClass("selection-made"),t(this).siblings(".select2-container").find(".single-clear").length||"true"==t(this).attr("data-select-all-times")||t(this).siblings(".select2-container").append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>')))}),t("select").on("select2:open",function(e){t(".select2-container").find(".select2-search__field").attr("aria-label","Search for choices"),t(".select2-container").find(".select2-results__options").attr("aria-label","Available choices")}),t(document).on("click",".single-clear",function(e){e.stopPropagation();var o=t(this).parent().siblings("select");o.prop("selectedIndex",0);var n=o.attr("data-placeholder");t(this).parent().removeClass("selection-made"),t(this).siblings(".selection").find(".select2-selection__rendered").text(n),t(this).remove()})}"undefined"!=typeof Drupal?function(t,o){o.behaviors.initInputSelect={attach:function(o){t("body",o).once("nds-input-select").each(function(){e(o)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t("table").each(function(){if("true"==t(this).attr("nds-datatable")){var e={responsive:!0,paging:!1,info:!1,autoWidth:!1,searching:!1};if("true"!=t(this).attr("data-tablesort"))e.ordering=!1;else{var o=[];t(this).find("thead").find("th").each(function(e){"true"==t(this).attr("data-column-num")&&o.push({type:"natural",targets:e})}),e.columnDefs=o}t(this).dataTable(e)}})}"undefined"!=typeof Drupal?function(t,o){o.behaviors.initTableDefault={attach:function(o){t("body",o).once("nds-table-default").each(function(){e(o)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),$(document).ready(function(){$(".layouts--body").find("a").each(function(t){var e=$.trim($(this).text());""!==e&&(e=(e=e.replace(/\//g,"-")).replace(/\s+/g,"-").toLowerCase(),$(this).attr("data-content","body-anchor-"+e))}),$(".navigation--primary").find("a").each(function(t){var e=$.trim($(this).text());""!==e&&(e=(e=e.replace(/\//g,"-")).replace(/\s+/g,"-").toLowerCase(),$(this).attr("data-nav","header-nav-"+e))}),$(".global--footer").find("a").each(function(t){var e=$.trim($(this).text());""!==e&&(e=(e=e.replace(/\//g,"-")).replace(/\s+/g,"-").toLowerCase(),$(this).attr("data-nav","footer-nav-"+e))}),$(".component--accordion__card").find("button").each(function(t){var e=$.trim($(this).text());""!==e&&(e=(e=e.replace(/\//g,"-")).replace(/\s+/g,"-").toLowerCase(),$(this).attr("data-content","accordion-"+e))})}),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t(".parallax").length&&t(".parallax").parallax()}"undefined"!=typeof Drupal?function(t,o){o.behaviors.initBlockHero={attach:function(o){t("body",o).once("nds-block-hero").each(function(){e(o)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t(".materialboxed").length&&t(".materialboxed").materialbox()}"undefined"!=typeof Drupal?function(t,o){o.behaviors.initComponentLightbox={attach:function(o){t("body",o).once("nds-component-lightbox").each(function(){e(o)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(t(".component--modal").length){var e='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';t(".component--modal").each(function(){var o=t(this).find(e)[0],n=t(this).find(e),i=n[n.length-1];document.addEventListener("keydown",function(t){("Tab"===t.key||9===t.keyCode)&&(t.shiftKey?document.activeElement===o&&(i.focus(),t.preventDefault()):document.activeElement===i&&(o.focus(),t.preventDefault()))}),o.focus()})}}"undefined"!=typeof Drupal?function(t,o){o.behaviors.initComponentModal={attach:function(o){t("body",o).once("nds-component-modal").each(function(){e(o)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;var e=t(window).width();t("#global-mobile-menu").on("click",function(){t("#main-navigation-mobile").addClass("drawer--open"),t("#main-navigation-mobile").siblings(".navigation--drawer--overlay").show(),t(".navigation--drawer__top__button-close").focus(),t("#main-navigation-mobile").find("a, button").each(function(){t(this).attr("tabindex","0")})}),t(".navigation--drawer--overlay").on("click",function(){t(this).hide(),o()}),t(".navigation--drawer__top__button-close").on("click",function(){o()}),t(window).resize(function(){e!=t(this).width()&&(e=t(this).width(),o())}),t(".skip-to--top").on("focus",function(){t(".navigation--drawer__top__button-close").focus()}),t(".skip-to--back").on("focus",function(){var e=t(".navigation--drawer__inner").find("a:visible, button:visible");t(e[e.length-1]).focus()})}function o(){t("#global-mobile-menu").focus(),t("#main-navigation-mobile").removeClass("drawer--open"),t("#main-navigation-mobile").siblings(".navigation--drawer--overlay").hide(),t("#main-navigation-mobile").find("a, button").each(function(){t(this).attr("tabindex","-1")})}"undefined"!=typeof Drupal?function(t,o){o.behaviors.initNavigationDrawer={attach:function(o){t("body",o).once("nds-navigation-drawer").each(function(){e(o)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery),function(t){function e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;t(".navigation--local").length&&t(".navigation--local__group__label",e).keypress(function(e){13==e.which&&t(this).click()})}"undefined"!=typeof Drupal?function(t,o){o.behaviors.initNavigationLocal={attach:function(o){t(".page",o).once("nds-local-navigation").each(function(){e(o)})}}}(jQuery,Drupal):t(document).ready(function(){e()})}(jQuery);