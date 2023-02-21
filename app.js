const express = require('express');
const app = express();

require('dotenv').config();

const { connectDB }  = require('./db/connect');

const recordInsert = require('./record/routes/record');
const { teamInclude, analyzeInsert } = require('./record/routes/analyze');
const getAllTeamResult =require('./result/routes/result');


//for record
app.use(express.json());
app.use('/record', express.static('./record/public'));
app.use('/result', express.static('./result/public'));

app.set('views', './result/views');
app.set('view engine', 'ejs');

app.post('/recordSubmit', async (req, res) => {
	await recordInsert(req, res);
});


app.post('/analyzeSubmit', async (req, res) => {
	await analyzeInsert(req, res);
});


//for result
app.get('/result/:gameType', async (req, res) => {
	await getAllTeamResult(req, res);
});

const startServer = async () => {
	try {
		console.log('waiting for database connect');
		await connectDB();
		console.log('database connected');
		app.listen(5000, () => {
			console.log('server is listen on http://localhost:5000');
		});
	} catch(err) {
		console.log(err);
	}
	
};


startServer();









