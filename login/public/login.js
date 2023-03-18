window.handleCredentialResponse = async (response) => {
    try {
        await axios.post('/googleLogin', {
            googleToken: response.credential,
            clientId: response.clientId,
        });
        window.location.href = '/record';
    } catch(err) {
        
    }
};