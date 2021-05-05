(function($) {
    function initComponentToast(context = document) {
        if (document.querySelectorAll('.component--toast').length) {
            let toastsList = document.getElementsByClassName("component--toast");
            for (let i = 0; i < toastsList.length; i++) {
                activateToast(toastsList[i]);
            }
        }
    }

    function activateToast(toast) {
        let toastDuration = toast.getAttribute('data-duration') * 1000;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('exit');
            setTimeout(() => {
                destroyToast(toast);
            }, 1000);
        }, toastDuration);
    }

    function destroyToast(toast) {
        toast.remove();
    }

    if (typeof Drupal !== 'undefined') {
        // Define Drupal behavior.
        (function($, Drupal) {
            Drupal.behaviors.initComponentToast = {
                attach: function(context) {
                    $("body", context).once('nds-component-toast').each(function() {
                        initComponentToast(context);
                    });
                },
            };
        })(jQuery, Drupal);
    } else {
        // If Drupal isn't loaded, add JS for Pattern Lab.
        $(document).ready(function() {
            initComponentToast();
        });
    }
})(jQuery);