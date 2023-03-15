const showToolbar = (byHover) => {
    if( ( !byHover && navigator.maxTouchPoints > 0) || ( byHover && navigator.maxTouchPoints <= 0)) {
        document.getElementById('toolbar-div').classList.toggle('toolbar-div-show');
        document.getElementById('f-logo-div').classList.toggle('f-logo-div-noShadow');
    }
};