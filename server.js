'use strict';

const http = require('http'),
      fs = require('fs'),
      WebSocketServer = require('ws').Server;

let currentUsers = 0;
let messageHistory = [];

const port = 8080;

// Basic HTTP server
const server = http.createServer((req, res) => {
  switch (req.url) {
  case '/':
    fs.readFile('public/index.html',
		'utf-8',
		(err, data) => res.end(data));
    break;
  case '/logo.png':
    fs.readFile('public/logo.png', (err, data) => res.end(data));
    break;
  case '/bundle.js':
    fs.readFile('public/bundle.js',
		'utf-8',
		(err, data) => res.end(data));
    break;
  default: res.end();
  }
});

const ws_server = new WebSocketServer({server:server});

ws_server.on('connection', ws => {
  const payload = {
    message_type:'initial_message_load',
    payload: messageHistory
  };

  // Initial history
  ws.send(JSON.stringify(payload));

  ws.on('message', msg => {
    const client_reply = JSON.parse(msg);

    switch(client_reply.cmd) {

    case 'connect':
      currentUsers++; break;
    case 'user_count':
      ws.send(JSON.stringify({users_count:`${currentUsers}`}));
      break;
    case 'new_message':
      messageHistory.push(client_reply.payload);
      const send_me_off = JSON.stringify({
	message_type:'new_chat_message',
	payload:client_reply.payload
      });
      ws_server.clients.forEach(client => {
	client.send(send_me_off);
      });
      break;
      // Trivial case, just to keep the socket connection alive.
    case 'ping': break;
    default:
      console.error('Unknown command from the client');
    }
  });

  ws.on('close', () => {
    currentUsers--;
  });

});

server.listen(port, () =>
	      console.log(`Server started on port:${port}, check localhost:${port}`)
);
