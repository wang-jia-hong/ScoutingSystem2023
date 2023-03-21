const loginCSP = async (req, res, next) => {
    try {
        await res.setHeader(
            'Content-Security-Policy',
            // eslint-disable-next-line quotes
            "default-src 'self'; font-src 'self' fonts.gstatic.com; img-src 'self'; script-src 'self' cdn.jsdelivr.net accounts.google.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com accounts.google.com; frame-src 'self' accounts.google.com; connect-src 'self';"
        );
        next();
    } catch(err) {
        res.status(500);
    }
    
};

module.exports = loginCSP;