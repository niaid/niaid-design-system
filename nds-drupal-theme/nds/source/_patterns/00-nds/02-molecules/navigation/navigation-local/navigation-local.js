// Part of NDS Lite

document.addEventListener("DOMContentLoaded", (e) => {
    initNavigationLocal();
});

// initNavigationLocal - Functionality to support the local navigation pattern, specifically adding keyboard accessibility.
function initNavigationLocal(context = document) {
    if (document.querySelectorAll('.navigation--local').length) {
        var localNavigationItems = document.getElementsByClassName('navigation--local__group__label');
        for (var i = 0; i < localNavigationItems.length; i++) {
            localNavigationItems[i].addEventListener("keydown", function(event) {
                if (event.isComposing || event.keyCode === 13) {
                    this.click();
                }
            });
        }
    }
}