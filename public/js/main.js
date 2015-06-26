(function() {
	window.Platform = {
		run:function() {

			// Set up traders
			traders = [
				new SimpleMovingAverageTrader("SimpleMovingAverageTrader", 50000),
				new RandomTrader("RandomTrader", 10000),
				new MovingAverageTrader("MovingAverageTrader", 50000, 10),
				new RSITrader("RSITrader", 50000, 14)
			];

			// Set up status bar
			var statusBar = $(document).find("#status-bar");

			// Trader Template Partials
			var traderLastTradeSource = $("#trader-last-trade").html();
			var traderLastProfitSource = $("#trader-last-profit").html();
			var traderBalanceSource = $("#trader-balance").html();
			var traderAmountSource = $("#trader-amount").html();
			var traderLastTradeTemplate = Handlebars.compile(traderLastTradeSource);
			var traderLastProfitTemplate = Handlebars.compile(traderLastProfitSource);
			var traderBalanceTemplate = Handlebars.compile(traderBalanceSource);
			var traderAmountTemplate = Handlebars.compile(traderAmountSource);

			// Trader Template
		    var traderTemplateSource = $("#trader-template").html();
		    var traderTemplate = Handlebars.compile(traderTemplateSource);

		    // Tick Widget
		    var tickWidgetLocation = $("li.active[role=presentation]");
		    tickWidget = new TickWidget();
		    var tickWidgetSource = $("#tick-widget-template").html();
		    var tickTemplate = Handlebars.compile(tickWidgetSource);
 	
		    tradersElement = $("#traders");

            this.initCharts();

            traders.forEach(function(trader, index) {
            	tradersElement.append(traderTemplate({
            		'id':index,
            		'title':trader.title,
            		'inputs':trader.inputs()
            	}));
            });

            $('.trader-options input').on('blur', function(e) {
            	var trader = traders[$(this).closest('.trader').data('id')];

            	// ASSUMES PARAMS SHOULD BE FLOATS/INTS, and tries to store them as such.
            	// If it can't, it sets the value to zero.
            	var rawValue = $(this).val();
            	var parsedValue = parseFloat(rawValue);
            	if (isNaN(parsedValue)) {
            		trader[$(this).data('property')] = 0;
            		$(this).val(0);
            	} else {
            		trader[$(this).data('property')] = parsedValue;
            	}
            	console.log(trader);
            });

		    var socket = io();
		    socket.on('tick', function(tick) {
                var chart = $('#price-chart').highcharts();
                chart.series[0].addPoint([tick.timestamp, tick.close]);

		    	tickWidgetLocation.html(tickWidget.display(tickTemplate, tick));

				// Loop through array,
				// Pass message to each trader.
				traders.forEach(function(trader, index) {
					var trade = trader.trade(tick);
					if (trade) {
						socket.emit('trade', _.extend(trade, {
							trader: trader.title,
							balance: trader.balance
						}));
					}

					var traderBody = tradersElement.find(".trader[data-id=" + index + "]");
					traderBody.find(".trader-last-trade").replaceWith(trader.displayLastTrade(traderLastTradeTemplate));
					traderBody.find(".trader-last-profit").replaceWith(trader.displayLastProfit(traderLastProfitTemplate));
					traderBody.find(".trader-balance").replaceWith(trader.displayBalance(traderBalanceTemplate));
					traderBody.find(".trader-amount").replaceWith(trader.displayAmount(traderAmountTemplate));
				});
		    });
		},

        initCharts: function() {
            $('#price-chart').highcharts('StockChart', {
                rangeSelector: {
		            buttons: [{
		                count: 1,
		                type: 'minute',
		                text: '1M'
		            }, {
		                count: 5,
		                type: 'minute',
		                text: '5M'
		            }, {
		                type: 'all',
		                text: 'All'
		            }],
		            inputEnabled: false,
		            selected: 0
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

