(function(){
    window.Sma = function(shortPeriod, longPeriod, marketData, defaultDecimalPoint) {
        this.shortPeriod = shortPeriod;
        this.longPeriod = longPeriod;
        this.marketData = marketData;
        this.deathCrossHint = false;
        this.goldenCrossHint = false;
        this.defaultDecimalPoint = defaultDecimalPoint;
        //console.log('shortPeriod: '+shortPeriod);
        //console.log('longPeriod: '+longPeriod);
        //console.log('defaultDecimalPoint: '+defaultDecimalPoint);

        this.getPreviousMAByPeriod = function(period) {
            if (this.marketData.length <= period) {
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

            if (!(shortPeriod && longPeriodMA && previousShortMA && previousLongMA)) {
                return false;
            }

            var shortPeriodMA = shortPeriodMA.toFixed(this.defaultDecimalPoint);
            var longPeriodMA = longPeriodMA.toFixed(this.defaultDecimalPoint);
            var previousShortMA = previousShortMA.toFixed(this.defaultDecimalPoint);
            var previousLongMA = previousLongMA.toFixed(this.defaultDecimalPoint);

            //console.log('ShortMA: '+shortPeriodMA);
            //console.log('previousShortMA: '+previousShortMA);
            //console.log('longPeriodMA: '+longPeriodMA);
            //console.log('previousLongMA: '+previousLongMA);
            if (shortPeriodMA == longPeriodMA) {
                if (previousLongMA > previousShortMA) {
                    console.log('isDeathCrossHint');
                    this.deathCrossHint = true;
                } else {
                    console.log('isGoldenCrossHint');
                    this.goldenCrossHint = true;
                }
            }
        }
    }
})();
