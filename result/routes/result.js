const { findOne, findAll } = require('../../db/CRUD');
const { dbCilent }  = require('../../db/connect');

const getOneTeamResult = async (req, res, gameName) => {
    try {
		const params = req.params;
        const analyzeData = await findOne('analyze', (gameName + params.gameType), {teamNumber: Number(params.teamNum)});

        const getRate = (num) => {
            if (num == 0) {
                return 0;
            }
            return Math.round( ( (num * 100) + Number.EPSILON) * 100 ) / 100;
        };

		if (analyzeData) {
			const times = analyzeData.times;

			let cargoTotalA = analyzeData.topA + analyzeData.middleA + analyzeData.bottomA;

			if(cargoTotalA == 0){
				cargoTotalA = 1;
			}

			const gameData = await findAll(gameName + 'Record' + params.gameType, `${analyzeData.teamNumber}`);


			res.status(200).render('oneTeam', {
				analyzeData: analyzeData,
				gameData: gameData,
				gameType: params.gameType,
			});
		} else {
			res.redirect('/result/' + req.params.gameType);
		}

        
    } catch(e) {
        console.log(e);
    }

};

const getAllTeamResult = async (req, res, gameName) => {
    const gameType = req.params.gameType;
	const query = req.query;

	let newFields = {};
	let conditions = {};

	const checkCargoRate = (place, mode, extremum) => {
		if(Object.prototype.hasOwnProperty.call(query, `${place}${mode}${extremum}`)) {
			if( extremum === 'Min' || ! Object.prototype.hasOwnProperty.call(query, `${place}${mode}Min`) ) {
				newFields[`${place}${mode}Filter`] = {$cond: [ {$eq: [`$${place}${mode}`, 0]}, 0, {'$divide': [`$${place}${mode}`, {$sum: [`$top${mode}`, `$middle${mode}`, `$bottom${mode}`] } ] } ] };
				conditions[`${place}${mode}Filter`] = {};
			}

			if(extremum === 'Min') {
				conditions[`${place}${mode}Filter`]['$gte'] = Number( query[`${place}${mode}${extremum}`] ) / 100;
			} else {
				conditions[`${place}${mode}Filter`]['$lte'] = Number( query[`${place}${mode}${extremum}`] ) / 100;
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

	const checkMoveRate = (item, mode, extremum) => {
		if( Object.prototype.hasOwnProperty.call(query, `${item}${mode}${extremum}`) ) {
			if( extremum === 'Min' || ! Object.prototype.hasOwnProperty.call(query, `${item}${mode}Min`) ) {
				newFields[`${item}${mode}Filter`] = {$cond: [ {$eq: ['$times', 0]}, 0, { $divide: [`$${item}${mode}`, '$times'] } ] };
				conditions[`${item}${mode}Filter`] = {};
			}
			

			if(extremum === 'Min') {
				conditions[`${item}${mode}Filter`]['$gte'] = Number( query[`${item}${mode}${extremum}`] ) / 100;
			} else {
				conditions[`${item}${mode}Filter`]['$lte'] = Number( query[`${item}${mode}${extremum}`] ) / 100;
			}
		}
	};

	checkMoveRate('dock', 'A', 'Min');
	checkMoveRate('dock', 'A', 'Max');
	checkMoveRate('mobility', 'A', 'Min');
	checkMoveRate('mobility', 'A', 'Max');
	checkMoveRate('dock', 'T', 'Min');
	checkMoveRate('dock', 'T', 'Max');
	checkMoveRate('park', 'T', 'Min');
	checkMoveRate('park', 'T', 'Max');
	
	const checkEngageRate = (mode, extremum) => {
		if( Object.prototype.hasOwnProperty.call(query, `engage${mode}${extremum}`) ) {
			if( extremum === 'Min' || ! Object.prototype.hasOwnProperty.call(query, `engage${mode}Min`) ) {
				newFields[`engage${mode}Filter`] = {$cond: [ {$eq: [`$dock${mode}`, 0]}, 0, { $divide: [`$engage${mode}`, `$dock${mode}`] } ] };
				conditions[`engage${mode}Filter`] = {};
			}
			

			if(extremum === 'Min') {
				conditions[`engage${mode}Filter`]['$gte'] = Number( query[`engage${mode}${extremum}`] ) / 100;
			} else {
				conditions[`engage${mode}Filter`]['$lte'] = Number( query[`engage${mode}${extremum}`] ) / 100;
			}
		}
	};

	checkEngageRate('A', 'Min');
	checkEngageRate('A', 'Max');
	checkEngageRate('T', 'Min');
	checkEngageRate('T', 'Max');
	

	const checkAveragePoint = (mode, extremum) => {
		if( Object.prototype.hasOwnProperty.call(query, `point${mode}${extremum}`) ) {
			if( extremum === 'Min' || ! Object.prototype.hasOwnProperty.call(query, `point${mode}Min`) ) {
				newFields[`point${mode}Filter`] = {$cond: [ {$eq: ['$times', 0]}, 0, { $divide: [`$point${mode}`, '$times'] } ] };
				conditions[`point${mode}Filter`] = {};
			}
			

			if(extremum === 'Min') {
				conditions[`point${mode}Filter`]['$gte'] =  Number( query[`point${mode}${extremum}`] );
			} else {
				conditions[`point${mode}Filter`]['$lte'] = Number( query[`point${mode}${extremum}`] );
			}
		}
	};

	checkAveragePoint('A', 'Min');
	checkAveragePoint('A', 'Max');
	checkAveragePoint('T', 'Min');
	checkAveragePoint('T', 'Max');


	const checkResultRate = (item, extremum) => {
		if( Object.prototype.hasOwnProperty.call(query, `${item}${extremum}`) ) {
			if( extremum === 'Min' || ! Object.prototype.hasOwnProperty.call(query, `${item}Min`) ) {
				newFields[`${item}Filter`] = {$cond: [ {$eq: ['$times', 0]}, 0, { $divide: [`$${item}`, '$times'] } ] };
				conditions[`${item}Filter`] = {};
			}
			
			if(extremum === 'Min') {
				conditions[`${item}Filter`]['$gte'] = Number( query[`${item}${extremum}`] ) / 100;
			} else {
				conditions[`${item}Filter`]['$lte'] = Number( query[`${item}${extremum}`] ) / 100;
			}
		}
	};

	checkResultRate('win', 'Min');
	checkResultRate('win', 'Max');
	checkResultRate('lose', 'Min');
	checkResultRate('lose', 'Max');
	checkResultRate('tie', 'Min');
	checkResultRate('tie', 'Max');
	checkResultRate('offensive', 'Min');
	checkResultRate('offensive', 'Max');
	checkResultRate('defensive', 'Min');
	checkResultRate('defensive', 'Max');
	checkResultRate('mix', 'Min');
	checkResultRate('mix', 'Max');
	
	const checkStability = (extremum) => {
		if( Object.prototype.hasOwnProperty.call(query, `stability${extremum}`) ) {
			if( extremum === 'Min' || ! Object.prototype.hasOwnProperty.call(query, 'stabilityMin') ) {
				newFields['stability'] = {$cond: [ {$eq: ['$times', 0]}, 0, { $divide: [ {$subtract: ['$times', '$absence'] }, '$times'] } ] };
				conditions['stability'] = {};
			}
			
			if(extremum === 'Min') {
				conditions['stability']['$gte'] = Number( query[`stability${extremum}`] ) / 100;
			} else {
				conditions['stability']['$lte'] = Number( query[`stability${extremum}`] ) / 100;
			}
		}
	};

	checkStability('Min');
	checkStability('Max');


	const checkResultAverage = (item, extremum) => {
		if( Object.prototype.hasOwnProperty.call(query, `${item}${extremum}`) ) {
			if( extremum === 'Min' || ! Object.prototype.hasOwnProperty.call(query, `${item}Min`) ) {
				newFields[`${item}Filter`] = {$cond: [ {$eq: ['$times', 0]}, 0, { $divide: [`$${item}`, '$times'] } ] };
				conditions[`${item}Filter`] = {};
			}
			
			if(extremum === 'Min') {
				conditions[`${item}Filter`]['$gte'] = Number( query[`${item}${extremum}`] );
			} else {
				conditions[`${item}Filter`]['$lte'] = Number( query[`${item}${extremum}`] );
			}
		}
	};

	checkResultAverage('link', 'Min');
	checkResultAverage('link', 'Max');
	checkResultAverage('penalty', 'Min');
	checkResultAverage('penalty', 'Max');
	checkResultAverage('rp', 'Min');
	checkResultAverage('rp', 'Max');

	let sort = {};

	

	if( Object.prototype.hasOwnProperty.call(query, 'sort') ) {
		sort[query['sort']] = Number(query['sortOrder']);
	} else {
		sort = {'teamNumber' : 1};
	}
	console.log(sort);


	
	const data = await dbCilent.db('analyze').collection(gameName + gameType).aggregate([{$addFields: newFields }, {$match: conditions }, {$sort: sort}]).toArray();



	res.status(200).render('allTeam' ,{data: data, gameType: gameType});
};

module.exports =  {getAllTeamResult, getOneTeamResult};