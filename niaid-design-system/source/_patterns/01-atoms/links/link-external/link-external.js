$(document).ready(function() {
    $('a:not(:has(img))').each(function() {
        var varText = $(this).text();
        if (varText) {
            // Get URL and verify it exists
            var url = $(this).attr('href');
            var hostName = this.hostname;
            if (url && hostName !== location.hostname) {
                url = url.toLowerCase();
                if (((url.indexOf('http://') > -1) || (url.indexOf('https://')) > -1) && (url.indexOf('localhost:3002') <= 0)) {
                    $(this).attr('target', '_blank');
                    $(this).after('<a title="Link is External" aria-label="Link is External" class="ext-link-icon" href="' + url + '"></a>');
                }
            }
        }
    });

    $('a[href^="mailto:"]').each(function() {
        $(this).addClass('link--external--mail');
    });
});