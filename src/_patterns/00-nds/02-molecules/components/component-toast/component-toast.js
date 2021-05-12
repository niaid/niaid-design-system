var moduleNDS_toast = (function() {
    'use strict';

    const exitTime = 1000;
    
    /* =================== PRIVATE METHODS ================= */
    
    // destroyToast - Removes a burnt toast from the DOM.
    function destroyToast(toast) {
        toast.remove();
    }

    /* =================== PUBLIC METHODS ================== */
    // activateToast - Adds a toast to the DOM. Pass a toast element to activate.
    function activateToast(toast) {
        let toastDuration = toast.getAttribute('data-duration') * exitTime;
        if (!hasClass(toast, "show")) {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                toast.classList.add('exit');
                setTimeout(() => {
                    destroyToast(toast);
                }, exitTime);
            }, toastDuration);
        }
    }

    /* =============== EXPORT PUBLIC METHODS =============== */
    return {
        activateToast: activateToast
    };
}());