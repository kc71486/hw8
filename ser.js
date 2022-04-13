#!/usr/bin/env node

import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 1264;

app.listen(port, () => {
  console.log('listening on port: ' + port);
})

app.use(express.static(__dirname + '/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/helloname', (req, res) => {
  res.send(`Hello, ${req.body.fname} ${req.body.lname}`)
});
