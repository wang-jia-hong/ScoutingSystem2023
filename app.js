const express = require('express');
const app = express();
require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.cookieSecrect));

const { connectDB }  = require('./db/connect');

const recordInsert = require('./record/routes/record');
const { analyzeInsert } = require('./record/routes/analyze');
const absenceInsert = require('./record/routes/absence');
const { getAllTeamResult, getOneTeamResult } = require('./result/routes/result');

const loginCSP = require('./login/middlewares/csp');
const resultCSP = require('./result/middlewares/csp');
const { findUser, insertUser, googleLogin, loginVerify, submitApprove } = require('./login/routes/authentication');

app.use('/login', loginCSP);
app.use('/result', resultCSP);
app.use('/previous', resultCSP);
app.use(express.json());
app.use('/login', express.static('./login/public'));
app.use('/record', [loginVerify, express.static('./record/public')]);
app.use('/recordSubmit', submitApprove);
app.use('/analyzeSubmit', submitApprove);
app.use('/absenceSubmit', submitApprove);



app.use('/result/:gameType', express.static('./result/public'));
app.use('/result/:gameType/:teamNum', express.static('./result/public'));
app.use('/previous/:gameName/:gameType', express.static('./result/public'));
app.use('/previous/:gameName/:gameType/:teamNum', express.static('./result/public'));

app.set('views', ['./result/views', './login/views']);
app.set('view engine', 'ejs');

app.get('/login', async (req, res) => {
	res.render('login', {OAuthClientId: process.env.OAuthClientId});
});

app.post('/googleLogin', async (req, res) => {
	await googleLogin(req, res);
});


app.post('/recordSubmit', async (req, res) => {
	await recordInsert(req, res);
});


app.post('/analyzeSubmit', async (req, res) => {
	await analyzeInsert(req, res);
});

app.post('/absenceSubmit', async (req, res) => {
	await absenceInsert(req, res);
});


//for result
app.get('/result/:gameType', async (req, res) => {
	await getAllTeamResult(req, res, process.env.gameName);
});

app.get('/result/:gameType/:teamNum', async (req, res) => {
	await getOneTeamResult(req, res, process.env.gameName);
});

app.get('/previous/:gameName/:gameType', async (req, res) => {
	await getAllTeamResult(req, res, req.params.gameName);
});

app.get('/previous/:gameName/:gameType/:teamNum', async (req, res) => {
	await getOneTeamResult(req, res, req.params.gameName);
});

app.get('*', async (req, res) => {
	res.redirect('/result/2');
});

const startServer = async () => {
	try {
		console.log('waiting for database connect');
		await connectDB();
		console.log('database connected');
		app.listen(process.env.port, () => {
			console.log('server is listen on http://localhost:' + process.env.port);
		});
	} catch(err) {
		console.log(err);
	}
	
};


startServer();









