const { insert, findOne, findAll } = require('../../db/CRUD');

require('dotenv').config();

const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.OAuthClientId);

const insertUser = async (user) => {
    return await insert('user', 'userInfo', user);
};

const findUser = async (user) => {
    return await findOne('user', 'userInfo', user);
};

const googleLogin = async (req, res) => {
    try {
		if(req.body.clientId === process.env.OAuthClientId) {
			const ticket = await client.verifyIdToken({
				idToken: req.body.googleToken,
				audience: process.env.OAuthClientId,
			});
			if(ticket) {
				const payload = ticket.getPayload();
				const name = payload['name'];
				const email = payload['email'];
				const dbUser = await findUser({name: name, email: email});
				if (! dbUser) {
					await insertUser({name: name, email: email});
				}
				const jwtToken = jwt.sign({name: name, email: email, expires: (Date.now() + (1000 * 60 * 60 * 12))}, process.env.jwtSecrect, {expiresIn: 60 * 60 * 12});
				res.cookie('jwtToken', jwtToken, {path: '/recordSubmit', httpOnly: true, secure:true, signed: true, expires: new Date(Date.now() + (1000 * 60 * 60 * 12))});
				res.cookie('jwtToken', jwtToken, {path: '/analyzeSubmit', httpOnly: true, secure:true, signed: true, expires: new Date(Date.now() + (1000 * 60 * 60 * 12))});
				res.cookie('jwtToken', jwtToken, {path: '/absenceSubmit', httpOnly: true, secure:true, signed: true, expires: new Date(Date.now() + (1000 * 60 * 60 * 12))});
				res.cookie('jwtToken', jwtToken, {path: '/record', httpOnly: true, secure:true, signed: true, expires: new Date(Date.now() + (1000 * 60 * 60 * 12))});
				res.status(200).end();
			}
		}
	} catch(err) {
		res.status(500).end();
	}
};

const loginVerify = async (req, res, next) => {
    try {
        const jwtInfo = jwt.verify(req.signedCookies.jwtToken, process.env.jwtSecrect);
		if( (Date.now() + (1000 * 60 * 60)) < jwtInfo.expires) {
			const dbUser = await findUser({name: jwtInfo.name, email: jwtInfo.email});
			if(dbUser) {
				next();
			} else {
				res.redirect('/login');
			}
		} else {
			res.redirect('/login');
		}
    } catch(err) {
        res.redirect('/login');
    } 
};

const submitApprove = async (req, res, next) => {
	try {
        const jwtInfo = jwt.verify(req.signedCookies.jwtToken, process.env.jwtSecrect);
		const dbUser = await findUser({name: jwtInfo.name, email: jwtInfo.email});
		if(dbUser) {
			next();
		} else {
			res.status(500).end();
		}
    } catch(err) {
        res.status(500).end();
    }
};


module.exports = {insertUser, findUser, googleLogin, loginVerify, submitApprove};