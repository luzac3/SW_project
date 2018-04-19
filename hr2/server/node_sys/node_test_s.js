var http = require('http');
var server = http.createServer();
server.on('request', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('hello world');
	res.end();
});

//この部分で接続を確保し、繋ぎっぱなしにする
server.listen(3000, '127.0.0.1');
console.log("server listening...");