(function(){
	window.SimpleMovingAverageTrader = Trader.extend({
		buy:false,
		sell:false,
        memorySize: 100000,
        memory:[],
		buySignal: function(tick) {
            this.pushToMemory(tick);
            var sma = new Sma(50,100, this.memory);
            if (sma.isGoldenCrossHint()) {
                this.buy = true;
            }

			return this.buy;
		},
		sellSignal: function(tick) {
			// If we bought, then don't immediately sell.
			if (this.buy) {
				return false;
			}
            var sma = new Sma(50,100, this.memory);
            if (sma.isDeathCrossHint()) {
                this.sell = true;
            }

			return this.sell;
		},
        pushToMemory: function (tick) {
            this.memory.push(tick);
            // So we remove the last element from out memory if it exceed the memory size.
            if (this.memory.length > this.memorySize) {
                this.memory.pop();
            }
        },
        emptyMemory: function () {
            this.memory = new Array();
        }
	});
})();
