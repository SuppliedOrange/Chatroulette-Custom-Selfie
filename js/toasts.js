function successToast() {
    if ( document.querySelector('#upload-error').classList.contains('show')) hideCollapsable('#upload-error')
    showCollapsable('#upload-success')
    document.querySelector("#upload").classList.add("animate__animated", "animate__fadeOutUp", "animate__faster", "collapse", "hide");
}

function failureToast(msg) {
    document.querySelector("#upload-error-msg").innerText = msg || '';
    showCollapsable('#upload-error')
}

function showInitError () {
    showCollapsable('#init-error')
}

function showCollapsable(elementID) {
    const collapsable = bootstrap.Collapse.getOrCreateInstance( document.querySelector(elementID) );
    collapsable.show()
}

function hideCollapsable(elementID) {
    const collapsable = bootstrap.Collapse.getOrCreateInstance( document.querySelector(elementID) );
    collapsable.hide()
}