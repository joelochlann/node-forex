(function(){
	window.Sma = function(shortPeriod, longPeriod, marketData) {
        this.shortPeriod = shortPeriod;
        this.longPeriod = longPeriod;
        this.marketData = marketData;
        this.deathCrossHint = false;
        this.goldenCrossHint = false;

        // Assume the first one is alway today's tick.
        this.todayTick = function () {
            return this.marketData.slice(0,1);
        };

        this.isDeathCrossHint = function() {
            return this.deathCrossHint;
        };
        this.isGoldenCrossHint = function() {
            return this.goldenCrossHint;
        };
        this.getPreviousMAByPeriod = function(period) {
            if (this.marketData.length <= period+1) {
                return false;
            }
            return this.marketData.slice(1, period+1).reduce(function(previous, currenct) { if (previous.hasOwnProperty('close')) {return previous['close'] + currenct['close']; } return previous + currenct['close'];}) / period;
        };
        this.getCurrenctMAByPeriod = function(period) {
            if (this.marketData.length <= period) {
                return false;
            }
            return this.marketData.slice(0, period).reduce(function(previous, currenct) { if (previous.hasOwnProperty('close')) {return previous['close'] + currenct['close']; } return previous + currenct['close'];}) / period;
        };
        this.parse = function() {
            var shortPeriodMA = this.getCurrenctMAByPeriod(this.shortPeriod);
            var longPeriodMA = this.getCurrenctMAByPeriod(this.longPeriod);
            var previousShortMA = this.getPreviousMAByPeriod(this.shortPeriod);
            var previousLongMA = this.getPreviousMAByPeriod(this.longPeriod);
            console.log(this.marketData);
            console.log('ShortMA: '+shortPeriodMA);
            console.log('previousShortMA: '+previousShortMA);
            console.log('longPeriodMA: '+longPeriodMA);
            console.log('previousLongMA: '+previousLongMA);
            if (!(shortPeriod && longPeriodMA && previousShortMA && previousLongMA)) {
                return false;
            }
            if (shortPeriod == longPeriodMA) {
                if (previousLongMA > previousShortMA) {
                    this.isDeathCrossHint = true;
                } else {
                    this.isGoldenCrossHint = true;
                }
            }
        }
    }
})();
