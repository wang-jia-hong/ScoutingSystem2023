const { MongoClient } = require('mongodb');

require('dotenv').config();

const dbCilent = new MongoClient('mongodb+srv://test:VJiZkyFokvvsedqt@investigationsystem.rj4w2sp.mongodb.net/?retryWrites=true&w=majority');

const connectDB = async () => {
	await dbCilent.connect();
};

module.exports = { connectDB, dbCilent };
