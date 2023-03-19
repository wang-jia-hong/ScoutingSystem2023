const { MongoClient } = require('mongodb');

require('dotenv').config();

const dbCilent = new MongoClient('mongodb://' + process.env.dbUser + ':' + process.env.dbPassword + '@' + process.env.dbURI);

const connectDB = async () => {
	await dbCilent.connect();
};

module.exports = { connectDB, dbCilent };
