(function(){
	window.Trader = function(title, balance, buyFunction, sellFunction) {
		this.title = title;
		this.balance = balance;
		this.buyFunction = buyFunction;
		this.sellFunction = sellFunction;
		this.amount = 0;

		this.trade = function(tick) {
			if (this.buyFunction(tick) && this.balance > tick.close) {
				this.amount = Math.floor(this.balance / tick.close);
				this.balance -= parseFloat("" + (this.amount * tick.close)).toFixed(2);
			}
			if (isNaN(this.amount) || isNaN(this.balance)) {
				console.log("Amount and / or balance went NaN");
			}
			if (this.sellFunction(tick)) {
				this.balance += this.amount * tick.close;
				this.amount = 0;
			}
		};

		this.display = function(template) {
			var context = {
				title:this.title, 
				balance:parseFloat(this.balance).toFixed(2), 
				last_trade:'', 
				last_profit:'', 
				current_amount:this.amount
			}

			return template(context);
		}
	}	
})();