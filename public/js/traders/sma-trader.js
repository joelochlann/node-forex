window.SimpleMovingAverageTrader = (function(){
    var self = this;

    this.memorySize = 100000;

    this.memory = [];

    this.pushToMemory = function (tick) {
        this.memory.push(tick);
        // So we remove the last element from out memory if it exceed the memory size.
        if (this.memory.length > this.memorySize) {
            this.memory.pop();
        }
    };
    var emptyMemory = function () {
        self.memory = new Array();
    };
    var init = function() {
        self.needInit=false;
    };

    return {
		buy:false,
		sell:false,
		buySignal: function(tick) {
            if(typeof self.need_init==='undefined') {
                init();
            }
            self.pushToMemory(tick);
            var sma = new Sma(5,10, self.memory);
            sma.parse();
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
            var sma = new Sma(5,10, self.memory);
            sma.parse();
            if (sma.isDeathCrossHint()) {
                this.sell = true;
            }

			return this.sell;
		},
    }
})();
