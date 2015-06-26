(function(){
	window.MovingAverageTrader = Trader.extend({
		period:10,
		memory:[],
		previousMA:null,
		previousClose:null,
		currentMA:null,
		init: function(title, balance, period) {
			this.period = period;
			this._super(title, balance);
		},
		buySignal: function(tick) {
			this.memory.push(tick.close);
			if (this.memory.length > this.period) {
				this.memory.shift();
			}
			this.previousClose = tick.close;

			if (this.memory.length < this.period) {
				return false;
			}
			this.currentMA = this.memory.reduce(function(x, memo){ return memo + x; }, 0) / this.memory.length;
			if (this.previousMA === null) {
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
		},
		inputs: function() {
			return [
				{name: 'Period', property: 'period', value: this.period}
			];
		}
	});
})();