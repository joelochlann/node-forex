(function(){
	window.Sma = function(shortPeriod, longPeriod, marketData) {
        this.shortPeriod = shortPeriod;
        this.longPeriod = longPeriod;
        this.marketData = marketData;
        this.deathCrossHint = false;
        this.goldenCrossHint = false;

        this.isDeathCrossHint = function() {
            return this.deathCrossHint;
        };
        this.isGoldenCrossHint = function() {
            return this.goldenCrossHint;
        };
        this.parse = function() {
            if (this.marketData.length > this.longPeriod) {
            }
        }
    }
})();
