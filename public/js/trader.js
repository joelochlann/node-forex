(function(){
	window.Trader = function(title, balance, buyFunction, sellFunction) {
		this.title = title;
		this.balance = balance;
		this.buyFunction = buyFunction;
		this.sellFunction = sellFunction;
		this.amount = 0;
		this.lastTrade = {};
		this.lastProfit = 0;
		this.preBalance = balance;

		this.trade = function(tick) {
			if (this.buyFunction(tick) && this.balance > tick.close) {
				this.amount = Math.floor(this.balance / tick.close);
				this.lastTrade = {
					'side': 'B',
					'amount': this.amount,
					'price': tick.close
				};
				this.preBalance = this.balance;
				this.balance -= parseFloat("" + (this.amount * tick.close)).toFixed(2);
			}
			if (isNaN(this.amount) || isNaN(this.balance)) {
				console.log("Amount and / or balance went NaN");
			}
			if (this.sellFunction(tick) && this.amount > 0) {
				this.balance += this.amount * tick.close;
				this.lastTrade = {
					'side' : 'S',
					'amount': this.amount,
					'price' : tick.close
				};
				this.amount = 0;
				this.lastProfit = parseFloat("" + (this.balance - this.preBalance)).toFixed(2);
			}
		};

		this.info = function() {
			return  {
				title:this.title
			};
		}

		this.displayLastTrade = function(template) {
			var text = "";
			var side = this.lastTrade.side;
			if (side === 'B') {
				text += "Bought ";
			} else {
				text += "Sold ";
			}
			text += this.lastTrade.amount;
			text += " @ ";
			text += this.lastTrade.price;

			return template({'last_trade':text});
		};

		this.displayLastProfit = function(template) {
			return template({'last_profit':this.lastProfit});
		};

		this.displayBalance = function(template) {
			return template({'balance':parseFloat(this.balance).toFixed(2)});
		};

		this.displayAmount = function(template) {
			return template({'current_amount':this.amount});
		};
	}
})();
