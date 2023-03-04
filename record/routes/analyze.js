const { listCollections , findAll, findOne, insert, update } = require('../../db/CRUD');
const { dbCilent } = require('../../db/connect');
require('dotenv').config;

const teamInclude = async (teamNumber, gameType) => {
    const documents = await findAll('analyze', process.env.gameName + gameType);
    let teamList = [];
    documents.forEach( document => {
        teamList.push(document.teamNumber);
    });
    return teamList.includes(teamNumber);
};

const analyzeInsert = async (req, res) => {
    try{
        const reqData = await req.body;
        const teamNumber = reqData.teamNumber;
        const gameType = reqData.gameType;
        const teamI = await teamInclude(teamNumber, gameType);

        if(teamI === true) {
            const oldData = await findOne('analyze', process.env.gameName + gameType, {teamNumber: teamNumber});
            

            const topA = reqData.topA + oldData.topA;
            const middleA = reqData.middleA + oldData.middleA;
            const bottomA = reqData.bottomA + oldData.bottomA;

            const dockA = reqData.dockA + oldData.dockA;
            const engageA = reqData.engageA + oldData.engageA;
            const mobilityA = reqData.mobilityA + oldData.mobilityA;

            const pointA = (topA * 6) + (middleA * 4) + (bottomA * 3) + (dockA * 8) + (engageA * 4) +(mobilityA * 3);


            const topT = await reqData.topT + oldData.topT;
            const middleT = reqData.middleT + oldData.middleT;
            const bottomT = reqData.bottomT + oldData.bottomT;

            const dockT = reqData.dockT + oldData.dockT;
            const engageT = reqData.engageT + oldData.engageT;
            const parkT = reqData.parkT + oldData.parkT;

            const pointT = (topT * 5) + (middleT * 3) + (bottomT * 2) + (dockT * 6) + (engageT * 4) + (parkT * 2);

            let win = oldData.win;
            let lose = oldData.lose;
            let tie = oldData.tie;

            if(reqData.result === 1) {
                win += 1;
            } else if (reqData.result === 2) {
                lose += 1;
            } else if (reqData.result === 3) {
                tie += 1 ;
            }

            let offensive = oldData.offensive;
            let defensive = oldData.defensive;
            let mix = oldData.mix;

            if(reqData.character === 1) {
                offensive += 1;
            } else if(reqData.character === 2) {
                defensive += 1;
            } else if(reqData.character === 3) {
                mix += 1;
            }

            const rp = reqData.rp + oldData.rp;


            //待更改
            let link = 0;
            let foul = 0;
            if( reqData.link ) {
                link = reqData.link + oldData.link;
                foul = reqData.foul + oldData.foul;
            } else {
                link = reqData.link;
                foul = reqData.foul;
            }
            

            const times = oldData.times + 1;

            const data = await update('analyze', process.env.gameName + gameType , { teamNumber: teamNumber }, 
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
                foul: foul,
                times: times,
            });
            res.status(201).json({ result: data });
            res.end();

        } else {

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
            const foul = reqData.foul;

            const times = 1;

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
                foul: foul,
                times: times,
            });

            res.status(201).json({ result: data });
            res.end();
            
            
        }
    } catch (err){
        console.log(err);
    }
};

module.exports = { teamInclude, analyzeInsert };