//const { findOne, findAll } = require('.../');
const { dbCilent }  = require('../../db/connect');

/*const getOneResult = async (req, res) => {
    try {
        const document = await findOne('analyze', process.env.gameName, {teamNumber: Number(req.params.teamNumber)});

        const getRate = (num) => {
            if (num == 0) {
                return 0;
            }
            return Math.round( ( (num * 100) + Number.EPSILON) * 100 ) / 100;
        };

        const times = document.times;

        let cargoTotalA = document.topA + document.middleA + document.bottomA;

        if(cargoTotalA == 0){
            cargoTotalA = 1;
        }


        let cargoTotalT = document.topT + document.middleT + document.bottomT;

        if(cargoTotalT == 0){
            cargoTotalT = 1;
        }

        const gameRecorded = await findAll(`${process.env.gameName}Record`, `${document.teamNumber}`);


        res.render('oneTeam', {
            teamNumber: document.teamNumber,
            topRateA: getRate( document.topA / cargoTotalA ),
            middleRateA: getRate( document.middleA / cargoTotalA ),
            bottomRateA: getRate( document.bottomA / cargoTotalA ),
            dockRateA: getRate( document.dockA / times ),
            engageRateA: getRate( document.engageA / document.dockA ),
            mobilityRateA: getRate( document.mobilityA / times ),
            avaragePointA: ( document.pointA / times ),
            topRateT: getRate( document.topT / cargoTotalT ),
            middleRateT: getRate( document.middleT / cargoTotalT ),
            bottomRateT: getRate( document.bottomT / cargoTotalT ),
            dockRateT: getRate( document.dockT / times ),
            engageRateT: getRate( document.engageT / document.dockT ),
            parkRateT: getRate( document.parkT / times ),
            avaragePointT: ( document.pointT / times ),
            winRate: getRate( document.win / times ),
            loseRate: getRate( document.lose / times ),
            tieRate: getRate( times - document.win - document.lose / times ),
            offensiveRate: getRate( document.offensive / times ),
            defensiveRate: getRate( document.defensive / times ),
            mixRate: getRate( times - document.offensive - document.defensive / times ),
            totalRP: document.rp,
            gameRecorded: gameRecorded,
        });

        res.end();
    } catch(e) {
        console.log(e);
    }

};*/

const getAllTeamResult = async (req, res) => {
    const query = req.query;

	let newFields = {};
	let conditions = {};

	const checkCargoRate = (place, mode, extremum) => {
		if(Object.prototype.hasOwnProperty.call(query, `${place}${mode}${extremum}`)) {
			if( extremum === 'Min' || ! Object.prototype.hasOwnProperty.call(query, `${place}${mode}Min`) ) {
				newFields[`${place}Rate${mode}`] = {$cond: [ {$eq: [`$${place}${mode}`, 0]}, 0, {'$divide': [`$${place}${mode}`, {$sum: [`$top${mode}`, `$middle${mode}`, `$bottom${mode}`] } ] } ] };
			}

			if(extremum === 'Min') {
				conditions[`${place}Rate${mode}`] = {$gte: Number( query[`${place}${mode}${extremum}`] ) };
			} else {
				conditions[`${place}Rate${mode}`] = {$lte: Number( query[`${place}${mode}${extremum}`] ) };
			}
		}
	};

	checkCargoRate('top', 'A', 'Min');
	checkCargoRate('top', 'A', 'Max');
	checkCargoRate('middle', 'A', 'Min');
	checkCargoRate('middle', 'A', 'Max');
	checkCargoRate('bottom', 'A', 'Min');
	checkCargoRate('bottom', 'A', 'Max');
	checkCargoRate('top', 'T', 'Min');
	checkCargoRate('top', 'T', 'Max');
	checkCargoRate('middle', 'T', 'Min');
	checkCargoRate('middle', 'T', 'Max');
	checkCargoRate('bottom', 'T', 'Min');
	checkCargoRate('bottom', 'T', 'Max');

	const checkOtherRate = (item, mode, extremum) => {
		if( Object.prototype.hasOwnProperty.call(query, `${item}${mode}${extremum}`) ) {
			if( extremum === 'Min' || ! Object.prototype.hasOwnProperty.call(query, `${item}${mode}Min`) ) {
				newFields[`${item}Rate${mode}`] = {$cond: [ {$eq: ['$times', 0]}, 0, { $divide: [`$${item}${mode}`, '$times'] } ] };
			}
			

			if(extremum === 'Min') {
				conditions[`${item}Rate${mode}`] = {$gte: Number( query[`${item}${mode}${extremum}`] ) };
			} else {
				conditions[`${item}Rate${mode}`] = {$lte: Number( query[`${item}${mode}${extremum}`] ) };
			}
		}
	};

	checkOtherRate('dock', 'A', 'Min');
	checkOtherRate('dock', 'A', 'Max');
	checkOtherRate('engage', 'A', 'Min');
	checkOtherRate('engage', 'A', 'Max');
	checkOtherRate('mobility', 'A', 'Min');
	checkOtherRate('mobility', 'A', 'Max');
	checkOtherRate('dock', 'T', 'Min');
	checkOtherRate('dock', 'T', 'Max');
	checkOtherRate('engage', 'T', 'Min');
	checkOtherRate('engage', 'T', 'Max');
	checkOtherRate('park', 'T', 'Min');
	checkOtherRate('park', 'T', 'Max');
	
	

	const checkAveragePoint = (mode, extremum) => {
		if( Object.prototype.hasOwnProperty.call(query, `point${mode}${extremum}`) ) {
			if( extremum === 'Min' || ! Object.prototype.hasOwnProperty.call(query, `point${mode}Min`) ) {
				newFields[`averagePoint${mode}`] = {$cond: [ {$eq: ['$times', 0]}, 0, { $divide: [`$point${mode}`, '$times'] } ] };
			}
			

			if(extremum === 'Min') {
				conditions[`averagePoint${mode}`] = {$gte: Number( query[`point${mode}${extremum}`] ) };
			} else {
				conditions[`averagePoint${mode}`] = {$lte: Number( query[`point${mode}${extremum}`] ) };
			}
		}
	};

	checkAveragePoint('A', 'Min');
	checkAveragePoint('A', 'Max');
	checkAveragePoint('T', 'Min');
	checkAveragePoint('T', 'Max');

	let sort = {'teamNumber' : 1};

	

	if( Object.prototype.hasOwnProperty.call(query, 'sort') ) {
		sort[query['sort']] = Number(query['sortOrder']);
	}
	
	console.log(query);

	const data = await dbCilent.db('analyze').collection(process.env.gameName).aggregate([{$addFields: newFields }, {$match: conditions }, {$sort: sort}]).toArray();

	res.render('result' ,{data: data});
};

module.exports =  getAllTeamResult;