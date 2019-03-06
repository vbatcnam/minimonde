Calcule = {
	getRandomInt: function(max) {
		return Math.floor(Math.random() * Math.floor(max));
	},
	
	getSqDistance2D: function(abs1, ord1, abs2, ord2){
		return (
			(abs1 - abs2)*(abs1 - abs2)
			+
			(ord1 - ord2)*(ord1 - ord2)
		);
	},
	
	getDistance2D: function(abs1, ord1, abs2, ord2){
		return Math.sqrt(getSqDistance2D(abs1, ord1, abs2, ord2));
	}
}
