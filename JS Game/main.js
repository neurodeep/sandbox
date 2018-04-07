$(function() {
  function say(words) {
    hero.html('<center>' + words + '</center>')
  }

	$(window).keypress(function(e) {
		var ev = e || window.event;
		var key = ev.keyCode || ev.which;
		say(key);
    
    switch (key) {
    	case 122:
      	hero.fadeOut();
      case 120:
      	hero.fadeIn();
      default:
      	say('Ouch!');
    }
	});

  say('Hello');
});
