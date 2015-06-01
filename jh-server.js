/*
*jh-server.js 
*Created by HJH on 2015-05-19 at 04:05

*Modified by HJH on 2015-06-01 at 18:00
  added mysql driver
  create device registration table
  added device registration_id in database
*/

var url = require('url');
// load url module

var http = require('http');
// http object create

var mysql = require('mysql');
// load mysql module

var qs = require('querystring');
// load querystring module

var dbconnection = mysql.createConnection ({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'device_registration'
});//database connection option define

dbconnection.connect(function(err)
	{
		if (err)
		{
			console.error('mysql connection error');
			console.error(err);
			throw err;
		}
	});//database connection function

function onRequest(request, response) {
	console.log('requested...');
	if(request.method=='POST') {
	    var body='';
				request.on('data', function (data) {
					body +=data;
				});
				request.on('end',function(){
				var POST = qs.parse(body); //POST data retrieval
				console.log(POST)
				insertQuery(POST.device_reg_id);
		 });
    }//when request method is POST

	 else if(request.method=='GET') {
		 var url_parts = url.parse(request.url,true); //GET data retrieval
		 console.log(url_parts.query);
		 insertQuery(url_parts.query.device_reg_id);
	 }//when request method is GET
	
	response.writeHead(200,{'Content-Type' : 'text/plain'});
	response.write('device is registered');
	response.end();
};

function insertQuery (device_reg_id){
	
	var query = dbconnection.query('insert into device (device_reg_id) values("'+device_reg_id+'") ',function(err,result){
			if (err)
			{
				console.error('err:'+err);
				throw err;
			}
			
		});
}//insert 'device_reg_id' tuple into 'device' table

function onConnection(socket){
	console.log('connected...');
};

var server = http.createServer();

server.addListener('request',onRequest);
server.addListener('connection',onConnection);
server.listen(8888);

