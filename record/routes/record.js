const { insert } = require('../../db/CRUD');
require('dotenv').config;

const recordInsert = async (req, res) => {
    try{
        const teamNumber = req.body.teamNumber;
        const data = await insert(`${process.env.gameName}Record`, `${teamNumber}`, req.body);
        res.status(201).json({ result: data });
        res.end();
    } catch (err){
        console.log(err);
    }
};

module.exports = recordInsert;