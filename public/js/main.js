(function() {
	window.Platform = {
		run:function(socketAddress) {

			// Set up traders
			traders = [new Trader("FirstTrader", 10000, StupidTrader.buySignal, StupidTrader.sellSignal)];

			// Set up status bar
			var statusBar = $(document).find("#status-bar");

		    var traderTemplateSource = $("#trader-template").html();
		    var traderTemplate = Handlebars.compile(traderTemplateSource);

		    var tradersElement = $("#traders");

		    var socket = io();
		    socket.on('tick', function(tick) {
		        console.log(tick);
		        tradersElement.empty();

				// Loop through array,
				// Pass message to each trader.
				traders.forEach(function(trader) {
					trader.trade(tick);
					var html = trader.display(traderTemplate);
					tradersElement.append(html);
				});

				$(statusBar).html(JSON.stringify(tick));
		    });
		}
	}
})();
