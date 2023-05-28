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
	10000,
	11912
];

const bonusBuyPrice = [
	88
];

fetch('data/whacked.json')
.then((response) => response.json())
.then((data) => {
	const content = document.querySelector('.slot-content');
	
	const freespinBonusTable = calculateWinTable(data.freespinBonusSpinsWin);
	const totalSpins = data.totalSpins;
	const bonusChancesStats = content.querySelectorAll('.stat-box[data-name="bonus-chance"] .align-to-edge');
	
	for (let key in data.bonusChances) {
		let percent = data.bonusChances[key] / totalSpins;
				
		if(key === 'FREESPIN') {
			bonusChancesStats[0].querySelectorAll('span')[1].innerText = toChanceString(percent);
		}
	}
	
	const bonusAvgWinStats = content.querySelectorAll('.stat-box[data-name="avg-bonus-win"] .align-to-edge');
	
	bonusAvgWinStats[0].querySelectorAll('span')[1].innerText = `${Math.floor(freespinBonusTable.spinXCount / freespinBonusTable.spinCount)}X`;
	
	const baseGameTableStats = content.querySelector('.stat-box[data-name="base-game-win-table"] .box-content');
	fillTableStatsForWinTable(baseGameTableStats, calculateWinTable(data.baseGameSpinsWin));
	
	const normalGameTableStats = content.querySelector('.stat-box[data-name="normal-game-win-table"] .box-content');
	fillTableStatsForWinTable(normalGameTableStats, calculateWinTable(data.totalGameSpinsWin));
	
	const freespinBonusTableStats = content.querySelector('.stat-box[data-name="freespin-win-table"] .box-content');
	fillTableStatsForWinTable(freespinBonusTableStats, freespinBonusTable);
	
	const freespinSymbolChancesTableStats = content.querySelector('.stat-box[data-name="freespin-symbol-chances"] .box-content');
	fillForChanceDictionary(freespinSymbolChancesTableStats, data.freespinSymbolChances);
	
	const freespinRevolverSymbolChancesTableStats = content.querySelector('.stat-box[data-name="freespin-revolver-symbol-chances"] .box-content');
	fillForChanceDictionary(freespinRevolverSymbolChancesTableStats, data.freespinRevolverSymbolChances);
	
	const freespinMysterySymbolChancesTableStats = content.querySelector('.stat-box[data-name="freespin-mystery-symbol-chances"] .box-content');
	fillForChanceDictionary(freespinMysterySymbolChancesTableStats, data.freespinMysterySymbolChances);
	
	const freespinXNudgeSymbolChancesTableStats = content.querySelector('.stat-box[data-name="freespin-xnudge-symbol-chances"] .box-content');
	fillForChanceArray(freespinXNudgeSymbolChancesTableStats, data.freespinXnudgeSymbolChances);
	
	const rtpStats = content.querySelectorAll('.stat-box[data-name="rtp-data"] .align-to-edge');
	rtpStats[0].querySelectorAll('span')[1].innerText = toPercentString(data.totalWin / (totalSpins * 20));
	rtpStats[1].querySelectorAll('span')[1].innerText = toPercentString(freespinBonusTable.spinXCount / freespinBonusTable.spinCount / bonusBuyPrice[0]);
	
	const datasetStats = content.querySelectorAll('.stat-box[data-name="dataset"] .align-to-edge');
	datasetStats[0].querySelectorAll('span')[1].innerText = totalSpins.toLocaleString();
	datasetStats[1].querySelectorAll('span')[1].innerText = freespinBonusTable.spinCount.toLocaleString();
});