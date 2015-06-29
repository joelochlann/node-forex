(function(){
    window.TickWidget = function() {
        this.lastTick = null;

        this.display = function(template, tick) {
            if (this.lastTick === null) {
                this.lastTick = tick;
            }
            var up = tick.close - this.lastTick.close > 0;
            if (tick.close === this.lastTick) {
                up = null;
            };
            this.lastTick = tick;

            var html = $(template({"close":parseFloat(tick.close).toFixed(2)}));
            if (up) {
                html.addClass('green').removeClass('red');
            } else if (up === false) {
                html.addClass('red').removeClass('green');
            } else {
                html.removeClass('red').removeClass('green');
            }
            
            return html;
        }
    }
})();