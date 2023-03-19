//start and info dialog
const infoDialog = document.getElementById('i-dialog');
const autoDialog = document.getElementById('a-dialog');

const start = () => {
    document.getElementById('s-dialog').close();
    document.getElementById('s-dialog').style.display = 'none';
    document.getElementById('i-dialog').showModal();
    document.getElementById('i-dialog-div').webkitRequestFullscreen();
};

let chosenForm = 0;

const infoChoseForm = (number) => {
    const clickedBtn = document.getElementById(`i-d-form-btn${number}`);
    clickedBtn.style.color = '#ffe0e0';
    clickedBtn.style.boxShadow = '#ffe0e0 0px 0px var(--box-shadow-size), inset #ffe0e0 0px 0px var(--box-shadow-size)';
    clickedBtn.style.animation= '0.2s ease-out 0s 1 normal forwards running bump';
    chosenForm = number;
    for(let i = 1; i < 4; ++i){
        if(i != number) {
            const otherBtn = document.getElementById(`i-d-form-btn${i}`);
            otherBtn.style.color = '#4c4c4c';
            otherBtn.style.boxShadow = '#4c4c4c 0px 0px var(--box-shadow-size), inset #4c4c4c 0px 0px var(--box-shadow-size)';
            const p = document.getElementById(`i-d-form-btn-p${i}`);
            if(p.innerText == '' && otherBtn.style.animation === '0.2s ease-out 0s 1 normal forwards running bump') {
                otherBtn.style.animation = '0.2s ease-out 0s 1 normal forwards running back';
            }
        }
    }
};
    
const keyboard = async (mode, number) => {
    const keyboardBtn = document.getElementById(`${mode}-keyboard-btn${number}`);
    keyboardBtn.classList.toggle('keyboard-btn-clicked');
    if(chosenForm != 0) {
        const p = document.getElementById(`${mode}-d-form-btn-p${chosenForm}`);
        if(p.innerText < 100000) {
            p.innerText += number;
        }
    }
    setTimeout( () => {
        keyboardBtn.classList.toggle('keyboard-btn-clicked');
    }, 100);
    
};
        

const backspace = (mode) => {
    const backspace = document.getElementById(`${mode}-delete-btn`);
    backspace.classList.toggle('keyboard-btn-clicked');
    if(chosenForm != 0) {
        const p = document.getElementById(`${mode}-d-form-btn-p${chosenForm}`);
            const text = Math.floor(p.innerText/10);
            if ( text == 0) {
                p.innerText = '';
            } else {
                p.innerText = text;
            } 
    }
    setTimeout( () => {
        backspace.classList.toggle('keyboard-btn-clicked');
    }, 100);
};

const keyboardNumBtns = document.querySelectorAll('.keyboard-num-btn');

keyboardNumBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        keyboard(btn.getAttribute('mode'), btn.getAttribute('keyboard'));
    });
});

const keyboardDelBtns = document.querySelectorAll('.keyboard-del-btn');

keyboardDelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        backspace(btn.getAttribute('mode'));
    });
});

const checkInfo = () => {
    if( document.getElementById('i-d-form-btn-p1').innerText == '' ) {
        document.getElementById('i-d-form-btn1').style.animation = 'rotate 2s linear infinite';
        return false;
    } else if( document.getElementById('i-d-form-btn-p2').innerText == '' || document.getElementById('i-d-form-btn-p2').innerText > '3' ) {
        document.getElementById('i-d-form-btn2').style.animation = 'rotate 2s linear infinite';
        return false;
    } else if( document.getElementById('i-d-form-btn-p3').innerText == '') {
        document.getElementById('i-d-form-btn3').style.animation = 'rotate 2s linear infinite';
        return false;
    } else {
        return true;
    }
};

const absenceDialog =  document.getElementById('absence-dialog');

const absence = () => {
    if(checkInfo()) {
        absenceDialog.showModal();
    }
};

const absenceCancel = () => {
    absenceDialog.close();
};

const absenceSubmit = async () => {
    const absenceSubmitBtn = document.getElementById('absence-submit-btn');
    const absenceCancelBtn = document.getElementById('absence-cancel-btn');
    absenceSubmitBtn.onclick = () => {};
    absenceCancelBtn.onclick = () => {};
    absenceSubmitBtn.innerText = '';
    absenceSubmitBtn.classList.toggle('absence-submit-btn-noAnimation');
    absenceCancelBtn.classList.toggle('absence-cancel-btn-hide');

    const teamNumber = Number(document.getElementById('i-d-form-btn-p1').innerText);
    const gameType = Number(document.getElementById('i-d-form-btn-p2').innerText);
    absenceSubmitBtn.classList.toggle('absence-submit-btn-clicked');
    // document.getElementById('submit-icon-div').classList.toggle('submit-icon-div-fly');
    try {
        await axios.post('/absenceSubmit', {
            teamNumber: teamNumber,
            gameType: gameType,
        });
        document.location.href = './';
    } catch(err) {
        console.log('Submit failed.');
        absenceSubmitBtn.innerText = '';
        absenceSubmitBtn.classList.toggle('absence-submit-btn-noAnimation');
        absenceSubmitBtn.innerText = 'Y';
        absenceCancelBtn.classList.toggle('absence-cancel-btn-hide');
        absenceSubmitBtn.classList.toggle('absence-submit-btn-clicked');
        absenceSubmitBtn.onclick = async () => {await absenceSubmit();};
        absenceCancelBtn.onclick = () => {absenceCancel();};
    }
};



