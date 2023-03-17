let largerMode = false;

const setSize = () => {
    
    let w = window.innerWidth - 0.5;
    let h = window.innerHeight - 0.5;
    
    if( w * window.devicePixelRatio < 700 ) {
        w = 700 / window.devicePixelRatio;
    }
    if( h * window.devicePixelRatio < 700 ) {
        h = 700 / window.devicePixelRatio;  
    }

    document.documentElement.style.setProperty('--w', `${w}px`);
    document.documentElement.style.setProperty('--h', `${h}px`);


    const setFontSize = () => {
        if( w <= h ) {
            document.documentElement.style.setProperty('--font-size', `${w * 0.03}px`);
            return w * 0.03;
        } else {
            document.documentElement.style.setProperty('--font-size', `${h * 0.03}px`);
            return h * 0.03;
        }
    };

    setFontSize();

    

    if( ( h * 0.03 <= 15 || w * 0.03 <= 15 ) && navigator.maxTouchPoints < 1 ) {
        if(largerMode === false) {
            largerMode = true;
        }
        w = w * window.devicePixelRatio;
        h = h * window.devicePixelRatio;
        document.documentElement.style.setProperty('--w', `${w}px`);
        document.documentElement.style.setProperty('--h', `${h}px`);
         document.documentElement.style.setProperty('--font-size', `${setFontSize()}px`);
    } else {
        largerMode = false;
    }

    console.log(largerMode);

    if(w*0.6*0.1 >= h*0.18*0.8) {
        document.documentElement.style.setProperty('--mBtnW', `${h*0.18*0.85}px`);
        document.documentElement.style.setProperty('--mBtnH', `${h*0.18*0.85}px`);
        document.documentElement.style.setProperty('--mBtnMarginTop', `${( (h * 0.18) - ( h * 0.18 * 0.85 )  ) / 2}px`);
        document.documentElement.style.setProperty('--mBtnMarginLeft', `${( (w * 0.6) - ( h * 0.18 * 0.85 ) * 3 ) / 4}px`);
        document.documentElement.style.setProperty('--mBtnFontSize', `${(h*0.18*0.85) * 0.25}px`);
    } else {
        document.documentElement.style.setProperty('--mBtnW', `${w*0.6*0.1}px`);
        document.documentElement.style.setProperty('--mBtnH', `${w*0.6*0.1}px`);
        document.documentElement.style.setProperty('--mBtnMarginTop', `${( (h * 0.18) - ( w*0.6*0.1 )  ) / 2}px`);
        document.documentElement.style.setProperty('--mBtnMarginLeft', `${( (w * 0.6) - ( w*0.6*0.1 ) * 3 ) / 4}px`);
        document.documentElement.style.setProperty('--mBtnFontSize', `${(w*0.7*0.1) * 0.25}px`);
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
        document.documentElement.style.setProperty('--cBtnMarginLeft', `${( ( w * 0.97 ) - ( h * 0.67 * 0.2 ) * 9 ) / 10}px`);
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
        document.documentElement.style.setProperty('--cBtnMarginTop', `${( (h * 0.67) - ( w * 0.97 * 0.08 ) * 3 ) / 4}px`);
        document.documentElement.style.setProperty('--cBtnMarginLeft', `${( ( w * 0.97 ) - ( w * 0.97* 0.08 ) * 9 ) / 10}px`);
        document.documentElement.style.setProperty('--cBtnFontSize', `${(w*0.97*0.08) * 0.3}px`);
    }
};

setSize();

window.onresize = () => {
    setSize();
};