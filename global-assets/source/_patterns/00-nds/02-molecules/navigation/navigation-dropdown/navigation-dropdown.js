$(document).ready(function() {
    $(".navigation--dropdown.hover").on('mouseover', function() {
        openDropdown($(this));
    });
    $(".navigation--dropdown.hover").on('mouseout', function() {
        closeDropdown($(this));
    });

    $(".navigation--dropdown").on('focusin', function(e) {
        openDropdown($(this));
    });
    $(".navigation--dropdown").on('blur', function(e) {
        console.log("We out");
    });

    function openDropdown($el) {
        $el.addClass('is-open');
        $el.find('.navigation--dropdown__toggle').attr('aria-expanded', 'true');
    }

    function closeDropdown($el) {
        $el.removeClass('is-open');
        $el.find('.navigation--dropdown__toggle').attr('aria-expanded', 'false');
    }
});

