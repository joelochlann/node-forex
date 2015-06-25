(function(){
	window.Trader = function(title, balance, buyFunction, sellFunction) {
		this.title = title;
		this.balance = balance;
		this.buyFunction = buyFunction;
		this.sellFunction = sellFunction;
		this.amount = 0;

		this.trade = function(tick) {
			if (this.buyFunction(tick)) {
				this.amount = Math.floor(this.balance / tick.close);
				this.balance -= this.amount * tick.close;
			}
			if (this.sellFunction(tick)) {
				this.balance += this.amount * tick.close;
				this.amount = 0;
			}
		};

		this.display = function(template) {
			var context = {
				title:this.title, 
				balance:this.balance, 
				last_trade:'', 
				last_profit:'', 
				current_amount:this.amount
			}

			return template(context);
		}
	}	
})();