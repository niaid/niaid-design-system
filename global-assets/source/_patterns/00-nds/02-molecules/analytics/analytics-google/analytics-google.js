$(document).ready(function() {
    $(".layouts--body").find('a').each(function(e) {
        var linktext = $.trim($(this).text());
        if (linktext !== "") {
            linktext = linktext.replace(/\//g, '-');
            linktext = linktext.replace(/\s+/g, '-').toLowerCase();
            $(this).attr("data-content", "body-anchor-" + linktext);
        }
    });
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