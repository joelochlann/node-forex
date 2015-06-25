(function(){
	var StupidTrader = {
		buy:false,
		sell:false,
		buySignal: function(tick) {
			this.buy = Math.floor(Math.random() * 2) === 0;

			return this.buy;
		},
		sellSignal: function(tick) {
			// If we bought, then don't immediately sell.
			if (this.buy) {
				return false;
			}
			this.sell = Math.floor(Math.random() * 2) === 0;

			return this.sell;
		}
	}
})();