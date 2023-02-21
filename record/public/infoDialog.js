const infoDialog = document.getElementById('i-dialog');
const autoDialog = document.getElementById('a-dialog');

const start = () => {
    document.getElementById('start-dialog').close();
    document.getElementById('i-dialog').showModal();
    document.getElementById('i-dialog-div').webkitRequestFullscreen();
};

let chosenForm = 0;

        const choseForm = (number) => {
            const clickedBtn = document.getElementById(`i-d-form-btn${number}`);

            clickedBtn.style.color = '#ffe0e0';
            clickedBtn.style.boxShadow = '#ffe0e0 0px 0px 25px, inset #ffe0e0 0px 0px 25px';

            clickedBtn.style.animation= '0.2s ease-out 0s 1 normal forwards running bump';

            chosenForm = number;

            for(let i = 1; i < 4; ++i){
                if(i != number) {
                    const otherBtn = document.getElementById(`i-d-form-btn${i}`);
                    otherBtn.style.color = '#4c4c4c';
                    otherBtn.style.boxShadow = '#4c4c4c 0px 0px 25px, inset #4c4c4c 0px 0px 25px';

                    const p = document.getElementById(`i-d-form-btn-p${i}`);
                    if(p.innerText == '' && otherBtn.style.animation === '0.2s ease-out 0s 1 normal forwards running bump') {
                        otherBtn.style.animation = '0.2s ease-out 0s 1 normal forwards running back'
                    }
                }
            }

        }

        const keyboard = (number) => {
            if(chosenForm != 0) {
                const p = document.getElementById(`i-d-form-btn-p${chosenForm}`);
                if(p.innerText < 100000) {
                    p.innerText += number;
                }
            }
        };

        const backspace = () => {
            if(chosenForm != 0) {
                const p = document.getElementById(`i-d-form-btn-p${chosenForm}`);
                    const text = Math.floor(p.innerText/10);
                    if ( text == 0) {
                        p.innerText = '';
                    } else {
                        p.innerText = text;
                    } 
            }
        };


const infoDone = () => {;
    infoDialog.close();
    autoDialog.showModal();
    document.getElementById('a-dialog-div').webkitRequestFullscreen();
};