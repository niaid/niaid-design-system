// Part of NDS Lite

document.addEventListener("DOMContentLoaded", (e) => {
    initNavigationDrawer();
});

// initNavigationDrawer - Functionality to support the NDS mobile drawer.
function initNavigationDrawer(context = document) {
    var wWidth = windowWidth();

    document.querySelector('#global-mobile-menu').addEventListener("click", function(e) {
        document.querySelector('#main-navigation-mobile').classList.add("drawer--open");
        let overlay = getNextSibling(document.querySelector('#main-navigation-mobile'), '.navigation--drawer--overlay');
        overlay.style.display = 'block';
        document.querySelector('.navigation--drawer__top__button-close').focus();
        let tabElements = document.querySelector('#main-navigation-mobile').querySelectorAll('button, a');
        for (var i = 0; i < tabElements.length; i++) {
            tabElements[i].setAttribute('tabindex', '0');
        }
    });

    document.querySelector('.navigation--drawer--overlay').addEventListener("click", function(e) {
        closeMenu();
    });

    document.querySelector('.navigation--drawer__top__button-close').addEventListener("click", function(e) {
        closeMenu();
    });

    window.onresize = function(e) {
        if (wWidth != windowWidth()) {
            wWidth = windowWidth();
            closeMenu();
        }
    };

    // 508 Compliance Focus Helpers
    document.querySelector('.skip-to--top').addEventListener("focus", function(e) {
        document.querySelector('.navigation--drawer__top__button-close').focus();
    });
    document.querySelector('.skip-to--back').addEventListener("focus", function(e) {
        let tabElements = document.querySelector('.navigation--drawer__inner').querySelectorAll('button, a');
        tabElements[tabElements.length - 1].focus();
    });
}

// closeMenu - Helper function to close the mobile drawer.
function closeMenu() {
    document.querySelector('#global-mobile-menu').focus();
    document.querySelector('#main-navigation-mobile').classList.remove("drawer--open");
    let overlay = getNextSibling(document.querySelector('#main-navigation-mobile'), '.navigation--drawer--overlay');
    overlay.style.display = 'none';
    let tabElements = document.querySelector('#main-navigation-mobile').querySelectorAll('button, a');
    for (var i = 0; i < tabElements.length; i++) {
        tabElements[i].setAttribute('tabindex', '-1');
    }
}