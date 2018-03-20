var http = require('http');
var router = require('./src/router.js');

var server = http.createServer(router);

server.listen(3000,function() {
    console.log("Ready and listening");
});