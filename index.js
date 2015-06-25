var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('underscore');

app.use(express.static('public'));

io.on('connection', function(socket) {
    console.log('a client connected');
})

// How finely do we want to divide up the sine wave?
var divisions = 60;
inputVals = _.range(0, Math.PI * 2, Math.PI/(divisions/2));
sineVals = inputVals.map(function(x) { return parseFloat((Math.sin(x) + 2).toFixed(2)); });
var i = 0;
setInterval(function() {
    if (i === sineVals.length) {
        i = 0;
    }
    var val = sineVals[i++];
    io.emit('tick', {timestamp: i, open: val, high: val, low: val, close: val});
}, 1000);

http.listen(3000, function() {
    console.log('listening on *:3000');
});
