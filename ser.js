#!/usr/bin/env node

import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import { createRequire } from 'module'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
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
  if(allstu.hasOwnProperty(req.query.id)) {
    res.send("hello, " + allstu[req.query.id]);
  }
  else {
    res.send("no such student");
  }
});

app.post('/addstu', (req, res) => {
	allstu[req.body.id] = req.body.name;
	saveJSON(jsonpath, allstu);
	res.send(`added ${req.body.id} : ${req.body.name}`);
});

app.post('/delstu', (req, res) => {
  if(allstu.hasOwnProperty(req.body.id)) {
	  delete allstu[req.body.id];
    saveJSON(jsonpath, allstu);
    res.send(`deleted ${req.body.id}`);
  }
  else {
    res.send("aborted, id not found");
  }
});
