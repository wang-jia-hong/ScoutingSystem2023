const setSize = () => {
    
    let w = window.innerWidth;
    let h = window.innerHeight;

    

    console.log('w '+ w + ' h ' + h );







    document.documentElement.style.setProperty('--w', `${w}px`);
    document.documentElement.style.setProperty('--h', `${h}px`);

    if(w*0.6*0.1 >= h*0.18*0.8) {
        document.documentElement.style.setProperty('--mBtnW', `${h*0.18*0.85}px`);
        document.documentElement.style.setProperty('--mBtnH', `${h*0.18*0.85}px`);
        document.documentElement.style.setProperty('--mBtnMarginTop', `${( (h * 0.18) - ( h * 0.18 * 0.85 )  ) / 2}px`);
        document.documentElement.style.setProperty('--mBtnMarginLeft', `${( (w * 0.6) - ( h * 0.18 * 0.85 ) * 3 ) / 4}px`);
        document.documentElement.style.setProperty('--mBtnFontSize', `${(h*0.18*0.85) * 0.3}px`);

        document.documentElement.style.setProperty('--dBtnMarginTop', `${( (h * 0.18) - ( h * 0.18 * 0.85 )  ) / 2}px`);
        document.documentElement.style.setProperty('--dBtnMarginLeft', `${( (w * 0.15) - ( h * 0.18 * 0.85 )  ) / 2}px`);
    } else {
        document.documentElement.style.setProperty('--mBtnW', `${w*0.6*0.1}px`);
        document.documentElement.style.setProperty('--mBtnH', `${w*0.6*0.1}px`);
        document.documentElement.style.setProperty('--mBtnMarginTop', `${( (h * 0.18) - ( w*0.6*0.1 )  ) / 2}px`);
        document.documentElement.style.setProperty('--mBtnMarginLeft', `${( (w * 0.6) - ( w*0.6*0.1 ) * 3 ) / 4}px`);
        document.documentElement.style.setProperty('--mBtnFontSize', `${(w*0.7*0.1) * 0.3}px`);

        document.documentElement.style.setProperty('--dBtnMarginTop', `${( (h * 0.18) - ( w*0.6*0.1 )  ) / 2}px`);
        document.documentElement.style.setProperty('--dBtnMarginLeft', `${( (w * 0.15) - ( w*0.6*0.1 )  ) / 2}px`);
    }

    if( w*0.97*0.1 >= h*0.67*0.25 ) {
        if( w * 0.97 <= 500) {
            w = (500 + 4.8) / 0.97;
        }
    
        if(h < 200) {
            h = 200;
        }
        document.documentElement.style.setProperty('--cBtnW', `${h*0.67*0.2}px`);
        document.documentElement.style.setProperty('--cBtnH', `${h*0.67*0.2}px`);
        document.documentElement.style.setProperty('--cBtnMarginTop', `${( ( h * 0.67) - ( h * 0.67 * 0.2 ) * 3 ) / 4}px`);
        document.documentElement.style.setProperty('--cBtnMarginLeft', `${( ( w * 0.97 - 4.8 ) - ( h * 0.67 * 0.2 ) * 9 ) / 10}px`);
        document.documentElement.style.setProperty('--cBtnFontSize', `${(h*0.67*0.2) * 0.3}px`);
    } else {
        if( w * 0.97 <= 500) {
            w = (500 + 4.8) / 0.97;
        }
    
        if(h < 200) {
            h = 200;
        }
        document.documentElement.style.setProperty('--cBtnW', `${w*0.97*0.08}px`);
        document.documentElement.style.setProperty('--cBtnH', `${w*0.97*0.08}px`);
        document.documentElement.style.setProperty('--cBtnMarginTop', `${( (h * 0.67) - ( w*0.97*0.08 ) * 3 ) / 4}px`);
        document.documentElement.style.setProperty('--cBtnMarginLeft', `${( ( w * 0.97 - 4.8 ) - ( w*0.97*0.08 ) * 9 ) / 10}px`);
        document.documentElement.style.setProperty('--cBtnFontSize', `${(w*0.97*0.08) * 0.3}px`);
    }

    
};

setSize();

window.onresize = () => {
    setSize();
};