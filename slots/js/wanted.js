const winsTableValues = [0,
				         50,
				         100,
				         200,
				         300,
				         500,
				         1000,
				         2500,
				         5000,
				         7500,
				         10000,
				         12500];
						 
const deadBonusWildsTableValues = [
	5,
	10,
	15,
	20
];

const deadBonusMultiTableValues = [
	5,
	10,
	15,
	20,
	25,
	31
];

const deadBonusWildsMultiTableValues = [
	12,
	20,
	30,
	40,
	50,
	60
];

const bonusBuyPrice = [
	80,
	200,
	400
];

function toPercentString(percent) {
	let multi = 0;
	percent *= 100.0;
	
	while(percent < 10) {
		percent *= 10.0;
		if(multi > 0)
			multi *= 10.0;
		else
			multi = 10.0;
	}
	
	percent = Math.round(percent);
	if(multi > 0)
		percent /= multi;
		
	return `${percent}%`;
}

function toChanceString(percent) {
	return `chance 1 in ${ Math.round(1.0 / percent) } (${toPercentString(percent)})`;
}

function calculateWinTable(table) {
	let spinCount = 0;
	let spinXCount = 0;
	
	let currentWinTable = [];
	for(let i = 0; i < winsTableValues.length; i++) {
		currentWinTable[i] = 0;
	}
	
	for (let key in table) {
		let count = table[key];
		
		for(let i = 0; i < winsTableValues.length; i++) {
			if(winsTableValues[i] == 0) {
				if(key == 0)
					currentWinTable[i] += count;
			} else if (key >= winsTableValues[i]) {
				currentWinTable[i] += count;
			}	
		}
		
		spinCount += count;
		spinXCount += (key * count);
	}
		
	return {spinCount: spinCount, spinXCount: spinXCount, winTable: currentWinTable};
}

function fillTableStatsForWinTable(stats, table) {
	for(let i = 0; i < table.winTable.length; i++) {
		let main = document.createElement('div');
		main.classList.add('align-to-edge');
		
		let xText = 'X' + (winsTableValues[i] > 0 ? '+' : '');
		
		let span1 = document.createElement('span');
		span1.innerText = `${winsTableValues[i]}${xText}:`;
	
		let span2 = document.createElement('span');
		span2.innerText = table.winTable[i] > 0 ? toChanceString(table.winTable[i] / table.spinCount) : 'None';
		
		main.appendChild(span1);
		main.appendChild(span2);
		stats.appendChild(main);
	}
}

function fillForChanceArray(stats, array) {
	let total = 0;
	
	for(let i = 0; i < array.length; i++) {
		total += array[i];
	}
	
	const values = stats.querySelectorAll('.align-to-edge');
		
	for(let i = 0; i < array.length; i++) {
		values[i].querySelectorAll('span')[1].innerText = toChanceString(array[i] / total);
	}
}

function fillForDeadArray(stats, table, tableValues) {
	
	let values = [];
	for(let i = 0; i < tableValues.length; i++) {
		values[i] = 0;
	}
	
	let total = 0;
	
	for(let key in table) {
		let count = table[key];
		
		for(let i = 0; i < tableValues.length; i++) {		
			if(i == tableValues.length - 1) {
				if(key >= tableValues[i]) {
					values[i] += count;
				}
			}else if(key >= tableValues[i] && key < tableValues[i + 1]) {
				values[i] += count;
			}
		}
		
		total += count;
	}
	
	for(let i = 0; i < tableValues.length; i++) {
		let main = document.createElement('div');
		main.classList.add('align-to-edge');
				
		let span1 = document.createElement('span');
		
		if(i == tableValues.length - 1) 
			span1.innerText = `${tableValues[i]}:`;
		else
			span1.innerText = `${tableValues[i]}-${tableValues[i + 1]}:`;
	
		let span2 = document.createElement('span');
		span2.innerText = values[i] > 0 ? toChanceString(values[i] / total) : 'None';
		
		main.appendChild(span1);
		main.appendChild(span2);
		stats.appendChild(main);
	}
}

