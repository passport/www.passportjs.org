var express = require('express');
var server = express();

server.use(express.logger());
server.use(express.static('passportjs.org'));
server.listen(3000);
