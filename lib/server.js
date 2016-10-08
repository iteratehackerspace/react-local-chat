'use strict';

const http = require('http');
let currentUsers = 0;
let messageHistory = [];


const server = http.createServer((req, res) => {
	switch (req.url) {
		case '/connected':
			res.end(`${++currentUsers}`)
			break;
		case '/disconnect':
			if (currentUsers === 0) 
				res.end() 
			else
				res.end(`${--currentUsers}`)
			break;
		case '/users':
			res.end(`${currentUsers}`)
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
		case '/all_messages':
			let payload = {'payload': messageHistory}
			res.end(JSON.stringify(payload));
		default: res.end();

	}

});





server.listen(8000);