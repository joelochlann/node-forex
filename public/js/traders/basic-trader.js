(function(){
	window.BasicTrader = {
		buy:false,
		sell:false,
        memorySize: 3,
        memory:[],
		buySignal: function(tick) {
            this.pushToMemory(tick);

            if (isThreeHigh) {
                this.buy = true;
            }

			return this.buy;
		},
		sellSignal: function(tick) {
			// If we bought, then don't immediately sell.
			if (this.buy) {
				return false;
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
	}
})();
