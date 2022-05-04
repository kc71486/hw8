#!/usr/bin/env node

import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import { createRequire } from 'module'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const Console = require("node:console");
const jsonpath = "./students.json";

const app = express();
const port = 1268;

app.listen(port, () => {
  console.log('listening on port: ' + port);
})

app.use(express.static(__dirname + '/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function saveJSON(src, obj) {
	let tmp = JSON.stringify(obj), fs = require('fs');
	fs.writeFile(jsonpath, tmp, function (err) {
		if (err) {
			console.log(err);
		}
	});
}
function loadJSON(src) {
	console.log("load");
	Console.log("load2");
	return require(src);
}

var allstu = loadJSON(jsonpath);

app.get('/allstu', (req, res) => {
	let stulist = "";
	//var == file, so use var(and avoid file cache)
	Object.entries(allstu).forEach(([key, value]) => {
		stulist += `\"${key}\":\"${value}\"<br>`
	})
	res.send(stulist);
});

app.get('/searchstu', (req, res) => {
	let message = {};
	if(allstu.hasOwnProperty(req.query.id)) {
		message.mode = 0;
		message.name = allstu[req.query.id];
	} else {
		message.mode = 1;
	}
	res.send(JSON.stringify(message));
});

app.post('/addstu', (req, res) => {
	let message = {id:req.body.id};
	if(allstu.hasOwnProperty(req.body.id)) {
		message.oldName = allstu[req.body.id];
		allstu[req.body.id] = req.body.name;
		saveJSON(jsonpath, allstu);
		message.mode = 1;
		message.newName = req.body.name;
	} else {
		allstu[req.body.id] = req.body.name;
		saveJSON(jsonpath, allstu);
		message.mode = 0;
		message.newName = req.body.name;
	}
	res.send(JSON.stringify(message));
});

app.post('/delstu', (req, res) => {
	let message = {};
	if(allstu.hasOwnProperty(req.body.id)) {
		message.name = req.body.id+":"+allstu[req.body.id];
		delete allstu[req.body.id];
		saveJSON(jsonpath, allstu);
		message.mode = 0;
	} else {
		message.mode = 1;
	}
	res.send(JSON.stringify(message));
});
