function activateToast(toast) {
    let toastDuration = toast.getAttribute('data-duration') * 1000;
    if (!hasClass(toast, "show")) {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('exit');
            setTimeout(() => {
                destroyToast(toast);
            }, 1000);
        }, toastDuration);
    }
}

function destroyToast(toast) {
    toast.remove();
}