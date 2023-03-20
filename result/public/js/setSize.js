const setSize = () => {
    let w = window.innerWidth - 0.5;
    let h = window.innerHeight - 0.5;

    console.log('w ' + w + '   ' + 'h ' +h);
    if( w * window.devicePixelRatio < 1000 ) {
        w = 1000 / window.devicePixelRatio;
    }
    // if( h * window.devicePixelRatio < 1000 ) {
    //     h = 1000 / window.devicePixelRatio; 
    // }

    document.documentElement.style.setProperty('--w', `${w}px`);
    document.documentElement.style.setProperty('--h', `${h}px`);

    // document.documentElement.style.setProperty('--pageFontSize', `${w * 0.008}px`);
};





setSize();

window.onresize = () => {
    setSize();
};