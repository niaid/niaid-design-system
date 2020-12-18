$(document).ready(function() {

    for (var i = 0; i < document.getElementsByClassName("layouts--body").length; i++) {
        let bodyAnchorLinks = document.getElementsByClassName("layouts--body")[i].querySelectorAll('a');
        for (var j = 0; j < bodyAnchorLinks.length; j++) {
            var linkText = bodyAnchorLinks[j].textContent.trim();
            if (linkText !== "") {
                linkText = linkText.replace(/\//g, '-');
                linkText = linkText.replace(/\s+/g, '-').toLowerCase();
                bodyAnchorLinks[j].setAttribute('data-content', "body-anchor-" + linkText);
            }
        }
    }

    $('.navigation--primary').find('a').each(function(e) {
        var linktext = $.trim($(this).text());
        if (linktext !== "") {
            linktext = linktext.replace(/\//g, '-');
            linktext = linktext.replace(/\s+/g, '-').toLowerCase();
            $(this).attr("data-nav", "header-nav-" + linktext);
        }
    });
    $('.global--footer').find('a').each(function(e) {
        var linktext = $.trim($(this).text());
        if (linktext !== "") {
            linktext = linktext.replace(/\//g, '-');
            linktext = linktext.replace(/\s+/g, '-').toLowerCase();
            $(this).attr("data-nav", "footer-nav-" + linktext);
        }
    });
    $('.component--accordion__card').find('button').each(function(e) {
        var linktext = $.trim($(this).text());
        if (linktext !== "") {
            linktext = linktext.replace(/\//g, '-');
            linktext = linktext.replace(/\s+/g, '-').toLowerCase();
            $(this).attr("data-content", "accordion-" + linktext);
        }
    });
});