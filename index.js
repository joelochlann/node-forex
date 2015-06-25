var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res) {
//    res.sendFile(__dirname + '/index.html');
// });

app.use(express.static('public'));

io.on('connection', function(socket) {
    console.log('a client connected');
})

setInterval(function() {
    io.emit('tick', {timestamp: 123, open: 23.43, high: 14.8, low: 19.9, close: 23.2});
}, 1000);

http.listen(3000, function() {
    console.log('listening on *:3000');
});
