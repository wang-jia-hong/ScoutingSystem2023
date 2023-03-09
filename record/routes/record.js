const { insert } = require('../../db/CRUD');
require('dotenv').config;

const recordInsert = async (req, res) => {
    try{
        const teamNumber = req.body.teamNumber;
        const gameType = req.body.gameType;
        const data = await insert(`${process.env.gameName}Record${gameType}`, `${teamNumber}`, req.body);
        res.status(201).json({ result: data });
        res.end();
    } catch (err){
        console.log(err);
        res.status(500).end();
    }
};

module.exports = recordInsert;