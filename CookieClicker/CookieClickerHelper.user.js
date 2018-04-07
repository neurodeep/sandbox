// ==UserScript==
// @name Cookie Clicker Helper
// @description Automatically loads the Cookie Monster helper tool from GitHub + some CSS tweaks
// @version 0.3a
// @namespace http://nickmorozov.com/
// @author Nikolay Morozov
// @homepage http://nickmorozov.com/
// @license https://opensource.org/licenses/MIT
// @grant GM_addStyle
// @include http://orteil.dashnet.org/cookieclicker/
// @icon http://orteil.dashnet.org/cookieclicker/img/perfectCookie.png
// ==/UserScript==

(function() {

	var timerReady, css, style, head;

	css = '.storeSection { height: auto; min-height: 60px; }';

	// Inject CSS one way or another ('@grant GM_addStyle' should allow to pass the first check).
	if (typeof GM_addStyle !== 'undefined') {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle !== 'undefined') {
		PRO_addStyle(css);
	} else if (typeof addStyle !== 'undefined') {
		addStyle(css);
	} else {
		// Create a <style> tag with custom CSS.
		head = document.getElementsByTagName('head');
		style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));

		// Put the styles in the <head> if available.
		if (head.length > 0) {
			head[0].appendChild(style);
		} else {
			document.documentElement.appendChild(style);
		}
	}

	// Load the Cookie Monster.
	timerReady = setInterval(function() {
		if (Game && Game.ready) {
			Game.LoadMod('http://aktanusa.github.io/CookieMonster/CookieMonster.js');
			clearInterval(timerReady);
		}
	}, 500);

	// Credits to https://greasyfork.org/scripts/9494-cookie-clicker-notification FIXME
	if (Notification.permission == 'default'){
	document.body.onclick = function (){
	Notification.requestPermission();
	document.body.onclick = null;
	};
	}

	setTimeout(function(q,r){
	setInterval(function(){ 
	if (document.querySelector('#goldenCookie').style.display != 'none'){ 
	if (!q) 
	(q = new Notification('Golden Cookie!', 
	{ icon: document.querySelector('#goldenCookie').style.backgroundImage.slice(4, -1) }))
	.onclick = document.body.click.bind(document.querySelector('#goldenCookie'));
	} else if (q){ 
	q.close();
	q = 0;
	}

	if (document.querySelector('#seasonPopup').style.display != 'none'){ 
	if (!r) 
	(r = new Notification('Season Popup!', 
	{ icon: document.querySelector('#seasonPopup').style.backgroundImage.slice(4, -1) }))
	.onclick = document.body.click.bind(document.querySelector('#seasonPopup'));
	} else if (r){ 
	r.close();
	r = 0;
	}
	}, 100);

	window.onkeydown = window.onkeypress = function(e){ 
	if (e.keyCode == 32)
	return false;
	}

	window.onkeyup = function(e){       
	if (e.keyCode == 32 && e.shiftKey)
	Game.Notify('Heavenly Chips', 'Reset now and total count will be ' + Beautify(Game.HowMuchPrestige(Game.cookiesReset+Game.cookiesEarned)), 0, 3);

	if ([ 13, 17, 32 ].indexOf(e.keyCode) + 1)
	document.querySelector('#bigCookie').click();
	}
	}, 500);

})();
