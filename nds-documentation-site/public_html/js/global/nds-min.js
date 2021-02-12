"use strict";function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach(function(t){_defineProperty(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var getNextSibling=function(e,t){for(var n=e.nextElementSibling;n;){if(n.matches(t))return n;n=n.nextElementSibling}};function windowWidth(){var e=window.document.documentElement.clientWidth,t=window.document.body;return"CSS1Compat"===window.document.compatMode&&e||t&&t.clientWidth||e}function initDataAttributes(){for(var e=0;e<document.getElementsByClassName("layouts--body").length;e++){setDataAttributes(document.getElementsByClassName("layouts--body")[e].querySelectorAll("a"),"data-content","body-anchor-")}for(e=0;e<document.getElementsByClassName("navigation--primary").length;e++){setDataAttributes(document.getElementsByClassName("navigation--primary")[e].querySelectorAll("a"),"data-nav","header-nav-")}for(e=0;e<document.getElementsByClassName("global--footer").length;e++){setDataAttributes(document.getElementsByClassName("global--footer")[e].querySelectorAll("a"),"data-nav","footer-nav-")}for(e=0;e<document.getElementsByClassName("component--accordion__card").length;e++){setDataAttributes(document.getElementsByClassName("component--accordion__card")[e].querySelectorAll("button"),"data-content","accordion-")}}function setDataAttributes(e,t,n){for(var o=0;o<e.length;o++){var i=e[o].textContent.trim();""!==i&&null==e[o].closest(".component--snippet")&&(i=(i=i.replace(/\//g,"-")).replace(/\s+/g,"-").toLowerCase(),e[o].setAttribute(t,n+i))}}function initInputNDS(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll(".input--radio, .input--checkbox"),t=0;t<e.length;t++)e[t].addEventListener("keydown",function(e){"Enter"!==e.code&&"13"!==e.keyCode&&"Space"!==e.code&&"23"!==e.keyCode||e.target.querySelector("input").click()})}function initLinkExternal(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll("a"),t=0;t<e.length;t++)if(""!=e[t].innerHTML){var n=e[t].getAttribute("href"),o=e[t].hostname;if(n&&o!==location.hostname&&((n=n.toLowerCase()).indexOf("http://")>-1||n.indexOf("https://")>-1)&&n.indexOf("localhost:3002")<=0){e[t].setAttribute("target","_blank");var i=document.createElement("a");i.setAttribute("href",n),i.setAttribute("class","ext-link-icon"),i.setAttribute("aria-label","External Link"),e[t].insertAdjacentElement("afterend",i)}}}function initLinkExternalMailto(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll('a[href^="mailto:"]'),t=0;t<e.length;t++)e[t].classList.add("link--external--mail")}function initComponentUSWDSBanner(){document.querySelectorAll("#uswds-banner-toggle").length>0&&document.querySelector("#uswds-banner-toggle").addEventListener("click",function(e){"true"==document.getElementById("uswds-banner-toggle").getAttribute("aria-expanded")?(document.getElementById("uswds-banner-toggle").setAttribute("aria-expanded","false"),document.getElementById("uswds-banner-content").style.display="none"):(document.getElementById("uswds-banner-toggle").setAttribute("aria-expanded","true"),document.getElementById("uswds-banner-content").style.display="block")})}function initNavigationLocal(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".navigation--local").length)for(var e=document.getElementsByClassName("navigation--local__group__label"),t=0;t<e.length;t++)e[t].addEventListener("keydown",function(e){(e.isComposing||13===e.keyCode)&&this.click()})}function initNavigationDrawer(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".navigation--drawer").length>0){var e=windowWidth();document.querySelector("#global-mobile-menu").addEventListener("click",function(e){document.querySelector("#main-navigation-mobile").classList.add("drawer--open"),getNextSibling(document.querySelector("#main-navigation-mobile"),".navigation--drawer--overlay").style.display="block",document.querySelector(".navigation--drawer__top__button-close").focus();for(var t=document.querySelector("#main-navigation-mobile").querySelectorAll("button, a"),n=0;n<t.length;n++)t[n].setAttribute("tabindex","0")}),document.querySelector(".navigation--drawer--overlay").addEventListener("click",function(e){closeMenu()}),document.querySelector(".navigation--drawer__top__button-close").addEventListener("click",function(e){closeMenu()}),window.onresize=function(t){e!=windowWidth()&&(e=windowWidth(),closeMenu())},document.querySelector(".skip-to--top").addEventListener("focus",function(e){document.querySelector(".navigation--drawer__top__button-close").focus()}),document.querySelector(".skip-to--back").addEventListener("focus",function(e){var t=document.querySelector(".navigation--drawer__inner").querySelectorAll("button, a");t[t.length-1].focus()})}}function closeMenu(){document.querySelector("#global-mobile-menu").focus(),document.querySelector("#main-navigation-mobile").classList.remove("drawer--open"),getNextSibling(document.querySelector("#main-navigation-mobile"),".navigation--drawer--overlay").style.display="none";for(var e=document.querySelector("#main-navigation-mobile").querySelectorAll("button, a"),t=0;t<e.length;t++)e[t].setAttribute("tabindex","-1")}!function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e(".scrollspy").length&&e(".scrollspy").scrollSpy()}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initComponentScrollspySection={attach:function(n){e("body",n).once("nds-component-scrollspy-section").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),document.addEventListener("DOMContentLoaded",function(e){initDataAttributes()}),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e(".component--snippet__block__code__wrapper__snippet").each(function(){if(e("#components").length||e("#migration-guide").length){var t=e(this).html().replace(/ "/g,'"').replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/(^[ \t]*\n)/gm,"");e(this).empty(),e(this).append(t),e(this).wrapInner('<pre><code class="language-markup"></code></pre>');var n=e(this).find("code");Prism.highlightElement(n[0]),e(".component--snippet__block__code__wrapper").show(),e(".component--snippet__block__code__loader").hide()}else{n=e(this).find("code");Prism.highlightElement(n[0]),e(".component--snippet__block__code__wrapper").show(),e(".component--snippet__block__code__loader").hide()}}),e(".component--snippet").find(".button--icon").on("click",function(){var t,n,o,i=e(this).siblings(".component--snippet__block__code__wrapper__button__copied");i.css("opacity",0),t=e(this).parentsUntil(".component--snippet").parent().find("pre"),n=t.text(),(o=document.createElement("textarea")).classList.add("hidden-textarea"),o.textContent=n,document.body.append(o),o.select(),document.execCommand("copy"),o.remove(),i.css("opacity",1),setTimeout(function(){i.css("opacity",0)},2e3)}),e(".component--snippet__block__pattern__toggle").on("click",function(){e(this).siblings(".component--snippet__block__pattern__content").toggleClass("open"),e(this).toggleClass("open")}),e(".component--snippet").find(".component--uswds-banner__toggle").on("click",function(){"true"==e(this).attr("aria-expanded")?(e(this).attr("aria-expanded","false"),e(this).siblings(".component--uswds-banner__content").hide()):(e(this).attr("aria-expanded","true"),e(this).siblings(".component--uswds-banner__content").show())})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initComponentSnippet={attach:function(n){e("body",n).once("nds-component-snippet").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;var t=window.matchMedia("all and (max-width: 992px)"),n=e(window).width();t.matches?e("#custom-styles-toggle").hide():e("#custom-styles-toggle").show(),e(window).on("resize",function(){n!=e(this).width()&&(n=e(this).width(),t.matches?(e("#custom-styles-toggle").hide(),e(".component--style-controls").removeClass("component--style-controls--open"),e("body").css("padding-top",0)):e("#custom-styles-toggle").show())}),e("#custom-styles-toggle").on("click",function(){e(".component--style-controls").toggleClass("component--style-controls--open"),e(".component--style-controls").hasClass("component--style-controls--open")?e("body").css("padding-top",e(".component--style-controls").outerHeight()+"px"):e("body").css("padding-top",0)});var o={headings:"public-sans",body:"public-sans",colors:"theme-1",shadows:"false",corners:"semirounded"};function i(t,n,o){var i=t.val();e("body").removeClass("style--"+n+"--"+o[n]),e("body").addClass("style--"+n+"--"+i);var a,c,s="NDS_DOC_SITE_PROP--"+n;return e.cookie(s,i,{expires:30,path:"/"}),a=o,c=_defineProperty({},n,i),_objectSpread({},a,{},c)}o=function(t){var n=t;e.cookie("NDS_DOC_SITE_PROP--shadows")&&(e("body").addClass("style--shadows"),e.cookie("NDS_DOC_SITE_PROP--shadows",!0,{expires:30,path:"/"}),e('#shadows option[value="shadows"]').prop("selected",!0));for(var o in n){var a="NDS_DOC_SITE_PROP--"+o;if(e.cookie(a))switch(o){case"headings":e("#text-heading option[value="+e.cookie(a)+"]").prop("selected",!0),n=i(e("#text-heading"),o,n);break;case"body":e("#text-body option[value="+e.cookie(a)+"]").prop("selected",!0),n=i(e("#text-body"),o,n);break;case"colors":e("#color-select option[value="+e.cookie(a)+"]").prop("selected",!0),n=i(e("#color-select"),o,n);break;case"corners":e("#corners option[value="+e.cookie(a)+"]").prop("selected",!0),n=i(e("#corners"),o,n)}}return n}(o),e("#text-heading").on("change",function(){o=i(e(this),"headings",o)}),e("#text-body").on("change",function(){o=i(e(this),"body",o)}),e("#color-select").on("change",function(){o=i(e(this),"colors",o)}),e("#shadows").on("change",function(){"shadows"==e(this).val()?(e("body").addClass("style--shadows"),e.cookie("NDS_DOC_SITE_PROP--shadows",!0,{expires:30,path:"/"})):(e("body").removeClass("style--shadows"),e.removeCookie("NDS_DOC_SITE_PROP--shadows",{path:"/"}))}),e("#corners").on("change",function(){o=i(e(this),"corners",o)})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.init_style_controls={attach:function(n){e(".page",n).once("nds-style-controls").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){e("#builder").length||t()})}(jQuery),function(e){function t(t){window.matchMedia("all and (max-width: 991px)");var c={tab:"mockup",heading:"roboto",body:"roboto",colors:"theme-1",shadows:"false",corners:"semirounded",hero:"false",productIDTop:"",productIDBottom:""},s=a(window.location.href);function r(t){var o=e("input[name='headings']:checked").val();return e("body").removeClass("style--headings--"+t.heading),e("body").addClass("style--headings--"+o),n(t,{heading:o})}function l(t){var o=e("input[name='body']:checked").val();return e("body").removeClass("style--body--"+t.body),e("body").addClass("style--body--"+o),n(t,{body:o})}function d(t){var o=e("input[name='colors']:checked").val();return e("body").removeClass("style--colors--"+t.colors),e("body").addClass("style--colors--"+o),i(o),n(t,{colors:o})}function u(t){return"shadows"==e("input[name='shadow']:checked").val()?(e("body").addClass("style--shadows"),n(t,{shadows:"true"})):(e("body").removeClass("style--shadows"),n(t,{shadows:"false"}))}function p(t){var o=e("input[name='corners']:checked").val();return"rounded"==o?(e("body").removeClass("style--corners--semirounded").addClass("style--corners--rounded"),n(t,{corners:"rounded"})):"semirounded"==o?(e("body").removeClass("style--corners--rounded").addClass("style--corners--semirounded"),n(t,{corners:"semirounded"})):(e("body").removeClass("style--corners--rounded style--corners--semirounded"),n(t,{corners:"straight"}))}function h(t){return"yes"==e("input[name='hero']:checked").val()?(e("#block--hero").show(),e("body").addClass("style--hero"),n(t,{hero:"true"})):(e("#block--hero").hide(),e("body").removeClass("style--hero"),n(t,{hero:"false"}))}function m(t,o,i){return e(".layouts--tabs__tab").each(function(){e(this).removeClass("active-tab"),e(this).attr("tabindex","0")}),e(".layouts--tabs__window").each(function(){e(this).hide()}),"mockup"==i?e("#layouts--tabs__mockup").show():e("#layouts--tabs__style-tile").show(),e(o).addClass("active-tab"),e(o).attr("tabindex","-1"),e("table").each(function(){e(this).hasClass("dataTable")&&e(this).DataTable().columns.adjust().responsive.recalc()}),n(t,{tab:i})}(function(t){e(".layouts--tabs__tab").each(function(){e(this).removeClass("active-tab"),e(this).attr("tabindex","0")}),e(".layouts--tabs__window").each(function(){e(this).hide()}),"st"==t.tab?(e("#tab--style-tile").addClass("active-tab"),e("#tab--style-tile").attr("tabindex","-1"),e("#layouts--tabs__style-tile").show()):(e("#tab--mockup").addClass("active-tab"),e("#tab--mockup").attr("tabindex","-1"),e("#layouts--tabs__mockup").show());e(".form--controls--headings input[value="+t.heading+"]").click(),e(".form--controls--body input[value="+t.body+"]").click(),e(".form--controls--colors input[value="+t.colors+"]").click(),i(t.colors),"true"==t.shadows?(e("body").addClass("style--shadows"),e(".form--controls--shadows input[value=shadows]").click()):(e("body").removeClass("style--shadows"),e(".form--controls--shadows input[value=no_shadows]").click());"rounded"==t.corners?(e("body").removeClass("style--corners--semirounded").addClass("style--corners--rounded"),e(".form--controls--corners input[value=rounded]").click()):"semirounded"==t.corners?(e("body").removeClass("style--corners--rounded").addClass("style--corners--semirounded"),e(".form--controls--corners input[value=semirounded]").click()):(e("body").removeClass("style--corners--rounded style--corners--semirounded"),e(".form--controls--corners input[value=straight]").click());"true"==t.hero?(e("#block--hero").show(),e("#block--header").hide(),e("body").addClass("style--hero"),e(".form--controls--hero input[value=yes]").click()):(e("#block--hero").hide(),e("#block--header").show(),e("body").removeClass("style--hero"),e(".form--controls--hero input[value=no]").click());""!=t.productIDTop&&(e("#form--product-identity__inputs__top").val(t.productIDTop),e(".main").find(".text--product-identity__top").text(t.productIDTop));""!=t.productIDBottom&&(e("#form--product-identity__inputs__bottom").val(t.productIDBottom),e(".main").find(".text--product-identity__bottom").text(t.productIDBottom));""==t.productIDTop&&""==t.productIDBottom||e(".main").find(".component--branding__vertical-bar").css("display","inline-block")})(c=n(c,s)),e("body").addClass("style--headings--"+c.heading),e(".form--controls--headings input[type='radio']").click(function(){c=r(c)}),e(".form--controls--headings label",t).keypress(function(t){13==t.which&&(e(this).siblings("input").prop("checked",!0),c=r(c))}),e("body").addClass("style--body--"+c.body),e(".form--controls--body input[type='radio']").click(function(){c=l(c)}),e(".form--controls--body label",t).keypress(function(t){13==t.which&&(e(this).siblings("input").prop("checked",!0),c=l(c))}),e("body").addClass("style--colors--"+c.colors),e(".form--controls--colors input[type='radio']").click(function(){c=d(c)}),e(".block--palette").click(function(){var t=e(this).attr("class").split(" "),o=t[t.length-1];e("input[name='colors'][value="+o+"]").prop("checked",!0),e("body").removeClass("style--colors--"+c.colors),e("body").addClass("style--colors--"+o),i(o),c=n(c,{colors:o})}),e(".form--controls--colors label",t).keypress(function(t){13==t.which&&(e(this).siblings("input").prop("checked",!0),c=d(c))}),e(".form--controls--shadows input[type='radio']").click(function(){c=u(c)}),e(".form--controls--shadows label",t).keypress(function(t){13==t.which&&(e(this).siblings("input").prop("checked",!0),c=u(c))}),e(".form--controls--corners input[type='radio']").click(function(){c=p(c)}),e(".form--controls--corners label",t).keypress(function(t){13==t.which&&(e(this).siblings("input").prop("checked",!0),c=p(c))}),e(".form--controls--hero input[type='radio']").click(function(){c=h(c)}),e(".form--controls--hero label",t).keypress(function(t){13==t.which&&(e(this).siblings("input").prop("checked",!0),c=h(c))}),e("#tab--mockup",t).click(function(){c=m(c,this,"mockup")}),e("#tab--style-tile",t).click(function(){c=m(c,this,"st")}),e("#tab--mockup",t).keypress(function(e){13==e.which&&(c=m(c,this,"mockup"))}),e("#tab--style-tile",t).keypress(function(e){13==e.which&&(c=m(c,this,"st"))}),e("#form--product-identity__inputs__top").on("input",function(){c=o(c,this)}),e("#form--product-identity__inputs__bottom").on("input",function(){c=o(c,this)}),e(".button--use-theme").on("click",function(){var t='"bodyClass": "';t+="style--headings--"+c.heading,t+=" style--body--"+c.body,t+=" style--colors--"+c.colors,"true"==c.shadows?t+=" style--shadows":t+="","true"==c.hero?t+=" style--hero":t+="",t+=" style--corners--"+c.corners,t+='"',e("#selected-choices").text(t)}),e(".button--share-theme").click(function(){var t,n;e(".builder--side-drawer__copied").css("opacity",0),function(t){var n="?",o=!0;Object.keys(t).forEach(function(e){t[e]&&(o?(n+=e+"="+t[e],o=!1):"undefined"!=t[e]&&(n+="&"+e+"="+t[e]))});var i=window.location.href.split("?")[0];e(".builder--side-drawer__link").text(i+n)}(c),t=".builder--side-drawer__link",n=e("<input>"),e("body").append(n),n.val(e(t).text()).select(),document.execCommand("copy"),n.remove(),e(".builder--side-drawer__copied").css("opacity",1),setTimeout(function(){e(".builder--side-drawer__copied").css("opacity",0)},2e3)})}function n(e,t){return _objectSpread({},e,{},t)}function o(t,o){if(""==e("#form--product-identity__inputs__top").val()&&""==e("#form--product-identity__inputs__bottom").val())e(".main").find(".component--branding__vertical-bar").css("display","none"),e(".main").find(".text--product-identity__top").text(""),e(".main").find(".text--product-identity__bottom").text("");else{if(e(".main").find(".component--branding__vertical-bar").css("display","inline-block"),"form--product-identity__inputs__top"==o.name)return e(".main").find(".text--product-identity__top").text(o.value),n(t,{productIDTop:o.value});if("form--product-identity__inputs__bottom"==o.name)return e(".main").find(".text--product-identity__bottom").text(o.value),n(t,{productIDBottom:o.value})}}function i(t){e(".block--palette."+t).find(".block--palette__color").each(function(t){if(3!=t){var n=(i=(i=e(this).css("background-color")).match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===i.length?"#"+("0"+parseInt(i[1],10).toString(16)).slice(-2)+("0"+parseInt(i[2],10).toString(16)).slice(-2)+("0"+parseInt(i[3],10).toString(16)).slice(-2):"",o=".indicator-color--"+(t+1);e(o).find(".global--color-indicator__color").css("background",n),e(o).find(".global--color-indicator__hex").text(n.toUpperCase())}var i})}var a=function(e){var t={},n=document.createElement("a");n.href=e;for(var o=n.search.substring(1).split("&"),i=0;i<o.length;i++){var a=o[i].split("=");t[a[0]]=decodeURIComponent(a[1])}return t};"undefined"!=typeof Drupal?function(e,n){n.behaviors.buildControls={attach:function(e){t(e)}}}(jQuery,Drupal):e(document).ready(function(){e("#builder").length&&t()})}(jQuery),$(document).ready(function(){var e=window.matchMedia("all and (min-width: 992px)"),t=$(window).width();$(".fixed-left").each(function(){e.matches&&stickybits($(this).find(".navigation--mobile-rail"))}),$(window).on("resize",function(){t!=$(this).width()&&(t=$(this).width(),$(".fixed-left").each(function(){e.matches?stickybits($(this).find(".navigation--mobile-rail")):(stickybits($(this).find(".navigation--mobile-rail")).cleanup(),$(this).find(".navigation--mobile-rail").css("position","relative"))}))})}),function(e){function t(t){e("#tab--mockup").attr("tabindex","-1")}"undefined"!=typeof Drupal?function(e,n){n.behaviors.layoutsTabs={attach:function(e){t()}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),document.addEventListener("DOMContentLoaded",function(e){initInputNDS()}),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e(".input--date-picker").each(function(){"true"==e(this).find("input").attr("nds-date-picker")&&e(this).find("input").datepicker()})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initInputDatePicker={attach:function(n){e("body",n).once("nds-input-date-picker").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e('[data-toggle="tooltip"]').tooltip(),e("select").each(function(){"true"==e(this).attr("nds-select")&&(e(this).select2({minimumResultsForSearch:10}),""!=e(this).val()&&e(this).siblings(".select2-container").addClass("no-clear selection-made"))}),e("select").change(function(t,n){"true"==e(this).attr("nds-select")&&(t.target.multiple?e(this).find("option:selected").length>0?e(this).siblings(".select2-container").addClass("selection-made-multi"):e(this).siblings(".select2-container").removeClass("selection-made-multi"):(e(this).siblings(".select2-container").addClass("selection-made"),e(this).siblings(".select2-container").find(".single-clear").length||"true"==e(this).attr("data-select-all-times")||e(this).siblings(".select2-container").append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>')))}),e("select").on("select2:open",function(t){e(".select2-container").find(".select2-search__field").attr("aria-label","Search for choices"),e(".select2-container").find(".select2-results__options").attr("aria-label","Available choices")}),e(".select2-selection--single").attr("aria-label","Click to select option."),e(".select2-selection--multiple").attr("aria-label","Click to select option(s)."),e(document).on("click",".single-clear",function(t){t.stopPropagation();var n=e(this).parent().siblings("select");n.prop("selectedIndex",0);var o=n.attr("data-placeholder");e(this).parent().removeClass("selection-made"),e(this).siblings(".selection").find(".select2-selection__rendered").text(o),e(this).remove()})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initInputSelect={attach:function(n){e("body",n).once("nds-input-select").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e("table").each(function(){if("true"==e(this).attr("nds-datatable")){var t={responsive:!0,paging:!1,info:!1,autoWidth:!1,searching:!1};if("true"!=e(this).attr("data-tablesort"))t.ordering=!1;else{var n=[];e(this).find("thead").find("th").each(function(t){"true"==e(this).attr("data-column-num")&&n.push({type:"natural",targets:t})}),t.columnDefs=n}e(this).dataTable(t)}})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initTableDefault={attach:function(n){e("body",n).once("nds-table-default").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),document.addEventListener("DOMContentLoaded",function(e){initLinkExternal(),initLinkExternalMailto()}),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".parallax").length){var e=document.querySelectorAll(".parallax");M.Parallax.init(e)}}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initBlockHero={attach:function(n){e("body",n).once("nds-block-hero").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".component--modal").length)for(var e='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',t=document.getElementsByClassName("component--modal"),n=function(){var n=t[o].querySelectorAll(e)[0],i=t[o].querySelectorAll(e),a=i[i.length-1];document.addEventListener("keydown",function(e){("Tab"===e.key||9===e.keyCode)&&(e.shiftKey?document.activeElement===n&&(a.focus(),e.preventDefault()):document.activeElement===a&&(n.focus(),e.preventDefault()))}),n.focus()},o=0;o<t.length;o++)n()}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initComponentModal={attach:function(n){e("body",n).once("nds-component-modal").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".materialboxed").length){var e=document.querySelectorAll(".materialboxed");M.Materialbox.init(e)}}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initComponentMedia={attach:function(n){e("body",n).once("nds-component-media").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),document.addEventListener("DOMContentLoaded",function(e){initComponentUSWDSBanner()}),document.addEventListener("DOMContentLoaded",function(e){initNavigationLocal()}),document.addEventListener("DOMContentLoaded",function(e){initNavigationDrawer()});