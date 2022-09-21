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

const bonusCountArray = [
	3,
	4,
	5,
	8,
	10,
	12,
	15,
	18,
	20
];

fetch('data/dorkunit.json')
.then((response) => response.json())
.then((data) => {
	const content = document.querySelector('.slot-content');
	
	const boxesBonusTable = calculateWinTable(data.boxesBonusSpinsWin);
	const reelsBonusTable = calculateWinTable(data.reelsBonusSpinsWin);
	const totalSpins = data.totalSpins;
	
	const bonusChancesStats = content.querySelectorAll('.stat-box[data-name="bonus-chance"] .align-to-edge');
	
	let normalGameBonuses = 0;
	for (let key in data.bonusChances) {
		let percent = data.bonusChances[key] / totalSpins;
		
		normalGameBonuses += data.bonusChances[key];
		
		if(key === 'bonus_boxes') {
			bonusChancesStats[0].querySelectorAll('span')[1].innerText = toChanceString(percent);
		}else if(key === 'bonus_reels') {
			bonusChancesStats[1].querySelectorAll('span')[1].innerText = toChanceString(percent);
		}
	}
	
	bonusChancesStats[2].querySelectorAll('span')[1].innerText = toChanceString(normalGameBonuses / totalSpins);
	
	const bonusAvgWinStats = content.querySelectorAll('.stat-box[data-name="avg-bonus-win"] .align-to-edge');
	
	bonusAvgWinStats[0].querySelectorAll('span')[1].innerText = `${Math.floor(boxesBonusTable.spinXCount / boxesBonusTable.spinCount)}X`;
	bonusAvgWinStats[1].querySelectorAll('span')[1].innerText = `${Math.floor(reelsBonusTable.spinXCount / reelsBonusTable.spinCount)}X`;
	
	const baseGameTableStats = content.querySelector('.stat-box[data-name="base-game-win-table"] .box-content');
	fillTableStatsForWinTable(baseGameTableStats, calculateWinTable(data.baseGameSpinsWin));
	
	const normalGameTableStats = content.querySelector('.stat-box[data-name="normal-game-win-table"] .box-content');
	fillTableStatsForWinTable(normalGameTableStats, calculateWinTable(data.totalGameSpinsWin));
	
	const boxesBonusTableStats = content.querySelector('.stat-box[data-name="boxes-win-table"] .box-content');
	fillTableStatsForWinTable(boxesBonusTableStats, boxesBonusTable);
	
	const reelsBonusTableStats = content.querySelector('.stat-box[data-name="reels-win-table"] .box-content');
	fillTableStatsForWinTable(reelsBonusTableStats, reelsBonusTable);
	
	const boxesCountTableStats = content.querySelector('.stat-box[data-name="boxes-count-table"] .box-content');
	fillForRangeArray(boxesCountTableStats, data.boxesBonusCount, bonusCountArray);
	
	const boxesMultiTableStats = content.querySelector('.stat-box[data-name="boxes-multi-table"] .box-content');
	fillForChanceArray(boxesMultiTableStats, data.boxesBonusMulti);
	
	const dorkReelTableStats = content.querySelector('.stat-box[data-name="dork-reel-table"] .box-content');
	fillForChanceArray(dorkReelTableStats, data.reelsBonusDorkReels);
	
	const dorkIdsTableStats = content.querySelector('.stat-box[data-name="dork-ids-table"] .box-content');
	fillForChanceArray(dorkIdsTableStats, data.reelsBonusDorkIds);
	
	const dorkReelsTableStats = content.querySelector('.stat-box[data-name="bonus-reels-table"] .box-content');
	fillForChanceArray(dorkReelsTableStats, data.reelsBonusDorkTotalReels);
	
	const bonusSmallMultiTableStats = content.querySelector('.stat-box[data-name="bonus-small-multi-table"] .box-content');
	fillForChanceArray(bonusSmallMultiTableStats, data.reelsBonusDorkSmallMulti);

	const bonusMediumMultiTableStats = content.querySelector('.stat-box[data-name="bonus-medium-multi-table"] .box-content');
	fillForChanceArray(bonusMediumMultiTableStats, data.reelsBonusDorkMediumMulti);

	const bonusLargeMultiTableStats = content.querySelector('.stat-box[data-name="bonus-large-multi-table"] .box-content');
	fillForChanceArray(bonusLargeMultiTableStats, data.reelsBonusDorkLargeMulti);

	const rtpStats = content.querySelectorAll('.stat-box[data-name="rtp-data"] .align-to-edge');
	rtpStats[0].querySelectorAll('span')[1].innerText = toPercentString(data.totalWin / (totalSpins * 20));
	rtpStats[1].querySelectorAll('span')[1].innerText = toPercentString(boxesBonusTable.spinXCount / boxesBonusTable.spinCount / bonusBuyPrice[0]);
	rtpStats[2].querySelectorAll('span')[1].innerText = toPercentString(reelsBonusTable.spinXCount / reelsBonusTable.spinCount / bonusBuyPrice[1]);
	
	const datasetStats = content.querySelectorAll('.stat-box[data-name="dataset"] .align-to-edge');
	datasetStats[0].querySelectorAll('span')[1].innerText = totalSpins.toLocaleString();
	datasetStats[1].querySelectorAll('span')[1].innerText = boxesBonusTable.spinCount.toLocaleString();
	datasetStats[2].querySelectorAll('span')[1].innerText = reelsBonusTable.spinCount.toLocaleString();
});