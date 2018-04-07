if (Game.cAutoClick) {
	clearInterval(Game.cAutoClick);
	delete Game.cAutoClick;
} else {
	Game.cAutoClick = setInterval(function() {
		Game.shimmerTypes.golden.time = Game.shimmerTypes.golden.maxTime;
		Game.shimmers.forEach(function(shimmer) {
			shimmer.pop()
		})
	}, 100);
}
