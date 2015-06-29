(function(){
    window.Trader = Class.extend({ 
        init: function(title, balance) {
            this.title = title;
            this.balance = balance;
            // this.buySignal = buySignal;
            // this.sellSignal = sellSignal;
            this.amount = 0;
            this.lastTrade = {};
            this.lastProfit = 0;
            this.preBalance = balance;
        },

        trade: function(tick) {
            var traded = false;
            if (this.buySignal(tick) && this.balance > tick.close) {
                var tradedAmount = Math.floor(this.balance * tick.close);
                this.amount += tradedAmount
                this.lastTrade = {
                    'side': 'B',
                    'amount': this.amount,
                    'price': tick.close
                };
                this.preBalance = this.balance;
                this.balance -= parseFloat("" + (this.amount / tick.close)).toFixed(2);
                traded = true;
            }
            if (isNaN(this.amount) || isNaN(this.balance)) {
                console.log("Amount and / or balance went NaN");
            }
            if (this.sellSignal(tick) && this.amount > 0) {
                this.balance += this.amount / tick.close;
                this.lastTrade = {
                    'side' : 'S',
                    'amount': this.amount,
                    'price' : tick.close
                };
                this.amount = 0;
                this.lastProfit = parseFloat("" + (this.balance - this.preBalance)).toFixed(2);
                traded = true;
            }

            return traded ? this.lastTrade : false;
        },

        info: function() {
            return  {
                title:this.title
            };
        },

        displayLastTrade: function(template) {
            var text = "";
            if (this.lastTrade.amount !== undefined) {
                var side = this.lastTrade.side;
                if (side === 'B') {
                    text += "Bought ";
                } else {
                    text += "Sold ";
                }
                text += this.lastTrade.amount;
                text += " @ ";
                text += this.lastTrade.price;
            } else {
                text = "None";
            }

            return template({'last_trade':text});
        },

        displayLastProfit: function(template) {
            return template({'last_profit':this.lastProfit});
        },

        displayBalance: function(template) {
            return template({'balance':parseFloat(this.balance).toFixed(2)});
        },

        displayAmount: function(template) {
            return template({'current_amount':this.amount});
        },

        inputs: function() {
            return {};
        }
    });
})();
