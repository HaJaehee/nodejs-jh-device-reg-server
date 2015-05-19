/**
*jh-server.js 
*Created by HJH on 2015-05-19 at 04:05
*/

var http = require('http');


function onRequest(request, response) {
	console.log('requested...');
	response.writeHead(200,{'Content-Type' : 'text/plain'});
	response.write('Hello nodejs');
	response.end();
};

function onConnection(socket){
	console.log('connected...');
};

var server = http.createServer();

server.addListener('request',onRequest);
server.addListener('connection',onConnection);
server.listen(8888);

