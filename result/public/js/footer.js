let toolbarHovered = true;
let toolbarHoveredChangedToFalseByTouch = false;
let toolbarTouched = false;

const showToolbar = () => {
    if(!toolbarHoveredChangedToFalseByTouch) {
        toolbarHovered = true;
    }
    document.getElementById('toolbar-div').classList.toggle('toolbar-div-show');
    document.getElementById('f-logo-div').classList.toggle('f-logo-div-noShadow');
};

const hideToolbar= () => {
    if(!toolbarTouched) {
        toolbarHovered = true;
        toolbarHoveredChangedToFalseByTouch = false;
        document.getElementById('toolbar-div').classList.toggle('toolbar-div-show');
        document.getElementById('f-logo-div').classList.toggle('f-logo-div-noShadow');
    }
};

const showToolbarByTouch = async () => {
    if(toolbarHovered) {
        toolbarHovered = false;
        toolbarHoveredChangedToFalseByTouch = true;
    } else {
        toolbarTouched = !toolbarTouched;
        document.getElementById('toolbar-div').classList.toggle('toolbar-div-show');
        document.getElementById('f-logo-div').classList.toggle('f-logo-div-noShadow');
    }
};

const showFilter = () => {
    document.getElementById('filter-div').classList.toggle('filter-div-show');
};

const footer = document.getElementById('footer');

footer.addEventListener('mouseover', () => showToolbar());
footer.addEventListener('mouseout', () => hideToolbar());
footer.addEventListener('touchstart', () => showToolbarByTouch());