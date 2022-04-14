#!/usr/bin/env node

import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import { createRequire } from 'module'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const jsonpath = "students.json";

const app = express();
const port = 1268;

app.listen(port, () => {
  console.log('listening on port: ' + port);
})

app.use(express.static(__dirname + '/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function saveJSON(src, obj) {
	let tmp = JSON.stringify(obj), fs = require(fs);
	fs.writefile(jsonpath, tmp, function (err) {
		if (err) {
			console.log(err);
		}
	});
}
function loadJSON(src) {
	let out, fs = require(fs);
	fs.readFile(jsonpath, function (err,data) {
		if (err) {
			return console.log(err);
		}
		out = JSON.parse(data.toString());
	});
	return out;
}

var allstu = loadJSON(jsonpath);

app.get('/allstu', (req, res) => {
	let allstu2 = loadJSON(jsonpath), stulist = "";
	console.log("file = cache ?" + (allstu === allstu2));
	Object.entries(allstu2).forEach(([key, value]) => {
		stulist += `\"${key}\":\"${value}\"<br>`
	})
	res.send(stulist);
});

app.get('/searchstu', (req, res) => {
	res.send("hello, " + allstu[req.query.id]);
});

app.post('/addstu', (req, res) => {
	allstu[req.body.id] = req.body.name;
	saveJSON(jsonpath, allstu);
	res.send(`added ${req.body.id} : ${req.body.name}`);
});

app.post('/delstu', (req, res) => {
	delete allstu[req.body.id];
	saveJSON(jsonpath, allstu);
	res.send(`deleted ${req.body.id}`);
});
