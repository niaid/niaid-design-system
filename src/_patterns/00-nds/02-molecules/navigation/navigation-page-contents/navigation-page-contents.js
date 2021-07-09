$(document).ready(function() {
    let headings = $('.layouts--body').children('h2');
    let $tocList = $('.navigation--page-contents__list');
    for (let i = 0; i < headings.length; i++) {
        let headingID = 'scrollspy-section-' + $(headings[i]).text();
        headingID = headingID.replace(/\//g, '-');
        headingID = headingID.replace(/\s+/g, '-').replace('&', 'and').toLowerCase();
        $tocList.append('<li class="navigation--page-contents__list__item"><a href="#' + headingID + '">' + $(headings[i]).text() + '</a></li>');
        $(headings[i]).nextUntil("h2").addBack().wrapAll('<div id="' + headingID + '" class="component-nds component--scrollspy-section scrollspy section">');
    }
    $('.scrollspy').scrollSpy();
});