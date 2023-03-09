const { dbCilent } = require('./connect');


const listCollections = async (database) => {
    const collectionList =  await dbCilent.db(database).listCollections({}, {nameOnly: true}).toArray();
    const collectionNames = [];
    collectionList.forEach( collection => collectionNames.push(collection.name));
    return collectionNames.sort( (a, b) => { return a - b; } );
};

const findAll = async (database, collection) => {
    return await dbCilent.db(database).collection(collection).find({}).toArray();
};

const findOne = async (database, collection, filter) => {
    return await dbCilent.db(database).collection(collection).findOne(filter);
};

const insert = async (database, collection, data) => {
    return await dbCilent.db(database).collection(collection).insertOne(data);
};

const update = async (database, collection, document, data) => {
    return await dbCilent.db(database).collection(collection).updateOne(document, data);
};


module.exports = { listCollections, findAll, findOne, insert, update };