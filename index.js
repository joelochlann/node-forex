var express = require('express');
var app = express();
var http = require('http').Server(app);

app.set('port', (process.env.PORT || 3000));

var io = require('socket.io')(http);
var _ = require('underscore');


app.use(express.static('public'));

io.on('connection', function(socket) {
    console.log('a client connected');
    socket.on('trade', function(trade) {
    	console.log(trade);
    });
})

// How finely do we want to divide up the sine wave?
var divisions = 60;
inputVals = _.range(0, Math.PI * 2, Math.PI/(divisions/2));

inputValsFastCycle = _.range(0, Math.PI * 18, Math.PI/(divisions/18));
sineValsFastCycle = inputValsFastCycle.map(function(x) { return parseFloat((Math.sin(x))); });

sineVals = inputVals.map(function(x, i) {
	return parseFloat((Math.sin(x) + 3 + sineValsFastCycle[i]).toFixed(2));
});
var i = 0;
setInterval(function() {
    if (i === sineVals.length) {
        i = 0;
    }
    var val = sineVals[i++];
    io.emit('tick', {timestamp: Date.now(), open: val, high: val, low: val, close: val});
}, 1000);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
