const winsTableValues = [
	0,
	50,
	100,
	200,
	300,
	500,
	1000,
	1500,
	2500,
	5000,
	7500,
	10000
];

const baseOrbsTableValues = [
	0,
	10,
	20,
	30,
	50,
	100,
	200,
	500,
	1000,
	2000
];

const bonusActiveMultiTableValues = [
	0,
	10,
	20,
	30,
	50,
	100,
	200,
	500,
	1000,
	2000,
	5000,
	7500,
	10000
];

const bonusMultiTableValues = [
	10,
	20,
	30,
	50,
	100,
	200,
	500,
	1000,
	2000,
	5000,
	7500,
	10000
];

const bonusBuyPrice = [
	129,
	200
];

fetch('data/anubis.json')
.then((response) => response.json())
.then((data) => {
	const content = document.querySelector('.slot-content');
	
	const underworldBonusTable = calculateWinTable(data.underworldBonusSpinsWin);
	const judgmentBonusTable = calculateWinTable(data.judgmentBonusSpinsWin);
	const totalSpins = data.totalSpins;
	
	const bonusChancesStats = content.querySelectorAll('.stat-box[data-name="bonus-chance"] .align-to-edge');
	
	let normalGameBonuses = 0;
	for (let key in data.bonusChances) {
		let percent = data.bonusChances[key] / totalSpins;
		
		normalGameBonuses += data.bonusChances[key];
		
		if(key === 'underworld') {
			bonusChancesStats[0].querySelectorAll('span')[1].innerText = toChanceString(percent);
		}else if(key === 'judgment') {
			bonusChancesStats[1].querySelectorAll('span')[1].innerText = toChanceString(percent);
		}
	}
	
	bonusChancesStats[2].querySelectorAll('span')[1].innerText = toChanceString(normalGameBonuses / totalSpins);
	
	const bonusAvgWinStats = content.querySelectorAll('.stat-box[data-name="avg-bonus-win"] .align-to-edge');
	
	bonusAvgWinStats[0].querySelectorAll('span')[1].innerText = `${Math.floor(underworldBonusTable.spinXCount / underworldBonusTable.spinCount)}X`;
	bonusAvgWinStats[1].querySelectorAll('span')[1].innerText = `${Math.floor(judgmentBonusTable.spinXCount / judgmentBonusTable.spinCount)}X`;
	
	const baseGameTableStats = content.querySelector('.stat-box[data-name="base-game-win-table"] .box-content');
	fillTableStatsForWinTable(baseGameTableStats, calculateWinTable(data.baseGameSpinsWin));
	
	const normalGameTableStats = content.querySelector('.stat-box[data-name="normal-game-win-table"] .box-content');
	fillTableStatsForWinTable(normalGameTableStats, calculateWinTable(data.totalGameSpinsWin));
	
	const underworldBonusTableStats = content.querySelector('.stat-box[data-name="underworld-win-table"] .box-content');
	fillTableStatsForWinTable(underworldBonusTableStats, underworldBonusTable);
	
	const judgmentBonusTableStats = content.querySelector('.stat-box[data-name="judgment-win-table"] .box-content');
	fillTableStatsForWinTable(judgmentBonusTableStats, judgmentBonusTable);
	
	const baseOrbsValuesTableStats = content.querySelector('.stat-box[data-name="base-orbs-values-table"] .box-content');
	fillTableStatsForWinTable(baseOrbsValuesTableStats, calculateWinTable(data.baseGameOrbValues, baseOrbsTableValues), baseOrbsTableValues);
	
	const bonusActiveMultiTableStats = content.querySelector('.stat-box[data-name="bonus-active-multi-table"] .box-content');
	fillTableStatsForWinTable(bonusActiveMultiTableStats, calculateWinTable(data.underworldActiveMultisValue, bonusActiveMultiTableValues), bonusActiveMultiTableValues);
	
	const bonusMultiTableStats = content.querySelector('.stat-box[data-name="bonus-multi-table"] .box-content');
	fillTableStatsForWinTable(bonusMultiTableStats, calculateWinTable(data.underworldMultisValue, bonusMultiTableValues), bonusMultiTableValues);
	
	const bonusColumnsTableStats = content.querySelector('.stat-box[data-name="bonus-columns-table"] .box-content');
	fillForChanceArray(bonusColumnsTableStats, data.underworldColumnsActive);
	
	const rtpStats = content.querySelectorAll('.stat-box[data-name="rtp-data"] .align-to-edge');
	rtpStats[0].querySelectorAll('span')[1].innerText = toPercentString(data.totalWin / (totalSpins * 20));
	rtpStats[1].querySelectorAll('span')[1].innerText = toPercentString(underworldBonusTable.spinXCount / underworldBonusTable.spinCount / bonusBuyPrice[0]);
	rtpStats[2].querySelectorAll('span')[1].innerText = toPercentString(judgmentBonusTable.spinXCount / judgmentBonusTable.spinCount / bonusBuyPrice[1]);
	
	const baseOrbsTableStats = content.querySelectorAll('.stat-box[data-name="base-orbs-table"] .align-to-edge');
	baseOrbsTableStats[0].querySelectorAll('span')[1].innerText = toChanceString(data.blueOrbCount / totalSpins);
	baseOrbsTableStats[1].querySelectorAll('span')[1].innerText = toChanceString(data.redOrbCount / totalSpins);
	baseOrbsTableStats[2].querySelectorAll('span')[1].innerText = toChanceString(data.bothOrbCount / totalSpins);
	
	const datasetStats = content.querySelectorAll('.stat-box[data-name="dataset"] .align-to-edge');
	datasetStats[0].querySelectorAll('span')[1].innerText = totalSpins.toLocaleString();
	datasetStats[1].querySelectorAll('span')[1].innerText = underworldBonusTable.spinCount.toLocaleString();
	datasetStats[2].querySelectorAll('span')[1].innerText = judgmentBonusTable.spinCount.toLocaleString();
});