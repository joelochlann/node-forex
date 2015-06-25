(function(){
	window.MovingAverageTrader = {
		period:10,
		memory:[],
		previouMA:null,
		previousClose:null,
		currentMA:null,
		init: function(period) {
			this.period = period;
		},
		buySignal: function(tick) {
			memory.push(tick);
			if (memory.length > period) {
				memory.shift();
			}
			this.previousClose = tick.close;

			if (memory.length < this.period) {
				return false;
			}
			this.currentMA = memory.reduce(function(x, memo){ return memo + x; }, 0) / memory.length;
			if (this.previousMA == null) {
				this.previousMA = this.currentMA;
				return false;
			}

			var result = (this.previousClose < this.previousMA && tick.close > this.currentMA);

			this.previousClose = tick.close;
			this.previousMA = this.currentMA;

			return result;
		},
		sellSignal: function(tick) {
			return (this.previousClose > this.previousMA && tick.close < this.currentMA);
		}
	}
})();