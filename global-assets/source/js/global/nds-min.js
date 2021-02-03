"use strict";function initLinkExternal(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll("a"),t=0;t<e.length;t++)if(""!=e[t].innerHTML){var n=e[t].getAttribute("href"),o=e[t].hostname;if(n&&o!==location.hostname&&((n=n.toLowerCase()).indexOf("http://")>-1||n.indexOf("https://")>-1)&&n.indexOf("localhost:3002")<=0){e[t].setAttribute("target","_blank");var i=document.createElement("a");i.setAttribute("href",n),i.setAttribute("class","ext-link-icon"),i.setAttribute("aria-label","External Link"),e[t].insertAdjacentElement("afterend",i)}}}function initLinkExternalMailto(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll('a[href^="mailto:"]'),t=0;t<e.length;t++)e[t].classList.add("link--external--mail")}function initDataAttributes(){for(var e=0;e<document.getElementsByClassName("layouts--body").length;e++){setDataAttributes(document.getElementsByClassName("layouts--body")[e].querySelectorAll("a"),"data-content","body-anchor-")}for(e=0;e<document.getElementsByClassName("navigation--primary").length;e++){setDataAttributes(document.getElementsByClassName("navigation--primary")[e].querySelectorAll("a"),"data-nav","header-nav-")}for(e=0;e<document.getElementsByClassName("global--footer").length;e++){setDataAttributes(document.getElementsByClassName("global--footer")[e].querySelectorAll("a"),"data-nav","footer-nav-")}for(e=0;e<document.getElementsByClassName("component--accordion__card").length;e++){setDataAttributes(document.getElementsByClassName("component--accordion__card")[e].querySelectorAll("button"),"data-content","accordion-")}}function setDataAttributes(e,t,n){for(var o=0;o<e.length;o++){var i=e[o].textContent.trim();""!==i&&(i=(i=i.replace(/\//g,"-")).replace(/\s+/g,"-").toLowerCase(),e[o].setAttribute(t,n+i))}}function initComponentUSWDSBanner(){document.querySelector("#uswds-banner-toggle").addEventListener("click",function(e){"true"==document.getElementById("uswds-banner-toggle").getAttribute("aria-expanded")?(document.getElementById("uswds-banner-toggle").setAttribute("aria-expanded","false"),document.getElementById("uswds-banner-content").style.display="none"):(document.getElementById("uswds-banner-toggle").setAttribute("aria-expanded","true"),document.getElementById("uswds-banner-content").style.display="block")})}function initNavigationDrawer(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;var e=windowWidth();document.querySelector("#global-mobile-menu").addEventListener("click",function(e){document.querySelector("#main-navigation-mobile").classList.add("drawer--open"),getNextSibling(document.querySelector("#main-navigation-mobile"),".navigation--drawer--overlay").style.display="block",document.querySelector(".navigation--drawer__top__button-close").focus();for(var t=document.querySelector("#main-navigation-mobile").querySelectorAll("button, a"),n=0;n<t.length;n++)t[n].setAttribute("tabindex","0")}),document.querySelector(".navigation--drawer--overlay").addEventListener("click",function(e){closeMenu()}),document.querySelector(".navigation--drawer__top__button-close").addEventListener("click",function(e){closeMenu()}),window.onresize=function(t){e!=windowWidth()&&(e=windowWidth(),closeMenu())},document.querySelector(".skip-to--top").addEventListener("focus",function(e){document.querySelector(".navigation--drawer__top__button-close").focus()}),document.querySelector(".skip-to--back").addEventListener("focus",function(e){var t=document.querySelector(".navigation--drawer__inner").querySelectorAll("button, a");t[t.length-1].focus()})}function closeMenu(){document.querySelector("#global-mobile-menu").focus(),document.querySelector("#main-navigation-mobile").classList.remove("drawer--open"),getNextSibling(document.querySelector("#main-navigation-mobile"),".navigation--drawer--overlay").style.display="none";for(var e=document.querySelector("#main-navigation-mobile").querySelectorAll("button, a"),t=0;t<e.length;t++)e[t].setAttribute("tabindex","-1")}function initNavigationLocal(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".navigation--local").length)for(var e=document.getElementsByClassName("navigation--local__group__label"),t=0;t<e.length;t++)e[t].addEventListener("keydown",function(e){(e.isComposing||13===e.keyCode)&&this.click()})}!function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e(function(){e('[data-toggle="tooltip"]').tooltip()})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initInputNDS={attach:function(n){e("body",n).once("nds-input").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e(".input--date-picker").each(function(){"true"==e(this).find("input").attr("nds-date-picker")&&e(this).find("input").datepicker()})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initInputDatePicker={attach:function(n){e("body",n).once("nds-input-date-picker").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e("select").each(function(){"true"==e(this).attr("nds-select")&&(e(this).select2({minimumResultsForSearch:10}),""!=e(this).val()&&e(this).siblings(".select2-container").addClass("no-clear selection-made"))}),e("select").change(function(t,n){"true"==e(this).attr("nds-select")&&(t.target.multiple?e(this).find("option:selected").length>0?e(this).siblings(".select2-container").addClass("selection-made-multi"):e(this).siblings(".select2-container").removeClass("selection-made-multi"):(e(this).siblings(".select2-container").addClass("selection-made"),e(this).siblings(".select2-container").find(".single-clear").length||"true"==e(this).attr("data-select-all-times")||e(this).siblings(".select2-container").append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>')))}),e("select").on("select2:open",function(t){e(".select2-container").find(".select2-search__field").attr("aria-label","Search for choices"),e(".select2-container").find(".select2-results__options").attr("aria-label","Available choices")}),e(document).on("click",".single-clear",function(t){t.stopPropagation();var n=e(this).parent().siblings("select");n.prop("selectedIndex",0);var o=n.attr("data-placeholder");e(this).parent().removeClass("selection-made"),e(this).siblings(".selection").find(".select2-selection__rendered").text(o),e(this).remove()})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initInputSelect={attach:function(n){e("body",n).once("nds-input-select").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),document.addEventListener("DOMContentLoaded",function(e){initLinkExternal(),initLinkExternalMailto()}),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e("table").each(function(){if("true"==e(this).attr("nds-datatable")){var t={responsive:!0,paging:!1,info:!1,autoWidth:!1,searching:!1};if("true"!=e(this).attr("data-tablesort"))t.ordering=!1;else{var n=[];e(this).find("thead").find("th").each(function(t){"true"==e(this).attr("data-column-num")&&n.push({type:"natural",targets:t})}),t.columnDefs=n}e(this).dataTable(t)}})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initTableDefault={attach:function(n){e("body",n).once("nds-table-default").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),document.addEventListener("DOMContentLoaded",function(e){initDataAttributes()}),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".parallax").length){var e=document.querySelectorAll(".parallax");M.Parallax.init(e)}}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initBlockHero={attach:function(n){e("body",n).once("nds-block-hero").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".materialboxed").length){var e=document.querySelectorAll(".materialboxed");M.Materialbox.init(e)}}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initComponentMedia={attach:function(n){e("body",n).once("nds-component-media").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".component--modal").length)for(var e='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',t=document.getElementsByClassName("component--modal"),n=function(){var n=t[o].querySelectorAll(e)[0],i=t[o].querySelectorAll(e),a=i[i.length-1];document.addEventListener("keydown",function(e){("Tab"===e.key||9===e.keyCode)&&(e.shiftKey?document.activeElement===n&&(a.focus(),e.preventDefault()):document.activeElement===a&&(n.focus(),e.preventDefault()))}),n.focus()},o=0;o<t.length;o++)n()}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initComponentModal={attach:function(n){e("body",n).once("nds-component-modal").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),document.addEventListener("DOMContentLoaded",function(e){initComponentUSWDSBanner()}),document.addEventListener("DOMContentLoaded",function(e){initNavigationDrawer()}),document.addEventListener("DOMContentLoaded",function(e){initNavigationLocal()});