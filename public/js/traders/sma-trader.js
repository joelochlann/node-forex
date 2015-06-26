window.SimpleMovingAverageTrader = (function(){
    return Trader.extend({
		buy:false,
		sell:false,
        shortPeriod: 5,
        longPeriod: 10,
        defaultDecimalPoint: 1,
        memory: [],
        memorySize: 100000,
        pushToMemory : function (tick) {
            this.memory.unshift(tick);
            // So we remove the last element from out memory if it exceed the memory size.
            if (this.memory.length > this.memorySize) {
                this.memory.pop();
            }
        },
		buySignal: function(tick) {
            this.buy = false;
            this.pushToMemory(tick);
            var sma = new Sma(this.shortPeriod,this.longPeriod, this.memory, this.defaultDecimalPoint);
            sma.parse();
            if (sma.goldenCrossHint) {
                this.buy = true;
            }

			return this.buy;
		},
		sellSignal: function(tick) {
            this.sell = false;
			// If we bought, then don't immediately sell.
			if (this.buy) {
				return false;
			}
            var sma = new Sma(this.shortPeriod,this.longPeriod, this.memory, this.defaultDecimalPoint);
            sma.parse();
            if (sma.deathCrossHint) {
                this.sell = true;
            }

			return this.sell;
		},
        inputs: function() {
            return [
            {name: 'short period', property: 'shortPeriod', value: this.shortPeriod},
            {name: 'long period', property: 'longPeriod', value: this.longPeriod},
            {name: 'decimal point', property: 'defaultDecimalPoint', value: this.defaultDecimalPoint}
            ];
        }
    })
})();
