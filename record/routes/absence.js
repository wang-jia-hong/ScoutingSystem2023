const { findOne, insert, update } = require('../../db/CRUD');
const { teamInclude } = require('./analyze');

const absenceInsert = async(req, res) => {
    try{
        const reqData = await req.body;
        const teamNumber = reqData.teamNumber;
        const gameType = reqData.gameType;
        const teamI = await teamInclude(teamNumber, gameType);

        if(teamI) {
            const data = await update('analyze', process.env.gameName + gameType , { teamNumber: teamNumber },  {$inc: {
                absence: 1,
            }});
            res.status(201).json({ result: data });
            res.end();
        } else {
            const data = await insert('analyze', process.env.gameName + gameType , { 
                teamNumber: teamNumber,
                topA: 0,
                middleA: 0,
                bottomA: 0,
                dockA: 0,
                engageA: 0,
                mobilityA: 0,
                pointA: 0,
                topT: 0,
                middleT: 0,
                bottomT: 0,
                dockT: 0,
                engageT: 0,
                parkT: 0,
                pointT: 0,
                win: 0,
                lose: 0,
                tie: 0,
                offensive: 0,
                defensive: 0,
                mix: 0,
                rp: 0,
                link: 0,
                penalty: 0,
                times: 0,
                absence: 1,
            });
            res.status(201).json({ result: data });
            res.end();
        }
    } catch(err) {
        console.log(err);
        res.status(500).end();
    }
};

module.exports = absenceInsert;