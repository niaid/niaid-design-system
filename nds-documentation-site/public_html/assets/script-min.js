"use strict";!function(n){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;n("select").each(function(){"true"==n(this).attr("nds-select")&&(n(this).select2({minimumResultsForSearch:10}),""!=n(this).val()&&n(this).siblings(".select2-container").addClass("no-clear selection-made"))}),n("select").change(function(t,e){"true"==n(this).attr("nds-select")&&(t.target.multiple?n(this).find("option:selected").length>0?n(this).siblings(".select2-container").addClass("selection-made-multi"):n(this).siblings(".select2-container").removeClass("selection-made-multi"):(n(this).siblings(".select2-container").addClass("selection-made"),n(this).siblings(".select2-container").find(".single-clear").length||"true"==n(this).attr("data-select-all-times")||n(this).siblings(".select2-container").append('<button aria-label="Remove Chip" class="single-clear" tabindex="0"></button>')))}),n("select").on("select2:open",function(t){n(".select2-container").find(".select2-search__field").attr("aria-label","Search for choices"),n(".select2-container").find(".select2-results__options").attr("aria-label","Available choices")}),n(document).on("click",".single-clear",function(t){t.stopPropagation();var e=n(this).parent().siblings("select");e.prop("selectedIndex",0);var i=e.attr("data-placeholder");n(this).parent().removeClass("selection-made"),n(this).siblings(".selection").find(".select2-selection__rendered").text(i),n(this).remove()})}"undefined"!=typeof Drupal?function(n,e){e.behaviors.initInputSelect={attach:function(e){n("body",e).once("nds-input-select").each(function(){t(e)})}}}(jQuery,Drupal):n(document).ready(function(){t()})}(jQuery),function(n){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;n(".input--date-picker").each(function(){"true"==n(this).find("input").attr("nds-date-picker")&&n(this).find("input").datepicker()})}"undefined"!=typeof Drupal?function(n,e){e.behaviors.initInputDatePicker={attach:function(e){n("body",e).once("nds-input-date-picker").each(function(){t(e)})}}}(jQuery,Drupal):n(document).ready(function(){t()})}(jQuery),function(n){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;n("a:not(:has(img))").each(function(){if(n(this).text()){var t=n(this).attr("href"),e=this.hostname;t&&e!==location.hostname&&((t=t.toLowerCase()).indexOf("http://")>-1||t.indexOf("https://")>-1)&&t.indexOf("localhost:3002")<=0&&(n(this).attr("target","_blank"),n(this).after('<a aria-label="Read More about External Link policy" class="ext-link-icon" href="#"></a>'))}})}"undefined"!=typeof Drupal?function(n,e){e.behaviors.initLinkExternal={attach:function(e){n("body",e).once("nds-link-external").each(function(){t(e)})}}}(jQuery,Drupal):n(document).ready(function(){t(),function(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,n('a[href^="mailto:"]').each(function(){n(this).addClass("link--external--mail")})}()})}(jQuery),function(n){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;n("table").each(function(){if("true"==n(this).attr("nds-datatable")){var t={responsive:!0,paging:!1,info:!1,autoWidth:!1,searching:!1};if("true"!=n(this).attr("data-tablesort"))t.ordering=!1;else{var e=[];n(this).find("thead").find("th").each(function(t){"true"==n(this).attr("data-column-num")&&e.push({type:"natural",targets:t})}),t.columnDefs=e}n(this).dataTable(t)}})}"undefined"!=typeof Drupal?function(n,e){e.behaviors.initTableDefault={attach:function(e){n("body",e).once("nds-table-default").each(function(){t(e)})}}}(jQuery,Drupal):n(document).ready(function(){t()})}(jQuery),function(n){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;n(".parallax").length&&n(".parallax").parallax()}"undefined"!=typeof Drupal?function(n,e){e.behaviors.initBlockHero={attach:function(e){n("body",e).once("nds-block-hero").each(function(){t(e)})}}}(jQuery,Drupal):n(document).ready(function(){t()})}(jQuery),function(n){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;n(".materialboxed").length&&n(".materialboxed").materialbox()}"undefined"!=typeof Drupal?function(n,e){e.behaviors.initComponentLightbox={attach:function(e){n("body",e).once("nds-component-lightbox").each(function(){t(e)})}}}(jQuery,Drupal):n(document).ready(function(){t()})}(jQuery),function(n){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;if(n(".component--modal").length){var t='button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',e=document.querySelector("#getStartedModal"),i=e.querySelectorAll(t)[0],a=e.querySelectorAll(t),o=a[a.length-1];document.addEventListener("keydown",function(n){("Tab"===n.key||9===n.keyCode)&&(n.shiftKey?document.activeElement===i&&(o.focus(),n.preventDefault()):document.activeElement===o&&(i.focus(),n.preventDefault()))}),i.focus()}}"undefined"!=typeof Drupal?function(n,e){e.behaviors.initComponentModal={attach:function(e){n("body",e).once("nds-component-modal").each(function(){t(e)})}}}(jQuery,Drupal):n(document).ready(function(){t()})}(jQuery),function(n){function t(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;var t=n(window).width();n("#global-mobile-menu").on("click",function(){n("#main-navigation-mobile").addClass("drawer--open"),n("#main-navigation-mobile").siblings(".navigation--drawer--overlay").show(),n(".navigation--drawer__top__button-close").focus(),n("#main-navigation-mobile").find("a, button").each(function(){n(this).attr("tabindex","0")})}),n(".navigation--drawer--overlay").on("click",function(){n(this).hide(),e()}),n(".navigation--drawer__top__button-close").on("click",function(){e()}),n(window).resize(function(){t!=n(this).width()&&(t=n(this).width(),e())}),n(".skip-to--top").on("focus",function(){n(".navigation--drawer__top__button-close").focus()}),n(".skip-to--back").on("focus",function(){var t=n(".navigation--drawer__inner").find("a:visible, button:visible");n(t[t.length-1]).focus()})}function e(){n("#global-mobile-menu").focus(),n("#main-navigation-mobile").removeClass("drawer--open"),n("#main-navigation-mobile").siblings(".navigation--drawer--overlay").hide(),n("#main-navigation-mobile").find("a, button").each(function(){n(this).attr("tabindex","-1")})}"undefined"!=typeof Drupal?function(n,e){e.behaviors.initNavigationDrawer={attach:function(e){n("body",e).once("nds-navigation-drawer").each(function(){t(e)})}}}(jQuery,Drupal):n(document).ready(function(){t()})}(jQuery),function(n){function t(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;n(".navigation--local").length&&n(".navigation--local__group__label",t).keypress(function(t){13==t.which&&n(this).click()})}"undefined"!=typeof Drupal?function(n,e){e.behaviors.initNavigationLocal={attach:function(e){n(".page",e).once("nds-local-navigation").each(function(){t(e)})}}}(jQuery,Drupal):n(document).ready(function(){t()})}(jQuery);