(function() {

	TraderHongfu = {
		buy_signal,
		sell_signal,
		run() {},
		message() {}
	};

	TraderDom = {
		// When to buy
		buy_signal,

		// When to sell
		sell_signal,

		// Initial setup (think __construct)
		run() {},

		// What happens when a tick comes through
		message() {}
	};

	window.Platform = {
		run:function(socketAddress) {

			// Set up traders

			// Set up status bar
			var statusBar = $(document).find("#status-bar");

			// Set up websocket.
			var conn = new WebSocket(socketAddress);
			conn.onopen = function(e) {
				$(statusBar).html("Connection established");
			};
			conn.onmessage = function(e) {
				$(statusBar).html(JSON.stringify(e.data));
			    console.log(e.data);
			    foreach(Traders) {
			    	trader->message(e);
			    }
			};
			conn.onerror = function(e) {
				$(statusBar).html("Error - see console.");
			    console.log(e);
			}
		}
	}

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
    });
})();
