const createCargoBtn = (id, mode, row) => {
	const div = document.getElementById(`${mode}-cargo-row${row}-div`);
	const btn = document.createElement('button');

	btn.type = 'button';
	btn.id = `${mode}Cargo${id}`;
    btn.classList.add('cargo-btn');

    
    if( id < 30 && ( id % 10 === 2 || id % 10 === 5 || id % 10 === 8 ) ) {
       btn.classList.add('cargo-cube-btn');
    }

	btn.innerText = `${id}\n`;
    btn.value = '0';

    btn.addEventListener('click', () => {
		cBtnClicked(`${mode}Cargo${id}`);
	});

    div.appendChild(btn);
    // btn.appendChild(borderDiv);
};

const cBtnClicked = (id) => {
    const btn = document.getElementById(id);

    if(btn.value === '1') {
        btn.value = '0';
        btn.style.color = '#4c4c4c';
        btn.style.boxShadow = '#4c4c4c 0px 0px var(--box-shadow-size), inset #4c4c4c 0px 0px var(--box-shadow-size)';
    } else if (btn.value === '0'){
        btn.value = '1';
        btn.style.color = '#ffe0e0';
        btn.style.boxShadow = '#ffe0e0 0px 0px var(--box-shadow-size), inset #ffe0e0 0px 0px var(--box-shadow-size)';
    }
    console.log(btn.value);
};

const mBtnClicked = (id) => {
    const btn = document.getElementById(id);

    if(btn.value == 1) {
        btn.value = 0;
        btn.style.color = '#4c4c4c';
        btn.style.boxShadow = '#4c4c4c 0px 0px var(--box-shadow-size), inset #4c4c4c 0px 0px var(--box-shadow-size)';
    } else if (btn.value == 0){
        btn.value = 1;
        btn.style.color = '#ffe0e0';
        btn.style.boxShadow = '#ffe0e0 0px 0px var(--box-shadow-size), inset #ffe0e0 0px 0px var(--box-shadow-size)';
    }
    console.log(btn.value);
};




const enterFullScreen = (mode) => {
    document.getElementById(`${mode}-dialog-div`).webkitRequestFullscreen();
    document.getElementById(`${mode}-full-screen-div`).style.display = 'none';
    if( mode === 'i' || mode === 'r2' ) {
        document.getElementById(`${mode}-done-btn`).style.width = '25%';
        document.getElementById(`${mode}-full-screen-btn`).style.width = '25%';
    }
};

document.onwebkitfullscreenchange = () => {
    if (document.fullscreenElement) {
        console.log('entered fullscreen mode.');
    } else {
        console.log('existed fullscreen mode.');
        createFullScreenBtn();
    }
};


const createFullScreenBtn = () => {
    if(document.getElementById('i-dialog').open === true) {
        document.getElementById('i-full-screen-div').style.display = 'flex';
        document.getElementById('i-done-btn').style.width = '50%';
        document.getElementById('i-full-screen-btn').style.width = '50%';
    } else if(document.getElementById('a-dialog').open === true) {
        document.getElementById('a-full-screen-div').style.display = 'block';
    } else if(document.getElementById('t-dialog').open === true) {
        document.getElementById('t-full-screen-div').style.display = 'block';
    } else if(document.getElementById('r1-dialog').open === true) {
        document.getElementById('r1-full-screen-div').style.display = 'flex';
    }else if(document.getElementById('r2-dialog').open === true) {
        document.getElementById('r2-full-screen-div').style.display = 'flex';
        document.getElementById('r2-done-btn').style.width = '50%';
        document.getElementById('r2-full-screen-btn').style.width = '50%';
    }else {
        return;
    }
};


let cargo = new Array(3);

cargo[0] = new Array(9);
cargo[1] = new Array(9);
cargo[2] = new Array(9);

for(var row = 0; row < 3; ++row) {
	for(var col = 0; col < 9; ++col) {
		cargo[row][col] = ((row + 1) * 10) + (col + 1);
		createCargoBtn(cargo[row][col], 'a', row+1);
        createCargoBtn(cargo[row][col], 't', row+1);
	}
}