const infoDone = () => {
    if(checkInfo()) {
        chosenForm = 0;
        infoDialog.close();
        autoDialog.showModal();
        if( ! document.fullscreenElement ) {
            createFullScreenBtn();
        }
    }
};



//auto and tele dialog
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
    if( mode === 'i') {
        document.getElementById('i-full-screen-div').classList.toggle('i-full-screen-div-changed');
        document.getElementById('i-done-btn-div').classList.toggle('i-done-btn-div-changed');
        document.getElementById('i-done-btn').classList.toggle('i-done-btn-changed');
        document.getElementById('i-absence-div').classList.toggle('i-absence-div-changed');
        document.getElementById('absence-btn').classList.toggle('absence-btn-changed');
    } else {
        if( mode === 'r2' ) {
            const doneBtn = document.querySelectorAll('.r2-done-btn');
            doneBtn.forEach(btn => {btn.style.width = '40%';});
        }
        document.getElementById(`${mode}-full-screen-div`).style.display = 'none';
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
        document.getElementById('i-full-screen-div').classList.toggle('i-full-screen-div-changed');
        document.getElementById('i-done-btn-div').classList.toggle('i-done-btn-div-changed');
        document.getElementById('i-done-btn').classList.toggle('i-done-btn-changed');
        document.getElementById('i-absence-div').classList.toggle('i-absence-div-changed');
        document.getElementById('absence-btn').classList.toggle('absence-btn-changed');
    } else if(document.getElementById('a-dialog').open === true) {
        document.getElementById('a-full-screen-div').style.display = 'flex';
    } else if(document.getElementById('t-dialog').open === true) {
        document.getElementById('t-full-screen-div').style.display = 'flex';
    } else if(document.getElementById('r1-dialog').open === true) {
        document.getElementById('r1-full-screen-div').style.display = 'flex';
    }else if(document.getElementById('r2-dialog').open === true) {
        document.getElementById('r2-full-screen-div').style.display = 'flex';
        const doneBtn = document.querySelectorAll('.r2-done-btn');
        doneBtn.forEach(btn => {btn.style.width = '60%';});
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

const backToAuto = () => {
    const autoDialog = document.getElementById('a-dialog');
    const teleDialog = document.getElementById('t-dialog');


    teleDialog.close();
    autoDialog.showModal();

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
        if(clickedBtn === gameCharacter) {
            document.getElementById(`r1-${gameCharacter}-btn`).style.boxShadow = '#4c4c4c 0px 0px var(--box-shadow-size), inset #4c4c4c 0px 0px var(--box-shadow-size)';
            document.getElementById(`r1-${gameCharacter}-btn`).style.color = '#4c4c4c';
            gameCharacter = '';
            console.log('case1:'+gameCharacter );
        } else {
            document.getElementById(`r1-${gameCharacter}-btn`).style.boxShadow = '#4c4c4c 0px 0px var(--box-shadow-size), inset #4c4c4c 0px 0px var(--box-shadow-size)';
            document.getElementById(`r1-${gameCharacter}-btn`).style.color = '#4c4c4c';
            gameCharacter = clickedBtn;
            document.getElementById(`r1-${clickedBtn}-btn`).style.boxShadow = '#ffe0e0 0px 0px var(--box-shadow-size), inset #ffe0e0 0px 0px var(--box-shadow-size)';
            document.getElementById(`r1-${clickedBtn}-btn`).style.color = '#ffe0e0';
            console.log('case2:'+gameCharacter );
        }
    } else {
        gameCharacter = clickedBtn;
        document.getElementById(`r1-${clickedBtn}-btn`).style.boxShadow = '#ffe0e0 0px 0px var(--box-shadow-size), inset #ffe0e0 0px 0px var(--box-shadow-size)';
        document.getElementById(`r1-${clickedBtn}-btn`).style.color = '#ffe0e0';
        console.log('case3:'+gameCharacter );
    }
};

const r1Done = () => {
    if(gameResult !== '') {
        const result1Dialog = document.getElementById('r1-dialog');
        const result2Dialog = document.getElementById('r2-dialog');

        result1Dialog.close();
        result2Dialog.showModal();
    }

    if( ! document.fullscreenElement ) {
        createFullScreenBtn();
    }
};