fetch('data/wanted.json')
.then((response) => response.json())
.then((data) => {
	const content = document.querySelector('.slot-content');
	
	const trainBonusTable = calculateWinTable(data._trainBonusSpinsWin);
	const duelBonusTable = calculateWinTable(data._duelBonusSpinsWin);
	const deadBonusTable = calculateWinTable(data._deadBonusSpinsWin);
		
	const totalSpins = data._totalSpins;
	
	const bonusChancesStats = content.querySelectorAll('.stat-box[data-name="bonus-chance"] .align-to-edge');
	
	let normalGameBonuses = 0;
	for (let key in data._bonusChances) {
		let percent = data._bonusChances[key] / totalSpins;
		
		normalGameBonuses += data._bonusChances[key];
		
		if(key === 'freespins_train') {
			bonusChancesStats[0].querySelectorAll('span')[1].innerText = toChanceString(percent);
		}else if(key === 'freespins_duel') {
			bonusChancesStats[1].querySelectorAll('span')[1].innerText = toChanceString(percent);
		}else if(key === 'freespins_dead') {
			bonusChancesStats[2].querySelectorAll('span')[1].innerText = toChanceString(percent);
		}
	}
	
	bonusChancesStats[3].querySelectorAll('span')[1].innerText = toChanceString(normalGameBonuses / totalSpins);
	
	const bonusAvgWinStats = content.querySelectorAll('.stat-box[data-name="avg-bonus-win"] .align-to-edge');
	
	bonusAvgWinStats[0].querySelectorAll('span')[1].innerText = `${Math.floor(trainBonusTable.spinXCount / trainBonusTable.spinCount)}X`;
	bonusAvgWinStats[1].querySelectorAll('span')[1].innerText = `${Math.floor(duelBonusTable.spinXCount / duelBonusTable.spinCount)}X`;
	bonusAvgWinStats[2].querySelectorAll('span')[1].innerText = `${Math.floor(deadBonusTable.spinXCount / deadBonusTable.spinCount)}X`;
	
	const baseGameTableStats = content.querySelector('.stat-box[data-name="base-game-win-table"] .box-content');
	fillTableStatsForWinTable(baseGameTableStats, calculateWinTable(data._baseGameSpinsWin));
	
	const normalGameTableStats = content.querySelector('.stat-box[data-name="normal-game-win-table"] .box-content');
	fillTableStatsForWinTable(normalGameTableStats, calculateWinTable(data._totalGameSpinsWin));
	
	const trainBonusTableStats = content.querySelector('.stat-box[data-name="train-win-table"] .box-content');
	fillTableStatsForWinTable(trainBonusTableStats, trainBonusTable);
	
	const duelBonusTableStats = content.querySelector('.stat-box[data-name="duel-win-table"] .box-content');
	fillTableStatsForWinTable(duelBonusTableStats, duelBonusTable);

	const deadBonusTableStats = content.querySelector('.stat-box[data-name="dead-win-table"] .box-content');
	fillTableStatsForWinTable(deadBonusTableStats, deadBonusTable);
	
	const baseDuelChanceStats = content.querySelector('.stat-box[data-name="base-duel-chance"] .box-content');
	fillForChanceArray(baseDuelChanceStats, data._baseGameDualChance);
	
	const bonusDuelChanceStats = content.querySelector('.stat-box[data-name="bonus-duel-chance"] .box-content');
	fillForChanceArray(bonusDuelChanceStats, data._duelBonusDuelChance);

	const baseDuelMultiStats = content.querySelector('.stat-box[data-name="base-duel-multi"] .box-content');
	fillForChanceArray(baseDuelMultiStats, data._duelMultiplayersChanceBase);

	const bonusDuelMultiStats = content.querySelector('.stat-box[data-name="bonus-duel-multi"] .box-content');
	fillForChanceArray(bonusDuelMultiStats, data._duelMultiplayersChanceBonus);
	
	const baseDuelReelStats = content.querySelector('.stat-box[data-name="base-duel-reel"] .box-content');
	fillForChanceArray(baseDuelReelStats, data._baseGameDuelRealChance);
	
	const bonusDuelReelStats = content.querySelector('.stat-box[data-name="bonus-duel-reel"] .box-content');
	fillForChanceArray(bonusDuelReelStats, data._duelBonusDuelRealChance);
	
	const deadWildsChanceStats = content.querySelector('.stat-box[data-name="dead-wilds-chance"] .box-content');
	fillForDeadArray(deadWildsChanceStats, data._deadBonusWilds, deadBonusWildsTableValues);
	
	const deadMultiChanceStats = content.querySelector('.stat-box[data-name="dead-multi-chance"] .box-content');
	fillForDeadArray(deadMultiChanceStats, data._deadBonusMulti, deadBonusMultiTableValues);

	const deadWildsMultiChanceStats = content.querySelector('.stat-box[data-name="dead-wilds-multi-chance"] .box-content');
	fillForDeadArray(deadWildsMultiChanceStats, data._deadBonusAll, deadBonusWildsMultiTableValues);
	
	const rtpStats = content.querySelectorAll('.stat-box[data-name="rtp-data"] .align-to-edge');
	rtpStats[0].querySelectorAll('span')[1].innerText = toPercentString(data._totalWin / (data._totalSpins * 20));
	rtpStats[1].querySelectorAll('span')[1].innerText = toPercentString(trainBonusTable.spinXCount / trainBonusTable.spinCount / bonusBuyPrice[0]);
	rtpStats[2].querySelectorAll('span')[1].innerText = toPercentString(duelBonusTable.spinXCount / duelBonusTable.spinCount / bonusBuyPrice[1]);
	rtpStats[3].querySelectorAll('span')[1].innerText = toPercentString(deadBonusTable.spinXCount / deadBonusTable.spinCount / bonusBuyPrice[2]);

	const datasetStats = content.querySelectorAll('.stat-box[data-name="dataset"] .align-to-edge');
	
	datasetStats[0].querySelectorAll('span')[1].innerText = totalSpins.toLocaleString();
	datasetStats[1].querySelectorAll('span')[1].innerText = trainBonusTable.spinCount.toLocaleString();
	datasetStats[2].querySelectorAll('span')[1].innerText = duelBonusTable.spinCount.toLocaleString();
	datasetStats[3].querySelectorAll('span')[1].innerText = deadBonusTable.spinCount.toLocaleString();
});