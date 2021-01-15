"use strict";function ownKeys(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),o.push.apply(o,n)}return o}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(o),!0).forEach(function(t){_defineProperty(e,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))})}return e}function _defineProperty(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var getNextSibling=function(e,t){for(var o=e.nextElementSibling;o;){if(o.matches(t))return o;o=o.nextElementSibling}};function windowWidth(){var e=window.document.documentElement.clientWidth,t=window.document.body;return"CSS1Compat"===window.document.compatMode&&e||t&&t.clientWidth||e}function initNavigationDrawer(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;var e=windowWidth();document.querySelector("#global-mobile-menu").addEventListener("click",function(e){document.querySelector("#main-navigation-mobile").classList.add("drawer--open"),getNextSibling(document.querySelector("#main-navigation-mobile"),".navigation--drawer--overlay").style.display="block",document.querySelector(".navigation--drawer__top__button-close").focus();for(var t=document.querySelector("#main-navigation-mobile").querySelectorAll("button, a"),o=0;o<t.length;o++)t[o].setAttribute("tabindex","0")}),document.querySelector(".navigation--drawer--overlay").addEventListener("click",function(e){closeMenu()}),document.querySelector(".navigation--drawer__top__button-close").addEventListener("click",function(e){closeMenu()}),window.onresize=function(t){e!=windowWidth()&&(e=windowWidth(),closeMenu())},document.querySelector(".skip-to--top").addEventListener("focus",function(e){document.querySelector(".navigation--drawer__top__button-close").focus()}),document.querySelector(".skip-to--back").addEventListener("focus",function(e){var t=document.querySelector(".navigation--drawer__inner").querySelectorAll("button, a");t[t.length-1].focus()})}function closeMenu(){document.querySelector("#global-mobile-menu").focus(),document.querySelector("#main-navigation-mobile").classList.remove("drawer--open"),getNextSibling(document.querySelector("#main-navigation-mobile"),".navigation--drawer--overlay").style.display="none";for(var e=document.querySelector("#main-navigation-mobile").querySelectorAll("button, a"),t=0;t<e.length;t++)e[t].setAttribute("tabindex","-1")}function initNavigationLocal(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".navigation--local").length)for(var e=document.getElementsByClassName("navigation--local__group__label"),t=0;t<e.length;t++)e[t].addEventListener("keydown",function(e){(e.isComposing||13===e.keyCode)&&this.click()})}function initLinkExternal(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll("a"),t=0;t<e.length;t++)if(""!=e[t].innerHTML){var o=e[t].getAttribute("href"),n=e[t].hostname;if(o&&n!==location.hostname&&((o=o.toLowerCase()).indexOf("http://")>-1||o.indexOf("https://")>-1)&&o.indexOf("localhost:3002")<=0){e[t].setAttribute("target","_blank");var i=document.createElement("a");i.setAttribute("href",o),i.setAttribute("class","ext-link-icon"),i.setAttribute("aria-label","External Link"),e[t].insertAdjacentElement("afterend",i)}}}function initLinkExternalMailto(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll('a[href^="mailto:"]'),t=0;t<e.length;t++)e[t].classList.add("link--external--mail")}function initDataAttributes(){for(var e=0;e<document.getElementsByClassName("layouts--body").length;e++){setDataAttributes(document.getElementsByClassName("layouts--body")[e].querySelectorAll("a"),"data-content","body-anchor-")}for(e=0;e<document.getElementsByClassName("navigation--primary").length;e++){setDataAttributes(document.getElementsByClassName("navigation--primary")[e].querySelectorAll("a"),"data-nav","header-nav-")}for(e=0;e<document.getElementsByClassName("global--footer").length;e++){setDataAttributes(document.getElementsByClassName("global--footer")[e].querySelectorAll("a"),"data-nav","footer-nav-")}for(e=0;e<document.getElementsByClassName("component--accordion__card").length;e++){setDataAttributes(document.getElementsByClassName("component--accordion__card")[e].querySelectorAll("button"),"data-content","accordion-")}}function setDataAttributes(e,t,o){for(var n=0;n<e.length;n++){var i=e[n].textContent.trim();""!==i&&(i=(i=i.replace(/\//g,"-")).replace(/\s+/g,"-").toLowerCase(),e[n].setAttribute(t,o+i))}}!function(e){function t(t){e("#tab--mockup").attr("tabindex","-1")}"undefined"!=typeof Drupal?function(e,o){o.behaviors.layoutsTabs={attach:function(e){t()}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),$(document).ready(function(){var e=window.matchMedia("all and (min-width: 992px)"),t=$(window).width();$(".fixed-left").each(function(){e.matches&&stickybits($(this).find(".layouts--main__first"))}),$(window).on("resize",function(){t!=$(this).width()&&(t=$(this).width(),$(".fixed-left").each(function(){e.matches?stickybits($(this).find(".layouts--main__first")):(stickybits($(this).find(".layouts--main__first")).cleanup(),$(this).find(".layouts--main__first").css("position","relative"))}))})}),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e(".scrollspy").length&&e(".scrollspy").scrollSpy()}"undefined"!=typeof Drupal?function(e,o){o.behaviors.initComponentScrollspySection={attach:function(o){e("body",o).once("nds-component-scrollspy-section").each(function(){t(o)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e(".component--snippet__block__code__wrapper__snippet").each(function(){var t=e(this).html().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/(^[ \t]*\n)/gm,"");e(this).empty(),e(this).append(t),e(this).wrapInner('<pre><code class="language-markup"></code></pre>');var o=e(this).find("code");Prism.highlightElement(o[0]),e(".component--snippet__block__code__wrapper").show(),e(".component--snippet__block__code__loader").hide()}),e(".component--snippet").find(".button--icon").on("click",function(){var t,o,n,i=e(this).siblings(".component--snippet__block__code__wrapper__button__copied");i.css("opacity",0),t=e(this).closest(".component--snippet").find("pre"),o=t.text(),(n=document.createElement("textarea")).classList.add("hidden-textarea"),n.textContent=o,document.body.append(n),n.select(),document.execCommand("copy"),n.remove(),i.css("opacity",1),setTimeout(function(){i.css("opacity",0)},2e3)}),e(".component--snippet__block__pattern__toggle").on("click",function(){e(this).siblings(".component--snippet__block__pattern__content").toggleClass("open"),e(this).toggleClass("open")})}"undefined"!=typeof Drupal?function(e,o){o.behaviors.initComponentSnippet={attach:function(o){e("body",o).once("nds-component-snippet").each(function(){t(o)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;var t=window.matchMedia("all and (max-width: 992px)"),o=e(window).width();t.matches?e("#custom-styles-toggle").hide():e("#custom-styles-toggle").show(),e(window).on("resize",function(){o!=e(this).width()&&(o=e(this).width(),t.matches?(e("#custom-styles-toggle").hide(),e(".component--style-controls").removeClass("component--style-controls--open"),e("body").css("padding-top",0)):e("#custom-styles-toggle").show())}),e("#custom-styles-toggle").on("click",function(){e(".component--style-controls").toggleClass("component--style-controls--open"),e(".component--style-controls").hasClass("component--style-controls--open")?e("body").css("padding-top",e(".component--style-controls").outerHeight()+"px"):e("body").css("padding-top",0)});var n={headings:"public-sans",body:"public-sans",colors:"theme-1",shadows:"false",corners:"semirounded"};function i(t,o,n){var i=t.val();e("body").removeClass("style--"+o+"--"+n[o]),e("body").addClass("style--"+o+"--"+i);var c,a,s="NDS_DOC_SITE_PROP--"+o;return e.cookie(s,i,{expires:30,path:"/"}),c=n,a=_defineProperty({},o,i),_objectSpread({},c,{},a)}n=function(t){var o=t;e.cookie("NDS_DOC_SITE_PROP--shadows")&&(e("body").addClass("style--shadows"),e.cookie("NDS_DOC_SITE_PROP--shadows",!0,{expires:30,path:"/"}),e('#shadows option[value="shadows"]').prop("selected",!0));for(var n in o){var c="NDS_DOC_SITE_PROP--"+n;if(e.cookie(c))switch(n){case"headings":e("#text-heading option[value="+e.cookie(c)+"]").prop("selected",!0),o=i(e("#text-heading"),n,o);break;case"body":e("#text-body option[value="+e.cookie(c)+"]").prop("selected",!0),o=i(e("#text-body"),n,o);break;case"colors":e("#color-select option[value="+e.cookie(c)+"]").prop("selected",!0),o=i(e("#color-select"),n,o);break;case"corners":e("#corners option[value="+e.cookie(c)+"]").prop("selected",!0),o=i(e("#corners"),n,o)}}return o}(n),e("#text-heading").on("change",function(){n=i(e(this),"headings",n)}),e("#text-body").on("change",function(){n=i(e(this),"body",n)}),e("#color-select").on("change",function(){n=i(e(this),"colors",n)}),e("#shadows").on("change",function(){"shadows"==e(this).val()?(e("body").addClass("style--shadows"),e.cookie("NDS_DOC_SITE_PROP--shadows",!0,{expires:30,path:"/"})):(e("body").removeClass("style--shadows"),e.removeCookie("NDS_DOC_SITE_PROP--shadows",{path:"/"}))}),e("#corners").on("change",function(){n=i(e(this),"corners",n)})}"undefined"!=typeof Drupal?function(e,o){o.behaviors.init_style_controls={attach:function(o){e(".page",o).once("nds-style-controls").each(function(){t(o)})}}}(jQuery,Drupal):e(document).ready(function(){e("#builder").length||t()})}(jQuery),function(e){function t(t){window.matchMedia("all and (max-width: 991px)");var a={tab:"mockup",heading:"roboto",body:"roboto",colors:"theme-1",shadows:"false",corners:"semirounded",hero:"false",productIDTop:"",productIDBottom:""},s=c(window.location.href);function r(t){var n=e("input[name='headings']:checked").val();return e("body").removeClass("style--headings--"+t.heading),e("body").addClass("style--headings--"+n),o(t,{heading:n})}function l(t){var n=e("input[name='body']:checked").val();return e("body").removeClass("style--body--"+t.body),e("body").addClass("style--body--"+n),o(t,{body:n})}function d(t){var n=e("input[name='colors']:checked").val();return e("body").removeClass("style--colors--"+t.colors),e("body").addClass("style--colors--"+n),i(n),o(t,{colors:n})}function u(t){return"shadows"==e("input[name='shadow']:checked").val()?(e("body").addClass("style--shadows"),o(t,{shadows:"true"})):(e("body").removeClass("style--shadows"),o(t,{shadows:"false"}))}function p(t){var n=e("input[name='corners']:checked").val();return"rounded"==n?(e("body").removeClass("style--corners--semirounded").addClass("style--corners--rounded"),o(t,{corners:"rounded"})):"semirounded"==n?(e("body").removeClass("style--corners--rounded").addClass("style--corners--semirounded"),o(t,{corners:"semirounded"})):(e("body").removeClass("style--corners--rounded style--corners--semirounded"),o(t,{corners:"straight"}))}function h(t){return"yes"==e("input[name='hero']:checked").val()?(e("#block--hero").show(),e("body").addClass("style--hero"),o(t,{hero:"true"})):(e("#block--hero").hide(),e("body").removeClass("style--hero"),o(t,{hero:"false"}))}function m(t,n,i){return e(".layouts--tabs__tab").each(function(){e(this).removeClass("active-tab"),e(this).attr("tabindex","0")}),e(".layouts--tabs__window").each(function(){e(this).hide()}),"mockup"==i?e("#layouts--tabs__mockup").show():e("#layouts--tabs__style-tile").show(),e(n).addClass("active-tab"),e(n).attr("tabindex","-1"),e("table").each(function(){e(this).hasClass("dataTable")&&e(this).DataTable().columns.adjust().responsive.recalc()}),o(t,{tab:i})}(function(t){e(".layouts--tabs__tab").each(function(){e(this).removeClass("active-tab"),e(this).attr("tabindex","0")}),e(".layouts--tabs__window").each(function(){e(this).hide()}),"st"==t.tab?(e("#tab--style-tile").addClass("active-tab"),e("#tab--style-tile").attr("tabindex","-1"),e("#layouts--tabs__style-tile").show()):(e("#tab--mockup").addClass("active-tab"),e("#tab--mockup").attr("tabindex","-1"),e("#layouts--tabs__mockup").show());e(".form--controls--headings input[value="+t.heading+"]").click(),e(".form--controls--body input[value="+t.body+"]").click(),e(".form--controls--colors input[value="+t.colors+"]").click(),i(t.colors),"true"==t.shadows?(e("body").addClass("style--shadows"),e(".form--controls--shadows input[value=shadows]").click()):(e("body").removeClass("style--shadows"),e(".form--controls--shadows input[value=no_shadows]").click());"rounded"==t.corners?(e("body").removeClass("style--corners--semirounded").addClass("style--corners--rounded"),e(".form--controls--corners input[value=rounded]").click()):"semirounded"==t.corners?(e("body").removeClass("style--corners--rounded").addClass("style--corners--semirounded"),e(".form--controls--corners input[value=semirounded]").click()):(e("body").removeClass("style--corners--rounded style--corners--semirounded"),e(".form--controls--corners input[value=straight]").click());"true"==t.hero?(e("#block--hero").show(),e("#block--header").hide(),e("body").addClass("style--hero"),e(".form--controls--hero input[value=yes]").click()):(e("#block--hero").hide(),e("#block--header").show(),e("body").removeClass("style--hero"),e(".form--controls--hero input[value=no]").click());""!=t.productIDTop&&(e("#form--product-identity__inputs__top").val(t.productIDTop),e(".main").find(".component--product-identity__top").text(t.productIDTop));""!=t.productIDBottom&&(e("#form--product-identity__inputs__bottom").val(t.productIDBottom),e(".main").find(".component--product-identity__bottom").text(t.productIDBottom));""==t.productIDTop&&""==t.productIDBottom||e(".main").find(".component--branding__vertical-bar").css("display","inline-block")})(a=o(a,s)),e("body").addClass("style--headings--"+a.heading),e(".form--controls--headings input[type='radio']").click(function(){a=r(a)}),e(".form--controls--headings label",t).keypress(function(t){13==t.which&&(e(this).siblings("input").prop("checked",!0),a=r(a))}),e("body").addClass("style--body--"+a.body),e(".form--controls--body input[type='radio']").click(function(){a=l(a)}),e(".form--controls--body label",t).keypress(function(t){13==t.which&&(e(this).siblings("input").prop("checked",!0),a=l(a))}),e("body").addClass("style--colors--"+a.colors),e(".form--controls--colors input[type='radio']").click(function(){a=d(a)}),e(".block--palette").click(function(){var t=e(this).attr("class").split(" "),n=t[t.length-1];e("input[name='colors'][value="+n+"]").prop("checked",!0),e("body").removeClass("style--colors--"+a.colors),e("body").addClass("style--colors--"+n),i(n),a=o(a,{colors:n})}),e(".form--controls--colors label",t).keypress(function(t){13==t.which&&(e(this).siblings("input").prop("checked",!0),a=d(a))}),e(".form--controls--shadows input[type='radio']").click(function(){a=u(a)}),e(".form--controls--shadows label",t).keypress(function(t){13==t.which&&(e(this).siblings("input").prop("checked",!0),a=u(a))}),e(".form--controls--corners input[type='radio']").click(function(){a=p(a)}),e(".form--controls--corners label",t).keypress(function(t){13==t.which&&(e(this).siblings("input").prop("checked",!0),a=p(a))}),e(".form--controls--hero input[type='radio']").click(function(){a=h(a)}),e(".form--controls--hero label",t).keypress(function(t){13==t.which&&(e(this).siblings("input").prop("checked",!0),a=h(a))}),e("#tab--mockup",t).click(function(){a=m(a,this,"mockup")}),e("#tab--style-tile",t).click(function(){a=m(a,this,"st")}),e("#tab--mockup",t).keypress(function(e){13==e.which&&(a=m(a,this,"mockup"))}),e("#tab--style-tile",t).keypress(function(e){13==e.which&&(a=m(a,this,"st"))}),e("#form--product-identity__inputs__top").on("input",function(){a=n(a,this)}),e("#form--product-identity__inputs__bottom").on("input",function(){a=n(a,this)}),e(".button--use-theme").on("click",function(){var t='"bodyClass": "';t+="style--headings--"+a.heading,t+=" style--body--"+a.body,t+=" style--colors--"+a.colors,"true"==a.shadows?t+=" style--shadows":t+="","true"==a.hero?t+=" style--hero":t+="",t+=" style--corners--"+a.corners,t+='"',e("#selected-choices").text(t)}),e(".button--share-theme").click(function(){var t,o;e(".builder--side-drawer__copied").css("opacity",0),function(t){var o="?",n=!0;Object.keys(t).forEach(function(e){t[e]&&(n?(o+=e+"="+t[e],n=!1):"undefined"!=t[e]&&(o+="&"+e+"="+t[e]))});var i=window.location.href.split("?")[0];e(".builder--side-drawer__link").text(i+o)}(a),t=".builder--side-drawer__link",o=e("<input>"),e("body").append(o),o.val(e(t).text()).select(),document.execCommand("copy"),o.remove(),e(".builder--side-drawer__copied").css("opacity",1),setTimeout(function(){e(".builder--side-drawer__copied").css("opacity",0)},2e3)})}function o(e,t){return _objectSpread({},e,{},t)}function n(t,n){if(""==e("#form--product-identity__inputs__top").val()&&""==e("#form--product-identity__inputs__bottom").val())e(".main").find(".component--branding__vertical-bar").css("display","none"),e(".main").find(".component--product-identity__top").text(""),e(".main").find(".component--product-identity__bottom").text("");else{if(e(".main").find(".component--branding__vertical-bar").css("display","inline-block"),"form--product-identity__inputs__top"==n.name)return e(".main").find(".component--product-identity__top").text(n.value),o(t,{productIDTop:n.value});if("form--product-identity__inputs__bottom"==n.name)return e(".main").find(".component--product-identity__bottom").text(n.value),o(t,{productIDBottom:n.value})}}function i(t){e(".block--palette."+t).find(".block--palette__color").each(function(t){if(3!=t){var o=(i=(i=e(this).css("background-color")).match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===i.length?"#"+("0"+parseInt(i[1],10).toString(16)).slice(-2)+("0"+parseInt(i[2],10).toString(16)).slice(-2)+("0"+parseInt(i[3],10).toString(16)).slice(-2):"",n=".indicator-color--"+(t+1);e(n).find(".global--color-indicator__color").css("background",o),e(n).find(".global--color-indicator__hex").text(o.toUpperCase())}var i})}var c=function(e){var t={},o=document.createElement("a");o.href=e;for(var n=o.search.substring(1).split("&"),i=0;i<n.length;i++){var c=n[i].split("=");t[c[0]]=decodeURIComponent(c[1])}return t};"undefined"!=typeof Drupal?function(e,o){o.behaviors.buildControls={attach:function(e){t(e)}}}(jQuery,Drupal):e(document).ready(function(){e("#builder").length&&t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".parallax").length){var e=document.querySelectorAll(".parallax");M.Parallax.init(e)}}"undefined"!=typeof Drupal?function(e,o){o.behaviors.initBlockHero={attach:function(o){e("body",o).once("nds-block-hero").each(function(){t(o)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".materialboxed").length){var e=document.querySelectorAll(".materialboxed");M.Materialbox.init(e)}}"undefined"!=typeof Drupal?function(e,o){o.behaviors.initComponentLightbox={attach:function(o){e("body",o).once("nds-component-lightbox").each(function(){t(o)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".component--modal").length)for(var e='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',t=document.getElementsByClassName("component--modal"),o=function(){var o=t[n].querySelectorAll(e)[0],i=t[n].querySelectorAll(e),c=i[i.length-1];document.addEventListener("keydown",function(e){("Tab"===e.key||9===e.keyCode)&&(e.shiftKey?document.activeElement===o&&(c.focus(),e.preventDefault()):document.activeElement===c&&(o.focus(),e.preventDefault()))}),o.focus()},n=0;n<t.length;n++)o()}"undefined"!=typeof Drupal?function(e,o){o.behaviors.initComponentModal={attach:function(o){e("body",o).once("nds-component-modal").each(function(){t(o)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),document.addEventListener("DOMContentLoaded",function(e){initNavigationDrawer()}),document.addEventListener("DOMContentLoaded",function(e){initNavigationLocal()}),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e(function(){e('[data-toggle="tooltip"]').tooltip()})}"undefined"!=typeof Drupal?function(e,o){o.behaviors.initInputNDS={attach:function(o){e("body",o).once("nds-input").each(function(){t(o)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e(".input--date-picker").each(function(){"true"==e(this).find("input").attr("nds-date-picker")&&e(this).find("input").datepicker()})}"undefined"!=typeof Drupal?function(e,o){o.behaviors.initInputDatePicker={attach:function(o){e("body",o).once("nds-input-date-picker").each(function(){t(o)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e("select").each(function(){"true"==e(this).attr("nds-select")&&(e(this).select2({minimumResultsForSearch:10}),""!=e(this).val()&&e(this).siblings(".select2-container").addClass("no-clear selection-made"))}),e("select").change(function(t,o){"true"==e(this).attr("nds-select")&&(t.target.multiple?e(this).find("option:selected").length>0?e(this).siblings(".select2-container").addClass("selection-made-multi"):e(this).siblings(".select2-container").removeClass("selection-made-multi"):(e(this).siblings(".select2-container").addClass("selection-made"),e(this).siblings(".select2-container").find(".single-clear").length||"true"==e(this).attr("data-select-all-times")||e(this).siblings(".select2-container").append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>')))}),e("select").on("select2:open",function(t){e(".select2-container").find(".select2-search__field").attr("aria-label","Search for choices"),e(".select2-container").find(".select2-results__options").attr("aria-label","Available choices")}),e(document).on("click",".single-clear",function(t){t.stopPropagation();var o=e(this).parent().siblings("select");o.prop("selectedIndex",0);var n=o.attr("data-placeholder");e(this).parent().removeClass("selection-made"),e(this).siblings(".selection").find(".select2-selection__rendered").text(n),e(this).remove()})}"undefined"!=typeof Drupal?function(e,o){o.behaviors.initInputSelect={attach:function(o){e("body",o).once("nds-input-select").each(function(){t(o)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),document.addEventListener("DOMContentLoaded",function(e){initLinkExternal(),initLinkExternalMailto()}),document.addEventListener("DOMContentLoaded",function(e){initDataAttributes()}),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e("table").each(function(){if("true"==e(this).attr("nds-datatable")){var t={responsive:!0,paging:!1,info:!1,autoWidth:!1,searching:!1};if("true"!=e(this).attr("data-tablesort"))t.ordering=!1;else{var o=[];e(this).find("thead").find("th").each(function(t){"true"==e(this).attr("data-column-num")&&o.push({type:"natural",targets:t})}),t.columnDefs=o}e(this).dataTable(t)}})}"undefined"!=typeof Drupal?function(e,o){o.behaviors.initTableDefault={attach:function(o){e("body",o).once("nds-table-default").each(function(){t(o)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery);