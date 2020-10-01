(function($) {
    function initNavigationDrawer(context = document) {
        var wWidth = $(window).width();
        $("#global-mobile-menu").on('click', function() {
            $('#main-navigation-mobile').addClass('drawer--open');
            $('#main-navigation-mobile').siblings('.navigation--drawer--overlay').show();
            $('.navigation--drawer__top__button-close').focus();
            $('#main-navigation-mobile').find('a, button').each(function() {
                $(this).attr('tabindex', '0');
            });
        });

        $('.navigation--drawer--overlay').on('click', function() {
            $(this).hide();
            closeMenu();
        });
        $('.navigation--drawer__top__button-close').on('click', function() {
            closeMenu();
        });

        $(window).resize(function() {
            if (wWidth != $(this).width()) {
                wWidth = $(this).width();
                closeMenu();
            }
        });

        // 508 Compliance Focus Helpers
        $('.skip-to--top').on('focus', function() {
            $('.navigation--drawer__top__button-close').focus();
        });
        $('.skip-to--back').on('focus', function() {
            var focusable = $(".navigation--drawer__inner").find("a:visible, button:visible");
            $(focusable[focusable.length - 1]).focus();
        });
    }

    function closeMenu() {
        $("#global-mobile-menu").focus();
        $('#main-navigation-mobile').removeClass('drawer--open');
        $('#main-navigation-mobile').siblings('.navigation--drawer--overlay').hide();
        $('#main-navigation-mobile').find('a, button').each(function() {
            $(this).attr('tabindex', '-1');
        });
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initNavigationDrawer = {
                attach: function(context) {
                    $('body', context).once('nds-navigation-drawer').each(function() {
                        initNavigationDrawer(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initNavigationDrawer();
        });
    }
})(jQuery);