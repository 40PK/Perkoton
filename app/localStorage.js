const app = require('app');
const fs = require('fs');
const path = require('path');

let data = null;
let dataFilePath = path.join(app.getPath('userData'), 'data.json'); 

function load() {
	if (data !== null)
 		return;
 
 	if (!fs.existsSync(dataFilePath)) {
 		data = {};
 		return;
 	}
 
 	data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8')); 
}

function save() {
 	fs.writeFileSync(dataFilePath, JSON.stringify(data)); 
}

module.exports.setItem = function(key, value) {
 	load();
 	data[key] = value; 
 	save();
}

module.exports.getItem = function(key) { 
 	load();
	let value = null;

 	if (key in data)
 		value = data[key];

 	return value;
}

module.exports.removeItem = function(key) { 
 	load();
 	if (key in data) {
 		delete data[key];
 		save();
 	}
}