const backToR1 = () => {
    const r1Dialog = document.getElementById('r1-dialog');
    const r2Dialog = document.getElementById('r2-dialog');


    r2Dialog.close();
    r1Dialog.showModal();

    if( ! document.fullscreenElement ) {
        createFullScreenBtn();
    }
};

const r2ChoseForm = (number) => {
    const clickedBtn = document.getElementById(`r2-d-form-btn${number}`);
    clickedBtn.style.color = '#ffe0e0';
    clickedBtn.style.boxShadow = '#ffe0e0 0px 0px var(--box-shadow-size), inset #ffe0e0 0px 0px var(--box-shadow-size)';
    clickedBtn.style.animation= '0.2s ease-out 0s 1 normal forwards running bump';
    chosenForm = number;
    for(let i = 1; i < 5; ++i){
        if(i != number) {
            const otherBtn = document.getElementById(`r2-d-form-btn${i}`);
            otherBtn.style.color = '#4c4c4c';
            otherBtn.style.boxShadow = '#4c4c4c 0px 0px var(--box-shadow-size), inset #4c4c4c 0px 0px var(--box-shadow-size)';
            const p = document.getElementById(`r2-d-form-btn-p${i}`);
            if(p.innerText == '' && otherBtn.style.animation === '0.2s ease-out 0s 1 normal forwards running bump') {
                otherBtn.style.animation = '0.2s ease-out 0s 1 normal forwards running back';
            }
        }
    }
};

const r2Done = () => {
    if( document.getElementById('r2-d-form-btn-p1').innerText == '' ) {
        document.getElementById('r2-d-form-btn1').style.animation = 'rotate 2s linear infinite';
    } else if( document.getElementById('r2-d-form-btn-p2').innerText == '' ) {
        document.getElementById('r2-d-form-btn2').style.animation = 'rotate 2s linear infinite';
    } else if( document.getElementById('r2-d-form-btn-p3').innerText == '') {
        document.getElementById('r2-d-form-btn3').style.animation = 'rotate 2s linear infinite';
    } else if( document.getElementById('r2-d-form-btn-p4').innerText == '') {
        document.getElementById('r2-d-form-btn4').style.animation = 'rotate 2s linear infinite';
    }else {
        document.getElementById('r2-dialog').close();
        if(document.fullscreenElement) {
            document.webkitExitFullscreen();
        }
    }
};

const backToTele = () => {
    const teleDialog = document.getElementById('t-dialog');
    const r1Dialog = document.getElementById('r1-dialog');


    r1Dialog.close();
    teleDialog.showModal();

    if( ! document.fullscreenElement ) {
        createFullScreenBtn();
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
    let dockA = Number(document.getElementById('a-charge-btn').value);
    const mobilityA = Number(document.getElementById('a-community-btn').value);
    const engageA = Number(document.getElementById('a-balance-btn').value);
    if(dockA === 1) {
        if(engageA === 1) {
            if(mobilityA === 1) {
                moveA = 5;
            } else {
                moveA = 3;
            }
        } else {
            if(mobilityA === 1) {
                moveA = 4;
            } else {
                moveA = 1;
            }
        }
    } else if( mobilityA === 1) {
        if(engageA === 1) {
            moveA = 5;
            dockA = 1;
        } else {
            moveA = 2;
        }
    } else if (engageA === 1) {
        moveA = 3;
        dockA = 1;
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
    let dockT = Number(document.getElementById('t-charge-btn').value);
    const parkT = Number(document.getElementById('t-park-btn').value);
    const engageT = Number(document.getElementById('t-balance-btn').value);

    if(dockT === 1) {
        if(engageT === 1) {
            moveT = 3;
        } else {
            moveT = 1;
        }
    } else if(engageT === 1) {
        moveT = 3;
        dockT = 1;
    } else if(parkT === 1) {
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
    const penalty = Number(document.getElementById('r2-d-form-btn-p2').innerText); 
    
    let rp = 0;
    if(gameType === 2) {
        rp = Number(document.getElementById('r2-d-form-btn-p3').innerText);
    }

    const alliance = Number(document.getElementById('r2-d-form-btn-p4').innerText); 

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
    document.getElementById('submit-icon-div').classList.toggle('submit-icon-div-fly');

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
            penalty: penalty,
            rp: rp,
            alliance: alliance,
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
            penalty: penalty,
            rp: rp,
        });
        document.location.href = './';
    } catch(err) {
        console.log('Submit failed.');
        submitBtn.classList.toggle('submit-btn-noAnimation');
        submitBtn.classList.toggle('submit-btn-clicked');
        document.getElementById('submit-icon-div').classList.toggle('submit-icon-div-fly');
        submitBtn.onclick = async () => {await submit();};
    }
};



document.getElementById('i-dialog').addEventListener('cancel', (event) => {
    event.preventDefault();
});

document.getElementById('absence-dialog').addEventListener('cancel', (event) => {
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

console.log(document.getElementById('i-keyboard-btn1').getAttribute('keyvalue'));