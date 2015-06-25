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
            if (this.marketData.length <= 2*period) {
                return false;
            }
            return this.marketData.slice(period, period).reduce(function(previous, currenct) { return previous + currenct; }) / period;
        };
        this.getCurrenctMAByPeriod = function(period) {
            if (this.marketData.length <= period) {
                return false;
            }
            return this.marketData.slice(0, period).reduce(function(previous, currenct) { return previous + currenct; }) / period;
        };
        this.parse = function() {
            var shortPeriodMA = this.getCurrenctMAByPeriod(this.shortPeriod);
            var longPeriodMA = this.getCurrenctMAByPeriod(this.longPeriod);
            var previousShortMA = this.getPreviousMAByPeriod(this.shortPeriod);
            var previousLongMA = this.getPreviousMAByPeriod(this.longPeriod);
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
