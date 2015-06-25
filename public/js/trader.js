(function(){
	window.Trader = function(balance, buyFunction, sellFunction) {
		this.balance = balance;
		this.buyFunction = buyFunction;
		this.sellFunction = sellFunction;
	}	
})();