var http = require('http');
var url=require('url');
var route=require('./route.js');

function serverStart(){
var serverFun = function(req, res) {
	var pathname=url.parse(req.url,false,true).pathname;
    route.route(pathname,req,res);
};
var server = http.createServer(serverFun);
server.listen(8008);
};

exports.serverStart=serverStart;