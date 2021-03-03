"use strict";!function(e){function t(){for(var e=0;e<document.getElementsByClassName("layouts--body").length;e++){n(document.getElementsByClassName("layouts--body")[e].querySelectorAll("a"),"data-content","body-anchor-")}for(e=0;e<document.getElementsByClassName("navigation--primary").length;e++){n(document.getElementsByClassName("navigation--primary")[e].querySelectorAll("a"),"data-nav","header-nav-")}for(e=0;e<document.getElementsByClassName("global--header").length;e++){var t=document.getElementsByClassName("global--header")[e].querySelectorAll(".component--branding");for(e=0;e<t.length;e++)t[e].setAttribute("data-nav","header-nav-logo")}for(e=0;e<document.getElementsByClassName("global--footer").length;e++){n(document.getElementsByClassName("global--footer")[e].querySelectorAll("a"),"data-nav","footer-nav-");var o=document.getElementsByClassName("global--footer")[e].querySelectorAll(".image--logo");for(e=0;e<o.length;e++)o[e].setAttribute("data-nav","footer-nav-logo")}for(e=0;e<document.getElementsByClassName("component--accordion__card").length;e++){n(document.getElementsByClassName("component--accordion__card")[e].querySelectorAll("button"),"data-content","accordion-")}}function n(e,t,n){for(var o=0;o<e.length;o++){var a=e[o].textContent.trim();""!==a&&(a=(a=a.replace(/\//g,"-")).replace(/\s+/g,"-").toLowerCase(),e[o].setAttribute(t,n+a))}}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initDataAttributes={attach:function(n){e("body",n).once("nds-data-attributes").each(function(){t()})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".parallax").length){var e=document.querySelectorAll(".parallax");M.Parallax.init(e)}}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initBlockHero={attach:function(n){e("body",n).once("nds-block-hero").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".materialboxed").length){var e=document.querySelectorAll(".materialboxed");M.Materialbox.init(e)}}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initComponentMedia={attach:function(n){e("body",n).once("nds-component-media").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".component--modal").length)for(var e='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',t=document.getElementsByClassName("component--modal"),n=function(){var n=t[o].querySelectorAll(e)[0],a=t[o].querySelectorAll(e),i=a[a.length-1];document.addEventListener("keydown",function(e){("Tab"===e.key||9===e.keyCode)&&(e.shiftKey?document.activeElement===n&&(i.focus(),e.preventDefault()):document.activeElement===i&&(n.focus(),e.preventDefault()))}),n.focus()},o=0;o<t.length;o++)n()}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initComponentModal={attach:function(n){e("body",n).once("nds-component-modal").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){document.querySelectorAll("#uswds-banner-toggle").length>0&&document.querySelector("#uswds-banner-toggle").addEventListener("click",function(e){"true"==document.getElementById("uswds-banner-toggle").getAttribute("aria-expanded")?(document.getElementById("uswds-banner-toggle").setAttribute("aria-expanded","false"),document.getElementById("uswds-banner-content").style.display="none"):(document.getElementById("uswds-banner-toggle").setAttribute("aria-expanded","true"),document.getElementById("uswds-banner-content").style.display="block")})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initComponentUSWDSBanner={attach:function(n){e("body",n).once("nds-component-uswds-banner").each(function(){t()})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".navigation--drawer").length>0){var e=windowWidth();document.querySelector("#global-mobile-menu").addEventListener("click",function(e){document.querySelector("#main-navigation-mobile").classList.add("drawer--open"),getNextSibling(document.querySelector("#main-navigation-mobile"),".navigation--drawer--overlay").style.display="block",document.querySelector(".navigation--drawer__top__button-close").focus();for(var t=document.querySelector("#main-navigation-mobile").querySelectorAll("button, a"),n=0;n<t.length;n++)t[n].setAttribute("tabindex","0")}),document.querySelector(".navigation--drawer--overlay").addEventListener("click",function(e){n()}),document.querySelector(".navigation--drawer__top__button-close").addEventListener("click",function(e){n()}),window.onresize=function(t){e!=windowWidth()&&(e=windowWidth(),n())},document.querySelector(".skip-to--top").addEventListener("focus",function(e){document.querySelector(".navigation--drawer__top__button-close").focus()}),document.querySelector(".skip-to--back").addEventListener("focus",function(e){var t=document.querySelector(".navigation--drawer__inner").querySelectorAll("button, a");t[t.length-1].focus()})}}function n(){document.querySelector("#global-mobile-menu").focus(),document.querySelector("#main-navigation-mobile").classList.remove("drawer--open"),getNextSibling(document.querySelector("#main-navigation-mobile"),".navigation--drawer--overlay").style.display="none";for(var e=document.querySelector("#main-navigation-mobile").querySelectorAll("button, a"),t=0;t<e.length;t++)e[t].setAttribute("tabindex","-1")}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initNavigationDrawer={attach:function(n){e("body",n).once("nds-navigation-drawer").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll(".input--radio, .input--checkbox"),t=0;t<e.length;t++)e[t].addEventListener("keydown",function(e){"Enter"!==e.code&&"13"!==e.keyCode&&"Space"!==e.code&&"23"!==e.keyCode||e.target.querySelector("input").click()})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initInputNDS={attach:function(n){e("body",n).once("nds-input").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e(".input--date-picker").each(function(){"true"==e(this).find("input").attr("nds-date-picker")&&e(this).find("input").datepicker()})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initInputDatePicker={attach:function(n){e("body",n).once("nds-input-date-picker").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e('[data-toggle="tooltip"]').tooltip(),e("select").each(function(){"true"==e(this).attr("nds-select")&&(e(this).select2({minimumResultsForSearch:10}),""!=e(this).val()&&e(this).siblings(".select2-container").addClass("no-clear selection-made"))}),e("select").change(function(t,n){"true"==e(this).attr("nds-select")&&(t.target.multiple?e(this).find("option:selected").length>0?e(this).siblings(".select2-container").addClass("selection-made-multi"):e(this).siblings(".select2-container").removeClass("selection-made-multi"):(e(this).siblings(".select2-container").addClass("selection-made"),e(this).siblings(".select2-container").find(".single-clear").length||"true"==e(this).attr("data-select-all-times")||e(this).siblings(".select2-container").append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>')))}),e("select").on("select2:open",function(t){e(".select2-container").find(".select2-search__field").attr("aria-label","Search for choices"),e(".select2-container").find(".select2-results__options").attr("aria-label","Available choices")}),e(".select2-selection--single").find(".select2-selection__rendered").attr("aria-label","Click to select option."),e(".select2-selection--multiple").attr("aria-label","Click to select option(s)."),e(document).on("click",".single-clear",function(t){t.stopPropagation();var n=e(this).parent().siblings("select");n.prop("selectedIndex",0);var o=n.attr("data-placeholder");e(this).parent().removeClass("selection-made"),e(this).siblings(".selection").find(".select2-selection__rendered").text(o),e(this).remove()})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initInputSelect={attach:function(n){e("body",n).once("nds-input-select").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll("a"),t=0;t<e.length;t++)if(""!=e[t].innerHTML){var n=e[t].getAttribute("href"),o=e[t].hostname;if(n&&o!==location.hostname&&((n=n.toLowerCase()).indexOf("http://")>-1||n.indexOf("https://")>-1)&&n.indexOf("localhost:3002")<=0){e[t].setAttribute("target","_blank");var a=document.createElement("a");a.setAttribute("href",n),a.setAttribute("class","ext-link-icon"),a.setAttribute("aria-label","External Link"),e[t].insertAdjacentElement("afterend",a)}}}function n(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll('a[href^="mailto:"]'),t=0;t<e.length;t++)e[t].classList.add("link--external--mail")}"undefined"!=typeof Drupal?function(e,o){o.behaviors.initLinks={attach:function(o){e("body",o).once("nds-links").each(function(){t(o),n(o)})}}}(jQuery,Drupal):e(document).ready(function(){t(),n()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e("table").each(function(){if("true"==e(this).attr("nds-datatable")){var t={responsive:!0,paging:!1,info:!1,autoWidth:!1,searching:!1};if("true"!=e(this).attr("data-tablesort"))t.ordering=!1;else{var n=[];e(this).find("thead").find("th").each(function(t){"true"==e(this).attr("data-column-num")&&n.push({type:"natural",targets:t})}),t.columnDefs=n}e(this).dataTable(t)}})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initTableDefault={attach:function(n){e("body",n).once("nds-table-default").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery);