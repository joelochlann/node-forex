(function(){
	window.Platform = {
		run:function(socketAddress) {
			var statusBar = $(document).find("#status-bar");

			var conn = new WebSocket(socketAddress);
			conn.onopen = function(e) {
				$(statusBar).html("Connection established");
			};

			conn.onmessage = function(e) {
				$(statusBar).html(JSON.stringify(e.data));
			    console.log(e.data);
			};

			conn.onerror = function(e) {
				$(statusBar).html("Error - see console.");
			    console.log(e);	
			}
		}
	}
})();