const autoDone = () => {
    const autoDialog = document.getElementById('a-dialog');
    const teleDialog = document.getElementById('t-dialog');


    autoDialog.close();
    teleDialog.showModal();

    if( ! document.fullscreenElement ) {
        createFullScreenBtn();
    }
};

const teleDone = () => {
    const teleDialog = document.getElementById('t-dialog');
    const result1Dialog = document.getElementById('r1-dialog');

    teleDialog.close();
    result1Dialog.showModal();

    if( ! document.fullscreenElement ) {
        createFullScreenBtn();
    }
};

let gameResult = '';

const gameResultBtnClicked = (clickedBtn) => {
    if( gameResult !== '') {
        document.getElementById(`r1-${gameResult}-btn`).style.boxShadow = '#4c4c4c 0px 0px var(--box-shadow-size), inset #4c4c4c 0px 0px var(--box-shadow-size)';
        document.getElementById(`r1-${gameResult}-btn`).style.color = '#4c4c4c';
    }
    
    gameResult = clickedBtn;
    document.getElementById(`r1-${clickedBtn}-btn`).style.boxShadow = '#ffe0e0 0px 0px var(--box-shadow-size), inset #ffe0e0 0px 0px var(--box-shadow-size)';
    document.getElementById(`r1-${clickedBtn}-btn`).style.color = '#ffe0e0';
};

let gameCharacter = '';

const characterBtnClicked = (clickedBtn) => {
    if( gameCharacter !== '') {
        document.getElementById(`r1-${gameCharacter}-btn`).style.boxShadow = '#4c4c4c 0px 0px var(--box-shadow-size), inset #4c4c4c 0px 0px var(--box-shadow-size)';
        document.getElementById(`r1-${gameCharacter}-btn`).style.color = '#4c4c4c';
    }
    
    gameCharacter = clickedBtn;
    document.getElementById(`r1-${clickedBtn}-btn`).style.boxShadow = '#ffe0e0 0px 0px var(--box-shadow-size), inset #ffe0e0 0px 0px var(--box-shadow-size)';
    document.getElementById(`r1-${clickedBtn}-btn`).style.color = '#ffe0e0';
};

const r1Done = () => {
    if(gameResult !== '' && gameCharacter !== '') {
        const result1Dialog = document.getElementById('r1-dialog');
        const result2Dialog = document.getElementById('r2-dialog');

        result1Dialog.close();
        result2Dialog.showModal();
    }
};

const r2Done = () => {
    if( document.getElementById('r2-d-form-btn-p1').innerText == '' ) {
        document.getElementById('r2-d-form-btn1').style.animation = 'rotate 2s linear infinite';
    } else if( document.getElementById('r2-d-form-btn-p2').innerText == '' ) {
        document.getElementById('r2-d-form-btn2').style.animation = 'rotate 2s linear infinite';
    } else if( document.getElementById('r2-d-form-btn-p3').innerText == '') {
        document.getElementById('r2-d-form-btn3').style.animation = 'rotate 2s linear infinite';
    } else {
        document.getElementById('r2-dialog').close();
        if(document.fullscreenElement) {
            document.webkitExitFullscreen();
        }
    }
};

