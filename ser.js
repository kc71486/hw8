#!/usr/bin/env node

import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 1268;

app.listen(port, () => {
  console.log('listening on port: ' + port);
})

app.use(express.static(__dirname + '/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var allstu = {};

app.get('/allstu', (req, res) => {
	let stulist = "";
	Object.entries(allstu).forEach(([key, value]) => {
		stulist += `\"${key}\":\"${value}\"<br>`
	})
	res.send(stulist);
});

app.get('/searchstu', (req, res) => {
	res.send("hello, " + allstu[req.query.id]);
});

app.post('/addstu', (req, res) => {
	allstu[req.body.id] = req.body.name;
	res.send(`added ${req.body.id} : ${req.body.name}`);
});

app.post('/delstu', (req, res) => {
	delete allstu[req.body.id];
	res.send(`deleted ${req.body.id}`);
});
