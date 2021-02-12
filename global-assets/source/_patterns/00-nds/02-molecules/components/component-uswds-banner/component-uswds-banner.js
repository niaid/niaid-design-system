// Part of NDS Lite

document.addEventListener("DOMContentLoaded", (e) => {
    initComponentUSWDSBanner();
});


// initComponentUSWDSBanner - Toggles the USWDS Banner Component open and closed.
function initComponentUSWDSBanner() {
    if (document.querySelectorAll('#uswds-banner-toggle').length > 0) {
        document.querySelector('#uswds-banner-toggle').addEventListener("click", function(e) {
            if (document.getElementById("uswds-banner-toggle").getAttribute('aria-expanded') == 'true') {
                document.getElementById("uswds-banner-toggle").setAttribute('aria-expanded','false');
                document.getElementById("uswds-banner-content").style.display = 'none';
            }
            else {
                document.getElementById("uswds-banner-toggle").setAttribute('aria-expanded','true');
                document.getElementById("uswds-banner-content").style.display = 'block';
            }
        });
    }
}