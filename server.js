const http = require('http');
const fs = require('fs');
const WebSocketServer = require('ws').Server;

let currentUsers = 0;
const messageHistory = [];

const port = 8080;

// Basic HTTP httpServer
const httpServer = http.createServer((req, res) => {
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

const webSocketServer = new WebSocketServer({ server: httpServer });

webSocketServer.on('connection', (ws) => {
  const payload = {
    message_type: 'initial_message_load',
    payload: messageHistory,
  };

  // Initial history
  ws.send(JSON.stringify(payload));

  ws.on('message', (msg) => {
    const clientReply = JSON.parse(msg);

    switch (clientReply.cmd) {

      case 'connect':
        currentUsers++; break;
      case 'user_count':
        ws.send(JSON.stringify({
          users_count: `${currentUsers > 0 ? currentUsers : 0}`,
          message_type: 'user_count',
        }));
        break;
      case 'new_message':
        messageHistory.push(clientReply.payload);
        const sendMeOff = JSON.stringify({
          message_type: 'new_chat_message',
          payload: clientReply.payload,
        });
        webSocketServer.clients.forEach((client) => {
          client.send(sendMeOff);
        });
        break;
      default:
        break;
    }
  });

  ws.on('close', () => {
    currentUsers--;
  });
});

httpServer.listen(port, () =>
console.log(`Server started on port:${port}, check localhost:${port}`)
);
