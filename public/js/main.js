(function() {
	window.Platform = {
		run:function(socketAddress) {

			// Set up traders
			traders = [new Trader(10000, StupidTrader.buySignal, StupidTrader.sellSignal)];

			// Set up status bar
			var statusBar = $(document).find("#status-bar");

		    var socket = io();
		    socket.on('tick', function(tick) {
		        console.log(tick);
		        $('body').append($('<li>').text(
		            'timestamp: '+tick.timestamp+', '+
		            'open: '+tick.open+', '+
		            'high: '+tick.high+', '+
		            'low: '+tick.low+', '+
		            'close: '+tick.close
		        ));

				// Loop through array,
				// Pass message to each trader.
				traders.forEach(function(trader) {
					trader.trade(tick);
				});
				$(statusBar).html(JSON.stringify(tick));
		    });
		}
	}
})();