const submit = async () => {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.onclick = () => {};
    submitBtn.classList.toggle('submit-btn-noAnimation');

    const teamNumber = Number(document.getElementById('i-d-form-btn-p1').innerText);
    const gameType = Number(document.getElementById('i-d-form-btn-p2').innerText);
    const gameNumber = Number(document.getElementById('i-d-form-btn-p3').innerText);

    let moveA = 0;
    const dockA = Number(document.getElementById('a-charge-btn').value);
    const mobilityA = Number(document.getElementById('a-community-btn').value);
    const engageA = Number(document.getElementById('a-balance-btn').value);
    if(dockA === 1) {
        if(engageA === 1) {
            moveA = 3;
        } else {
            moveA = 1;
        }
    } else if( mobilityA === 1) {
        moveA = 2;
    }

    let cargoA = [];
    for(let row = 1; row < 4; ++row) {
        for (let col = 1; col < 10; ++col) {
            const btn = document.getElementById(`aCargo${row}${col}`);
            if(btn.value === '1') {
                cargoA.push(row*10+col);
            }
        }
    }

    let moveT = 0;
    const dockT = Number(document.getElementById('t-charge-btn').value);
    const parkT = Number(document.getElementById('t-park-btn').value);
    const engageT = Number(document.getElementById('t-balance-btn').value);

    if(dockT === 1) {
        if(engageT === 1) {
            moveT = 3;
        } else {
            moveT = 1;
        }
    } else if( parkT === 1) {
        moveT = 2;
    }

    let cargoT = [];
    for(let row = 1; row < 4; ++row) {
        for (let col = 1; col < 10; ++col) {
            const btn = document.getElementById(`tCargo${row}${col}`);
            if(btn.value === '1') {
                cargoT.push(row*10+col);
            }
        }
    }
    
    let result = 0;

    if( gameResult === 'win' ) {
        result = 1;
    } else if( gameResult === 'lose' ) {
        result = 2;
    } else if( gameResult === 'tie' ) {
        result = 3;
    }

    const link = Number(document.getElementById('r2-d-form-btn-p1').innerText);
    const foul = Number(document.getElementById('r2-d-form-btn-p2').innerText); 
    
    let rp = 0;
    if(gameType === 1) {
        rp = Number(document.getElementById('r2-d-form-btn-p3').innerText);
    }

    let character = 0;
    if ( gameCharacter === 'offensive' ) {
        character = 1;
    } else if( gameCharacter === 'defensive' ) {
        character = 2;
    } else if( gameCharacter === 'mix' ) {
        character = 3;
    }

    const comment = document.getElementById('comment-textarea').value;

    //analyze data
    let topA = 0;
    let middleA = 0;
    let bottomA = 0;
    
    cargoA.forEach( number => {
        if(number < 20) {
            topA += 1;
        } else if(number < 30) {
            middleA += 1;
        } else {
            bottomA += 1;
        }
    });

    let topT = 0;
    let middleT = 0;
    let bottomT = 0;
    
    cargoT.forEach( number => {
        if(number < 20) {
            topT += 1;
        } else if(number < 30) {
            middleT += 1;
        } else {
            bottomT += 1;
        }
    });


    submitBtn.classList.toggle('submit-btn-clicked');
    document.getElementById('submit-icon').classList.toggle('submit-icon-fly');

    try {
        await axios.post('/recordSubmit', {
            teamNumber: teamNumber,
            gameType: gameType,
            gameNumber: gameNumber,
            moveA: moveA,
            cargoA: cargoA,
            moveT: moveT,
            cargoT: cargoT,
            result: result,
            character: character,
            link: link,
            foul: foul,
            rp: rp,
            comment: comment,
        }); 
        await axios.post('/analyzeSubmit', {
            teamNumber: teamNumber,
            gameType: gameType,
            topA: topA,
            middleA: middleA,
            bottomA: bottomA,
            dockA: dockA,
            engageA: engageA,
            mobilityA: mobilityA,
            topT: topT,
            middleT: middleT,
            bottomT: bottomT,
            dockT: dockT,
            engageT: engageT,
            parkT: parkT,
            result: result,
            character: character,
            link: link,
            foul: foul,
            rp: rp,
        });
        document.location.href = './';
    } catch(err) {
        submitBtn.classList.toggle('submit-btn-noAnimation');
        console.log('Submit failed.');
        submitBtn.onclick = () => {submit();};
        submitBtn.classList.toggle('submit-btn-clicked');
        document.getElementById('submit-icon').classList.toggle('submit-icon-fly');
    }
};



document.getElementById('i-dialog').addEventListener('cancel', (event) => {
    event.preventDefault();
});

document.getElementById('a-dialog').addEventListener('cancel', (event) => {
    event.preventDefault();
});

document.getElementById('t-dialog').addEventListener('cancel', (event) => {
    event.preventDefault();
});

document.getElementById('r1-dialog').addEventListener('cancel', (event) => {
    event.preventDefault();
});

document.getElementById('r2-dialog').addEventListener('cancel', (event) => {
    event.preventDefault();
});