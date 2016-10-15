'use strict';

const http = require('http');
const fs = require('fs');

let currentUsers = 0;
let messageHistory = [];

const port = 8000;

const server = http.createServer((req, res) => {
  switch (req.url) {
  case '/':
    fs.readFile('public/index.html', (err, data) => {
      res.end(data.toString());
    });
    break;
  case '/bundle.js':
    fs.readFile('public/bundle.js', (err, data) => {
      res.end(data.toString());
    });
    break;
  case '/connected':
    res.end(`${++currentUsers}`);
    break;
  case '/disconnect':
    if (currentUsers === 0)
      res.end();
    else
      res.end(`${--currentUsers}`);
    break;
  case '/users':
    res.end(`${currentUsers}`);
    break;
  case '/message':
    let body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      let objectify = JSON.parse(body);
      messageHistory.push(objectify.msg);
      res.end();
    });
    break;
  case '/all_messages':
    let payload = {'payload': messageHistory};
    res.end(JSON.stringify(payload));
    break;
  default: res.end();

  }
});

server.listen(port, () => {
  console.log(`Server started on port:${port}, check localhost:${port}`);
});
