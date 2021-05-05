"use strict";document.addEventListener("DOMContentLoaded",function(e){window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;--t>=0&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o})});var getNextSibling=function(e,t){for(var n=e.nextElementSibling;n;){if(n.matches(t))return n;n=n.nextElementSibling}};function windowWidth(){var e=window.document.documentElement.clientWidth,t=window.document.body;return"CSS1Compat"===window.document.compatMode&&e||t&&t.clientWidth||e}function hasClass(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")>-1}function activateToast(e){var t=1e3*e.getAttribute("data-duration");hasClass(e,"show")||(e.classList.add("show"),setTimeout(function(){e.classList.remove("show"),e.classList.add("exit"),setTimeout(function(){destroyToast(e)},1e3)},t))}function destroyToast(e){e.remove()}!function(e){function t(){for(var e=document.getElementsByClassName("component--accordion__card"),t=0;t<e.length;t++){n(e[t].querySelectorAll("button"),"data-content","accordion-")}var a=document.getElementsByClassName("navigation--tabs");for(t=0;t<a.length;t++){n(a[t].querySelectorAll(".navigation--tabs__tab"),"data-content","nav-")}var i=document.getElementsByClassName("layouts--body");for(t=0;t<i.length;t++){n(i[t].querySelectorAll("a, button"),"data-content","body-anchor-")}for(var r=document.getElementsByClassName("global--header"),c=0;c<r.length;c++){for(var l=r[c].querySelectorAll(".component--branding"),u=0;u<l.length;u++)l[u].setAttribute("data-nav","header-nav-logo");n(r[c].querySelectorAll("a, button"),"data-nav","header-nav-")}var d=document.getElementsByClassName("navigation--primary");for(t=0;t<d.length;t++)for(var s=d[t].querySelectorAll(".navigation--primary__inner__item"),f=0;f<s.length;f++){var m=s[f].children[0];if(hasClass(m,"navigation--dropdown")){var h=s[f].children[0].children[0].textContent.trim();if(""!==h)h=(h=h.replace(/\//g,"-")).replace(/\s+/g,"-").toLowerCase(),n(m.querySelectorAll(".navigation--dropdown__toggle"),"data-nav","header-nav-"+h+"-"),n(m.querySelectorAll(".navigation--dropdown__menu > a"),"data-nav","header-nav-"+h+"-")}else o(m,"data-nav","header-nav-")}var g=document.getElementsByClassName("global--footer");for(t=0;t<g.length;t++){for(var v=g[t].querySelectorAll(".image--logo"),y=0;y<v.length;y++)v[y].setAttribute("data-nav","footer-nav-logo");n(g[t].querySelectorAll("a, button"),"data-nav","footer-nav-")}n(document.getElementsByClassName("button--floating"),"data-nav","header-nav-");var p=document.getElementsByClassName("navigation--mobile-rail__content");for(t=0;t<p.length;t++){n(p[t].querySelectorAll("a"),"data-nav","nav-left-")}}function n(e,t,n){if(e.length>0&&void 0!==e)for(var i=0;i<e.length;i++)e[i].hasAttribute(t)?a(e[i],t):o(e[i],t,n)}function o(e,t,n){var o=e.textContent.trim();if(""!==o)o=(o=o.replace(/\//g,"-")).replace(/\s+/g,"-").toLowerCase(),e.setAttribute(t,n+o),a(e,t);else if(hasClass(e,"button--share")){var i=e.classList[2].split("button--share--"),r=i[i.length-1],c="";c="header-nav-"==n?"header-nav-social-share-":"footer-nav-"==n?"footer-nav-social-share-":"body-social-share-",e.setAttribute(t,c+r),a(e,t)}}function a(e,t){for(var n=e.getAttribute(t),o=e.querySelectorAll("i, span, div, img, strong"),a=0;a<o.length;a++)o[a].setAttribute(t,n)}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initDataAttributes={attach:function(n){e("body",n).once("nds-data-attributes").each(function(){t()})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".parallax").length){var e=document.querySelectorAll(".parallax");M.Parallax.init(e)}}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initBlockHero={attach:function(n){e("body",n).once("nds-block-hero").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".component--modal").length)for(var e='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',t=document.getElementsByClassName("component--modal"),n=function(){var n=t[o].querySelectorAll(e)[0],a=t[o].querySelectorAll(e),i=a[a.length-1];document.addEventListener("keydown",function(e){("Tab"===e.key||9===e.keyCode)&&(e.shiftKey?document.activeElement===n&&(i.focus(),e.preventDefault()):document.activeElement===i&&(n.focus(),e.preventDefault()))}),n.focus()},o=0;o<t.length;o++)n()}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initComponentModal={attach:function(n){e("body",n).once("nds-component-modal").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".materialboxed").length){var e=document.querySelectorAll(".materialboxed");M.Materialbox.init(e)}}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initComponentMedia={attach:function(n){e("body",n).once("nds-component-media").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){document.querySelectorAll("#uswds-banner-toggle").length>0&&document.querySelector("#uswds-banner-toggle").addEventListener("click",function(e){"true"==document.getElementById("uswds-banner-toggle").getAttribute("aria-expanded")?(document.getElementById("uswds-banner-toggle").setAttribute("aria-expanded","false"),document.getElementById("uswds-banner-content").style.display="none"):(document.getElementById("uswds-banner-toggle").setAttribute("aria-expanded","true"),document.getElementById("uswds-banner-content").style.display="block")})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initComponentUSWDSBanner={attach:function(n){e("body",n).once("nds-component-uswds-banner").each(function(){t()})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e(".navigation--dropdown.hover").on("mouseover",function(){n(e(this))}),e(".navigation--dropdown.hover").on("mouseout",function(){o(e(this))}),e(".navigation--dropdown").on("focusin",function(t){n(e(this))}),e(".navigation--dropdown").on("focusout",function(t){this.contains(t.relatedTarget)||o(e(this))})}function n(e){e.addClass("is-open"),e.find(".navigation--dropdown__toggle").attr("aria-expanded","true")}function o(e){e.removeClass("is-open"),e.find(".navigation--dropdown__toggle").attr("aria-expanded","false")}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initNavigationDropdown={attach:function(n){e("body",n).once("nds-navigation-dropdown").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(document.querySelectorAll(".navigation--drawer").length>0){var e=windowWidth();document.querySelector("#global-mobile-menu").addEventListener("click",function(e){document.querySelector("#main-navigation-mobile").classList.add("drawer--open"),getNextSibling(document.querySelector("#main-navigation-mobile"),".navigation--drawer--overlay").style.display="block",document.querySelector(".navigation--drawer__top__button-close").focus();for(var t=document.querySelector("#main-navigation-mobile").querySelectorAll("button, a"),n=0;n<t.length;n++)t[n].setAttribute("tabindex","0")}),document.querySelector(".navigation--drawer--overlay").addEventListener("click",function(e){n()}),document.querySelector(".navigation--drawer__top__button-close").addEventListener("click",function(e){n()}),window.onresize=function(t){e!=windowWidth()&&(e=windowWidth(),n())},document.querySelector(".skip-to--top").addEventListener("focus",function(e){document.querySelector(".navigation--drawer__top__button-close").focus()}),document.querySelector(".skip-to--back").addEventListener("focus",function(e){var t=document.querySelector(".navigation--drawer__inner").querySelectorAll("button, a");hasClass(t[t.length-1],"ext-link-icon")?t[t.length-2].focus():t[t.length-1].focus()})}}function n(){document.querySelector("#global-mobile-menu").focus(),document.querySelector("#main-navigation-mobile").classList.remove("drawer--open"),getNextSibling(document.querySelector("#main-navigation-mobile"),".navigation--drawer--overlay").style.display="none";for(var e=document.querySelector("#main-navigation-mobile").querySelectorAll("button, a"),t=0;t<e.length;t++)e[t].setAttribute("tabindex","-1")}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initNavigationDrawer={attach:function(n){e("body",n).once("nds-navigation-drawer").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll(".navigation--tabs__tab"),t=0;t<e.length;t++)e[t].addEventListener("click",function(){var e=this.closest(".navigation--tabs").querySelectorAll(".navigation--tabs__tab");if(!hasClass(this,"active")){for(var t=0;t<e.length;t++)hasClass(e[t],"active")&&e[t].classList.remove("active");this.classList.add("active")}})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initNavigationTabs={attach:function(n){e("body",n).once("nds-navigation-tabs").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll(".input--radio, .input--checkbox"),t=0;t<e.length;t++)e[t].addEventListener("keydown",function(e){"Enter"!==e.code&&"13"!==e.keyCode&&"Space"!==e.code&&"23"!==e.keyCode||e.target.querySelector("input").click()})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initInputNDS={attach:function(n){e("body",n).once("nds-input").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e(".input--date-picker").each(function(){"true"==e(this).find("input").attr("nds-date-picker")&&e(this).find("input").datepicker()})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initInputDatePicker={attach:function(n){e("body",n).once("nds-input-date-picker").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e('[data-toggle="tooltip"]').tooltip(),e("select").each(function(){"true"==e(this).attr("nds-select")&&(e(this).select2({minimumResultsForSearch:10}),""!=e(this).val()&&e(this).siblings(".select2-container").addClass("no-clear selection-made"))}),e("select").change(function(t,n){"true"==e(this).attr("nds-select")&&(t.target.multiple?e(this).find("option:selected").length>0?e(this).siblings(".select2-container").addClass("selection-made-multi"):e(this).siblings(".select2-container").removeClass("selection-made-multi"):(e(this).siblings(".select2-container").addClass("selection-made"),e(this).siblings(".select2-container").find(".single-clear").length||"true"==e(this).attr("data-select-all-times")||e(this).siblings(".select2-container").append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>')))}),e("select").on("select2:open",function(t){e(".select2-container").find(".select2-search__field").attr("aria-label","Search for choices"),e(".select2-container").find(".select2-results__options").attr("aria-label","Available choices")}),e(".select2-selection--single").find(".select2-selection__rendered").attr("aria-label","Click to select option."),e(".select2-selection--multiple").attr("aria-label","Click to select option(s)."),e(document).on("click",".single-clear",function(t){t.stopPropagation();var n=e(this).parent().siblings("select");n.prop("selectedIndex",0);var o=n.attr("data-placeholder");e(this).parent().removeClass("selection-made"),e(this).siblings(".selection").find(".select2-selection__rendered").text(o),e(this).remove()})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initInputSelect={attach:function(n){e("body",n).once("nds-input-select").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll("a"),t=0;t<e.length;t++)if(""!=e[t].innerHTML){var n=e[t].getAttribute("href"),o=e[t].hostname;if(n&&o!==location.hostname&&((n=n.toLowerCase()).indexOf("http://")>-1||n.indexOf("https://")>-1)&&n.indexOf("localhost:3002")<=0){e[t].setAttribute("target","_blank");var a=document.createElement("a");a.setAttribute("href",n),a.setAttribute("class","ext-link-icon"),a.setAttribute("aria-label","External Link"),e[t].insertAdjacentElement("afterend",a)}}}function n(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;for(var e=document.querySelectorAll('a[href^="mailto:"]'),t=0;t<e.length;t++)e[t].classList.add("link--external--mail")}"undefined"!=typeof Drupal?function(e,o){o.behaviors.initLinks={attach:function(o){e("body",o).once("nds-links").each(function(){t(o),n(o)})}}}(jQuery,Drupal):e(document).ready(function(){t(),n()})}(jQuery),function(e){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;e("table").each(function(){if("true"==e(this).attr("nds-datatable")){var t={responsive:!0,paging:!1,info:!1,autoWidth:!1,searching:!1};if("true"!=e(this).attr("data-tablesort"))t.ordering=!1;else{var n=[];e(this).find("thead").find("th").each(function(t){"true"==e(this).attr("data-column-num")&&n.push({type:"natural",targets:t})}),t.columnDefs=n}e(this).dataTable(t)}})}"undefined"!=typeof Drupal?function(e,n){n.behaviors.initTableDefault={attach:function(n){e("body",n).once("nds-table-default").each(function(){t(n)})}}}(jQuery,Drupal):e(document).ready(function(){t()})}(jQuery);