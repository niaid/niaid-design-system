// Part of NDS Lite

document.addEventListener("DOMContentLoaded", (e) => {
    initInputNDS();
});

// initInputNDS - Functionality to support keyboard accessibility on radio and checkbox inputs.
function initInputNDS(context = document) {
    let inputElements = document.querySelectorAll('.input--radio, .input--checkbox');
    for (let i = 0; i < inputElements.length; i++) {
        inputElements[i].addEventListener('keydown', function(e) {
            if (e.code === "Enter" || e.keyCode === "13" || e.code === "Space" || e.keyCode === "23") {
                e.target.querySelector('input').click();
            }
        });
    }
}