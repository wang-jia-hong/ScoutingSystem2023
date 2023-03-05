const express = require('express');
const app = express();

require('dotenv').config();

const { connectDB }  = require('./db/connect');

const recordInsert = require('./record/routes/record');
const { analyzeInsert } = require('./record/routes/analyze');
const { getAllTeamResult, getOneTeamResult }=require('./result/routes/result');


//for record
app.use(express.json());
app.use('/record', express.static('./record/public'));
app.use('/result', express.static('./result/public'));
app.use('/result/:gameType/:teamNum', express.static('./result/public'));

app.set('views', './result/views');
app.set('view engine', 'ejs');

app.post('/recordSubmit', async (req, res) => {
	await recordInsert(req, res);
});


app.post('/analyzeSubmit', async (req, res) => {
	await analyzeInsert(req, res);
});


//for result
app.get('/result', async (req, res) => {
	res.render('home');
}); 

app.get('/result/:gameType', async (req, res) => {
	await getAllTeamResult(req, res, process.env.gameName);
});

app.get('/result/:gameType/:teamNum', async (req, res) => {
	await getOneTeamResult(req, res, process.env.gameName);
});

app.get('/result/previous/:gameName/:gameType', async (req, res) => {
	await getAllTeamResult(req, res, req.params.gameName);
});

app.get('/result/previous/:gameName/:gameType/:teamNum', async (req, res) => {
	await getOneTeamResult(req, res, req.params.gameName);
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









