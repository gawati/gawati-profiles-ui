const express = require('express');
const path = require('path');
const serialize = require('serialize-javascript');


const env = {
  'API_URL': 'http://localhost'
};

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/env.js', function (req, res) {
  console.log(" Env. js " );
  res.set('Content-Type', 'application/javascript');
  res.send('var env = ' + serialize(env));
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9004);