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

const bonusBuyPrice = [
	100,
	200
];

fetch('data/bloodthirst.json')
.then((response) => response.json())
.then((data) => {
	const content = document.querySelector('.slot-content');
	
	const bloodthirstBonusTable = calculateWinTable(data.bloodthirstBonusSpinsWin);
	const immortalsBonusTable = calculateWinTable(data.immortalsBonusSpinsWin);
	const totalSpins = data.totalSpins;

	const bonusChancesStats = content.querySelectorAll('.stat-box[data-name="bonus-chance"] .align-to-edge');
	
	let normalGameBonuses = 0;
	for (let key in data.bonusChances) {
		let percent = data.bonusChances[key] / totalSpins;
		
		normalGameBonuses += data.bonusChances[key];
		
		if(key === 'freespins') {
			bonusChancesStats[0].querySelectorAll('span')[1].innerText = toChanceString(percent);
		}else if(key === 'freespins2') {
			bonusChancesStats[1].querySelectorAll('span')[1].innerText = toChanceString(percent);
		}
	}
	
	bonusChancesStats[2].querySelectorAll('span')[1].innerText = toChanceString(normalGameBonuses / totalSpins);
	
	const bonusAvgWinStats = content.querySelectorAll('.stat-box[data-name="avg-bonus-win"] .align-to-edge');
	
	bonusAvgWinStats[0].querySelectorAll('span')[1].innerText = `${Math.floor(bloodthirstBonusTable.spinXCount / bloodthirstBonusTable.spinCount)}X`;
	bonusAvgWinStats[1].querySelectorAll('span')[1].innerText = `${Math.floor(immortalsBonusTable.spinXCount / immortalsBonusTable.spinCount)}X`;

	const baseGameTableStats = content.querySelector('.stat-box[data-name="base-game-win-table"] .box-content');
	fillTableStatsForWinTable(baseGameTableStats, calculateWinTable(data.baseGameSpinsWin));
	
	const normalGameTableStats = content.querySelector('.stat-box[data-name="normal-game-win-table"] .box-content');
	fillTableStatsForWinTable(normalGameTableStats, calculateWinTable(data.totalGameSpinsWin));
	
	const bloodthirstBonusTableStats = content.querySelector('.stat-box[data-name="bloodthirst-win-table"] .box-content');
	fillTableStatsForWinTable(bloodthirstBonusTableStats, bloodthirstBonusTable);
	
	const immortalsBonusTableStats = content.querySelector('.stat-box[data-name="immortals-win-table"] .box-content');
	fillTableStatsForWinTable(immortalsBonusTableStats, immortalsBonusTable);

	const immortalsStartSymbolTableStats = content.querySelector('.stat-box[data-name="immortals-start-symbol-table"] .box-content');
	fillForChanceArray(immortalsStartSymbolTableStats, data.immortalsBonusStartSymbol);
	
	const immortalsUpgradeSymbolTableStats = content.querySelector('.stat-box[data-name="immortals-upgrade-symbol-table"] .box-content');
	fillForChanceArray(immortalsUpgradeSymbolTableStats, data.immortalsBonusUpgrade);
	
	const immortalsReelsCountTable = content.querySelector('.stat-box[data-name="immortals-reels-count-table"] .box-content');
	fillForChanceArray(immortalsReelsCountTable, data.immortalsBonusFullReels);
	
	const immortalsFullGridCountTable = content.querySelector('.stat-box[data-name="immortals-full-grid-count-table"] .box-content');
	fillForChanceArray(immortalsFullGridCountTable, data.immortalsBonusFullGridSymbol);

	const baseFullGridCountTable = content.querySelector('.stat-box[data-name="base-full-grid-count-table"] .box-content');
	fillForChanceArray(baseFullGridCountTable, data.bloodthirstBaseFullGridSymbol);

	const bloodthirstFullGridCountTable = content.querySelector('.stat-box[data-name="bloodthirst-full-grid-count-table"] .box-content');
	fillForChanceArray(bloodthirstFullGridCountTable, data.bloodthirstBonusFullGridSymbol);

	const rtpStats = content.querySelectorAll('.stat-box[data-name="rtp-data"] .align-to-edge');
	rtpStats[0].querySelectorAll('span')[1].innerText = toPercentString(data.totalWin / (totalSpins * 20));
	rtpStats[1].querySelectorAll('span')[1].innerText = toPercentString(bloodthirstBonusTable.spinXCount / bloodthirstBonusTable.spinCount / bonusBuyPrice[0]);
	rtpStats[2].querySelectorAll('span')[1].innerText = toPercentString(immortalsBonusTable.spinXCount / immortalsBonusTable.spinCount / bonusBuyPrice[1]);
	
	const datasetStats = content.querySelectorAll('.stat-box[data-name="dataset"] .align-to-edge');
	datasetStats[0].querySelectorAll('span')[1].innerText = totalSpins.toLocaleString();
	datasetStats[1].querySelectorAll('span')[1].innerText = bloodthirstBonusTable.spinCount.toLocaleString();
	datasetStats[2].querySelectorAll('span')[1].innerText = immortalsBonusTable.spinCount.toLocaleString();
});