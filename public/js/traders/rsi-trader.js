(function(){
    window.RSITrader = Trader.extend({
        period:14,
        buyAt:30,
        sellAt:70,
        memory:[],
        init: function(title, balance, period, buyAt, sellAt) {
            this.period = period;
            if (buyAt !== undefined) {
                this.buyAt = buyAt;
            }
            if (sellAt !== undefined) {
                this.sellAt = sellAt;
            }
            this._super(title, balance);
        },
        buySignal: function(tick) {
            this.memory.push(tick.close);
            if (this.memory.length > this.period) {
                this.memory.shift();
            }

            if (this.memory.length < this.period) {
                return false;
            }

            var gains = 0;
            var losses = 0;
            for (var i = 0, length = this.memory.length; i < length; i++) {
                if (i - 1 < 0) {
                    continue;
                }

                if (this.memory[i] < this.memory[i - 1]) {
                    // Previous value was greater, therefore this is a loss.
                    losses += (this.memory[i - 1] - this.memory[i]);

                } else if (this.memory[i] > this.memory[i - 1]) {
                    // Previous value was less, therefore this is a gain.
                    gains += (this.memory[i] - this.memory[i - 1]);
                }
            }
            var averageUp = gains / this.period;
            var averageDown = losses / this.period;

            this.currentRSI = 100 - (100/(1 + (averageUp/averageDown)));

            return this.currentRSI <= this.buyAt;
        },
        sellSignal: function(tick) {
            return this.currentRSI >= this.sellAt;
        },
        inputs: function() {
            return [
                {name: 'Period', property: 'period', value: this.period},
                {name: 'Buy At', property: 'buyAt', value: this.buyAt},
                {name: 'Sell At', property: 'sellAt', value: this.sellAt},
            ];
        }
    });
})();