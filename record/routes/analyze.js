const { findOne, insert, update } = require('../../db/CRUD');
const { dbCilent } = require('../../db/connect');
require('dotenv').config;

const teamInclude = async (teamNumber, gameType) => {
    const data = await findOne('analyze', process.env.gameName + gameType, {teamNumber: teamNumber});
    if(data) {
        return true;
    } else {
        return false;
    }
};

const analyzeInsert = async (req, res) => {
    try{
        const reqData = await req.body;
        const teamNumber = reqData.teamNumber;
        const gameType = reqData.gameType;
        const teamI = await teamInclude(teamNumber, gameType);

        const topA = reqData.topA;
        const middleA = reqData.middleA;
        const bottomA = reqData.bottomA;

        const dockA = reqData.dockA;
        const engageA = reqData.engageA;
        const mobilityA = reqData.mobilityA;

        const pointA = (topA * 6) + (middleA * 4) + (bottomA * 3) + (dockA * 8) + (engageA * 4) + (mobilityA * 3);


        const topT = await reqData.topT;
        const middleT = reqData.middleT;
        const bottomT = reqData.bottomT;

        const dockT = reqData.dockT;
        const engageT = reqData.engageT;
        const parkT = reqData.parkT;

        const pointT = (topT * 5) + (middleT * 3) + (bottomT * 2) + (dockT * 6) + (engageT * 4) + (parkT * 2);

        let win = 0;
        let lose = 0;
        let tie = 0;

        if(reqData.result === 1) {
            win += 1;
        } else if (reqData.result === 2) {
            lose += 1;
        } else if (reqData.result === 3) {
            tie += 1 ;
        }

        let offensive = 0;
        let defensive = 0;
        let mix = 0;

        if(reqData.character === 1) {
            offensive += 1;
        } else if(reqData.character === 2) {
            defensive += 1;
        } else if (reqData.character === 3) {
            mix += 1;
        }

        const rp = reqData.rp;
        const link = reqData.link;
        const penalty = reqData.penalty;

        const times = 1;

        if(teamI) {
            const data = await update('analyze', process.env.gameName + gameType , { teamNumber: teamNumber }, {$inc: {
                topA: topA,
                middleA: middleA,
                bottomA: bottomA,
                dockA: dockA,
                engageA: engageA,
                mobilityA: mobilityA,
                pointA: pointA,
                topT: topT,
                middleT: middleT,
                bottomT: bottomT,
                dockT: dockT,
                engageT: engageT,
                parkT: parkT,
                pointT: pointT,
                win: win,
                lose: lose,
                tie: tie,
                offensive: offensive,
                defensive: defensive,
                mix: mix,
                rp: rp,
                link: link,
                penalty: penalty,
                times: times,
            }});
            res.status(201).json({ result: data });
            res.end();

        } else {

            const data = await insert('analyze', process.env.gameName + gameType,
            {
                teamNumber: teamNumber,
                topA: topA,
                middleA: middleA,
                bottomA: bottomA,
                dockA: dockA,
                engageA: engageA,
                mobilityA: mobilityA,
                pointA: pointA,
                topT: topT,
                middleT: middleT,
                bottomT: bottomT,
                dockT: dockT,
                engageT: engageT,
                parkT: parkT,
                pointT: pointT,
                win: win,
                lose: lose,
                tie: tie,
                offensive: offensive,
                defensive: defensive,
                mix: mix,
                rp: rp,
                link: link,
                penalty: penalty,
                times: times,
                absence: 0,
            });
            res.status(201).json({ result: data });
            res.end();
        }
    } catch (err){
        console.log(err);
        res.status(500).end();
    }
};


module.exports = { teamInclude, analyzeInsert };