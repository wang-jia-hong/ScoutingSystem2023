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

const showFilter = async () => {
    const filter = document.getElementById('filter-div');
    filter.classList.toggle('filter-div-show');
};

const footer = document.getElementById('footer');

footer.addEventListener('mouseover', () => showToolbar());
footer.addEventListener('mouseout', () => hideToolbar());
footer.addEventListener('touchstart', () => showToolbarByTouch());

let chosenFilterMode = 'auto';
document.getElementById('filter-auto-li').classList.toggle('filter-mode-li-clicked');
document.getElementById('filter-auto-btn-div').classList.toggle('filter-btn-div-chosen');

const filterModeLiClicked = (mode) => {
    document.getElementById(`filter-${chosenFilterMode}-li`).classList.toggle('filter-mode-li-clicked');
    document.getElementById(`filter-${chosenFilterMode}-btn-div`).classList.toggle('filter-btn-div-chosen');
    document.getElementById(`filter-${mode}-li`).classList.toggle('filter-mode-li-clicked');
    document.getElementById(`filter-${mode}-btn-div`).classList.toggle('filter-btn-div-chosen');
    chosenFilterMode = mode;
};

const filterModeLis = document.querySelectorAll('.filter-mode-li');

filterModeLis.forEach(li => {
    li.addEventListener('click', () => filterModeLiClicked(li.getAttribute('mode')));
});

let clickedFilterBtn = 'none';
let chosenFilterList = {};

const filterBtnClicked = (btn) => {
    btn.classList.toggle('filter-btn-clicked');
    btn.classList.add('filter-btn-chosen');

    const filterName = btn.getAttribute('filterName');
    if(clickedFilterBtn != 'none') {
        if(clickedFilterBtn === filterName) {
            btn.classList.remove('filter-btn-chosen');
            document.getElementById(clickedFilterBtn + 'MinTag').innerText = '_';
            document.getElementById(clickedFilterBtn + 'MaxTag').innerText = '_';
            delete chosenFilterList[filterName];
            clickedFilterBtn = 'none';
            console.log(chosenFilterList);
        } else {
            document.getElementById(clickedFilterBtn + 'FilterBtn').classList.toggle('filter-btn-clicked');
            clickedFilterBtn = filterName;
            chosenFilterList[filterName] = [];
            sliderInputted();
            console.log(chosenFilterList);
        }
    } else {
        clickedFilterBtn = filterName;
        chosenFilterList[filterName] = [];
        sliderInputted();
        console.log(chosenFilterList);
    }
};

const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtnClicked(btn);
    });
});

const sliderInputted = () => {
    console.log('hi there');
    const slider1 = document.getElementById('slider1');
    const slider2 = document.getElementById('slider2');
    const sliderTrack = document.getElementById('slider-track');
    const sliderMax = document.getElementById('slider1').max;
    const percent1 = (slider1.value / sliderMax) * 100;
    const percent2 = (slider2.value / sliderMax) * 100;

    if(percent1 <= percent2) {
        if(clickedFilterBtn != 'none') {
            chosenFilterList[clickedFilterBtn][0] = Number(slider1.value);
            chosenFilterList[clickedFilterBtn][1] = Number(slider2.value);
            document.getElementById(clickedFilterBtn + 'MinTag').innerText = slider1.value;
            document.getElementById(clickedFilterBtn + 'MaxTag').innerText = slider2.value;
        }
        document.getElementById('slider-min-tag').innerText = slider1.value;
        document.getElementById('slider-max-tag').innerText = slider2.value;
        sliderTrack.style.background = `linear-gradient(to right, #a0a0a0 ${percent1}% , #ffffff ${percent1}% , #ffffff ${percent2}%, #a0a0a0 ${percent2}%)`;
    } else {
        if(clickedFilterBtn != 'none') {
            chosenFilterList[clickedFilterBtn][0] = Number(slider2.value);
            chosenFilterList[clickedFilterBtn][1] = Number(slider1.value);
            document.getElementById(clickedFilterBtn + 'MinTag').innerText = slider2.value;
            document.getElementById(clickedFilterBtn + 'MaxTag').innerText = slider1.value;
        }
        document.getElementById('slider-min-tag').innerText = slider2.value;
        document.getElementById('slider-max-tag').innerText = slider1.value;
        sliderTrack.style.background = `linear-gradient(to right, #a0a0a0 ${percent2}% , #ffffff ${percent2}% , #ffffff ${percent1}%, #a0a0a0 ${percent1}%)`;
    }
};

const filterSliders = document.querySelectorAll('.filter-range');

filterSliders.forEach(slider => {
    slider.addEventListener('input', () => sliderInputted());
});

const filterSubmit = () => {
    let href = '?';
    const conditions =  Object.keys(chosenFilterList);
    conditions.forEach( condition => {
        if(chosenFilterList[condition][0] !== 0 ) {
            href += condition + 'Min=' + chosenFilterList[condition][0] + '&';
        }

        if(chosenFilterList[condition][1] !== 100 ) {
            href += condition + 'Max=' + chosenFilterList[condition][1] + '&';
        }
    });

    href = href.slice(0, -1);

    console.log(href);

    const gameType = document.getElementById('filter-submit-btn').getAttribute('gameType');
    
    window.location.href = '/result/' + gameType + href;
};

document.getElementById('filter-submit-btn').addEventListener('click', () => filterSubmit());
