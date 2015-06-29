(function(){
    window.RandomTrader = Trader.extend({
        buy: false,
        sell: false,
        someParam: 24,
        someOtherParam: 53,
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
        },
        inputs: function() {
            return [
                {name: 'Some param', property: 'someParam', value: this.someParam},
                {name: 'Some other param', property: 'someOtherParam', value: this.someOtherParam}
            ];
        }   
    });
})();
