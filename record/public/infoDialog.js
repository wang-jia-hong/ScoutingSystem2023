const infoDialog = document.getElementById('i-dialog');
const autoDialog = document.getElementById('a-dialog');

const start = () => {
    document.getElementById('s-dialog').close();
    document.getElementById('s-dialog').style.display = 'none';
    document.getElementById('i-dialog').showModal();
    document.getElementById('i-dialog-div').webkitRequestFullscreen();
};

let chosenForm = 0;

        const choseForm = (mode, number) => {
            const clickedBtn = document.getElementById(`${mode}-d-form-btn${number}`);

            clickedBtn.style.color = '#ffe0e0';
            clickedBtn.style.boxShadow = '#ffe0e0 0px 0px var(--box-shadow-size), inset #ffe0e0 0px 0px var(--box-shadow-size)';

            clickedBtn.style.animation= '0.2s ease-out 0s 1 normal forwards running bump';

            chosenForm = number;

            for(let i = 1; i < 4; ++i){
                if(i != number) {
                    const otherBtn = document.getElementById(`${mode}-d-form-btn${i}`);
                    otherBtn.style.color = '#4c4c4c';
                    otherBtn.style.boxShadow = '#4c4c4c 0px 0px var(--box-shadow-size), inset #4c4c4c 0px 0px var(--box-shadow-size)';

                    const p = document.getElementById(`${mode}-d-form-btn-p${i}`);
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


const infoDone = () => {
    if( document.getElementById('i-d-form-btn-p1').innerText == '' ) {
        document.getElementById('i-d-form-btn1').style.animation = 'rotate 2s linear infinite';
    } else if( document.getElementById('i-d-form-btn-p2').innerText == '' || document.getElementById('i-d-form-btn-p2').innerText > '3' ) {
        document.getElementById('i-d-form-btn2').style.animation = 'rotate 2s linear infinite';
    } else if( document.getElementById('i-d-form-btn-p3').innerText == '') {
        document.getElementById('i-d-form-btn3').style.animation = 'rotate 2s linear infinite';
    } else {
        infoDialog.close();
        autoDialog.showModal();
    }
};