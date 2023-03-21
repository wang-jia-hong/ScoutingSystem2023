const resultCSP = async (req, res, next) => {
    try {
        await res.setHeader(
            'Content-Security-Policy',
            // eslint-disable-next-line quotes
            "default-src 'self'; font-src 'self' fonts.gstatic.com; img-src 'self'; script-src 'self' cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' fonts.googleapis.com; frame-src 'self'; connect-src 'self';"
        );
        console.log('hi csp');
        next();
    } catch(err) {
        res.status(500);
    }
    
};

module.exports = resultCSP;