var connect = require('connect');

var port = process.env.PORT || 8000;

connect.createServer(
    connect.static(__dirname)
).listen(port);

console.log("Running on port:[" + port + "]")
