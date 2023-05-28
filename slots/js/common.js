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

function calculateWinTable(table, array) {
	let spinCount = 0;
	let spinXCount = 0;
	
	if(array === undefined) 
		array = winsTableValues;
	
	let currentWinTable = [];
	for(let i = 0; i < array.length; i++) {
		currentWinTable[i] = 0;
	}
	
	for (let key in table) {
		let count = table[key];
		
		for(let i = 0; i < array.length; i++) {
			if(array[i] == 0) {
				if(key == 0)
					currentWinTable[i] += count;
			} else if (key >= array[i]) {
				currentWinTable[i] += count;
			}	
		}
		
		spinCount += count;
		spinXCount += (key * count);
	}
		
	return {spinCount: spinCount, spinXCount: spinXCount, winTable: currentWinTable};
}

function fillTableStatsForWinTable(stats, table, array) {
	
	if(array === undefined) 
		array = winsTableValues;
	
	for(let i = 0; i < table.winTable.length; i++) {
		let main = document.createElement('div');
		main.classList.add('align-to-edge');
		
		let xText = 'X' + (array[i] > 0 ? '+' : '');
		
		let span1 = document.createElement('span');
		span1.innerText = `${array[i]}${xText}:`;
	
		let span2 = document.createElement('span');
		span2.innerText = table.winTable[i] > 0 ? toChanceString(table.winTable[i] / table.spinCount) : 'None';
		
		main.appendChild(span1);
		main.appendChild(span2);
		stats.appendChild(main);
	}
}

function fillForChanceDictionary(stats, table) {	
	let total = 0;
	let values = [];
	
	for(let key in table) {
		let count = table[key];	

		values.push([key, count]);
		
		total += count;
	}
	
	values.sort(function(a, b) {
		return b[1] - a[1];
	});
	
	for(let i = 0; i < values.length; i++) {
		let main = document.createElement('div');
		main.classList.add('align-to-edge');
		
		let span1 = document.createElement('span');
		span1.innerText = `${values[i][0]}:`;
		
		let span2 = document.createElement('span');
		span2.innerText = values[i][1] > 0 ? toChanceString(values[i][1] / total) : 'None';
		
		main.appendChild(span1);
		main.appendChild(span2);
		stats.appendChild(main);
	}
}

function fillForRangeArray(stats, table, tableValues) {
	
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