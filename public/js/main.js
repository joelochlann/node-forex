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

            this.initCharts();

		    var socket = io();
		    socket.on('tick', function(tick) {
		        console.log(tick);
                var chart = $('#price-chart').highcharts();
                chart.series[0].addPoint([tick.timestamp, tick.close]);

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
		},

        initCharts: function() {
            $('#price-chart').highcharts('StockChart', {
                rangeSelector: {
                    selected: 1
                },
                title: {
                    text: 'GBP to USD Exchange Rate'
                },
                series: [{
                    name: 'GBP to USD',
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            });
        }


	};

})();

