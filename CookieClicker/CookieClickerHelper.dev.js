// ==UserScript==
// @name Cookie Clicker Helper Dev
// @description Automatically loads the Cookie Monster helper tool from GitHub + some CSS tweaks
// @version 0.3aaa
// @namespace http://nickmorozov.com/
// @author Nikolay Morozov
// @homepage http://nickmorozov.com/
// @license https://opensource.org/licenses/MIT
// @grant GM_addStyle
// @include http://orteil.dashnet.org/cookieclicker/
// @icon http://orteil.dashnet.org/cookieclicker/img/perfectCookie.png
// ==/UserScript==

// @todo https://github.com/builtinnya/UncannyCookieClicker

(function() {
    'use strict';

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

    // @todo Disable everything, so it looks like CM is not running (but it actually has all the stats)

    // Extended Cookie Monster
    Game.CMExtended = {};

    Game.CMExtended.safetyMode = false;

    Game.CMExtended.alert = function(text, offset) {
        Game.Popup(text, (Game.windowW / 2), offset);
    };

    Game.CMExtended.buyNext = function(offset) {
        for (var i in CM.Cache.Objects) {
            var CMObj = CM.Cache.Objects[i];
            var CCObj = Game.Objects[i];

            if (CMObj.color == "Green") {
                if (Game.CMExtended.safetyMode && CM.Cache.lastCookies - CCObj.getPrice() < CM.Cache.LuckyFrenzy) {
                    Game.CMExtended.alert("Purchases stopped at " + i, offset);
                    return false;
                }

                Game.CMExtended.alert("Bought  " + i, offset);
                Game.Objects[i].buy();
                return true;
            }
        }
        return false;
    };

    Game.CMExtended.buyGroup = function(i, offset) {
        if (i === 0) {
            return;
        } else {
            var bought = Game.CMExtended.buyNext(offset);

            if (bought) {
                setTimeout(function() {
                    Game.CMExtended.buyGroup(i - 1, offset + 25);
                }, 100);
            }
        }
    };

    Game.CMExtended.toggleSafety = function() {
        Game.CMExtended.safetyMode = !Game.CMExtended.safetyMode;
        document.getElementById("cmext-toggleSafe").childNodes[0].textContent = Game.CMExtended.safetyMode ? "Safety [ON]" : "Safety [OFF]";
    };

    Game.CMExtended.display = function(id, text, onClick, get) {
        var nodeD = document.createElement("div");
        var nodeS = document.createElement("span");
        var nodeT = document.createTextNode(text);
        nodeS.appendChild(nodeT);
        nodeD.appendChild(nodeS);
        nodeD.setAttribute("onClick", onClick);
        nodeD.setAttribute("onmouseover", "this.style.cursor='pointer'");
        nodeD.setAttribute("onmouseout", "this.style.cursor='default'");
        nodeD.setAttribute("id", id);
        document.getElementById("topBar").appendChild(nodeD);
        if (get) return nodeD; // @fixme
    };

    Game.CMExtended.init = function() {
    	var topBar = document.getElementById("topBar");
        for (var i = 0; i < topBar.children.length; i++) {
            if (topBar.children[i] != 'links') {
                topBar.children[i].remove();
            }
        }

        // var tmp = document.getElementById("links");
        // document.getElementById("topBar").innerHTML = ""; // @todo make the links hover away
        // document.getElementById("topBar").appendChild(tmp);

        Game.CMExtended.display("cmext-buyNext", "Buy Next", "Game.CMExtended.buyGroup(1, 175)");
        Game.CMExtended.display("cmext-buyTen", "Buy 10", "Game.CMExtended.buyGroup(10, 175)");
        Game.CMExtended.display("cmext-toggleSafe", (Game.CMExtended.safetyMode ? "Safety [ON]" : "Safety [OFF]"), "Game.CMExtended.toggleSafety()");
    };

    Game.CMExtended.init();

    // Shitty cheat bot from https://github.com/Pomlon/CookieCheater
    Game.CBOT = {};

    Game.CBOT.objects = Array(
        ["#product0", "Cursor"], ["#product1", "Grandma"], ["#product2", "Farm"], ["#product3", "Mine"], ["#product4", "Factory"], ["#product5", "Bank"], ["#product6", "Temple"], ["#product7", "Wizard tower"], ["#product8", "Shipment"], ["#product9", "Alchemy lab"], ["#product10", "Portal"], ["#product11", "Time machine"], ["#product12", "Antimatter condenser"], ["#product13", "Prism"]
    );

    Game.CBOT.buyStuff = function() {
        for (var i = 0; i < Game.CBOT.objects.length; i++) {
            if (CM.Cache.Objects[Game.CBOT.objects[i][1]].color == "Green") {
                $(Game.CBOT.objects[i][0]).click();
            }
        }
    };

    Game.CBOT.autoClick = function() {
        clearInterval(Game.CBOT.autoObject);
        Game.CBOT.autoObject = setInterval(function() {
            Game.ClickCookie();
        }, 1);
    };

    Game.CBOT.autoGoldenCookie = function() {
        $('#goldenCookie').click();
    };

    Game.CBOT.stopClick = function() {
        clearInterval(Game.CBOT.autoObject);
    };

    Game.CBOT.startAutoBuy = function() {
        clearInterval(Game.CBOT.autoBuyObject);
        Game.CBOT.autoBuyObject = setInterval(function() {
            Game.CBOT.buyStuff();
        }, 100);
    };

    Game.CBOT.stopAutoBuy = function() {
        clearInterval(Game.CBOT.autoBuyObject);
    };

    Game.CBOT.startGoldenClicker = function() {
        clearInterval(Game.CBOT.autoGoldenCookieObject);
        Game.CBOT.autoGoldenCookieObject = setInterval(function() {
            Game.CBOT.autoGoldenCookie();
        }, 500);
    };

    Game.CBOT.stopGoldenClicker = function() {
        clearInterval(Game.CBOT.autoGoldenCookieObject);
    };

    // btnCBOTstartClick = "<button id='CBOTstartClick' onclick='Game.CBOT.autoClick()'>Start click</button>",
    // btnCBOTstopClick = "<button id='CBOTstopClick' onclick='Game.CBOT.stopClick()'>Stop click</button>";
    // @fixme
    // btnCBOTautoBuy = "<button id='CBOTautoBuy' onclick='Game.CBOT.startAutoBuy()'>AutoBuy</button>",
    // btnCBOTstopBuy = "<button id='CBOTstopBuy' onclick = 'Game.CBOT.stopAutoBuy()'>Stop AutoBuy</button>",
    // btnCBOTstartAutoGoldCookie = "<button id='CBOTstartAutoGoldCookie' onclick='Game.CBOT.startGoldenClicker()'>auto GCookie</button>",
    // btnCBOTstopAutoGoldCookie = "<button id='CBOTstopAutoGoldCookie' onclick = 'stopGoldenClicker()'>stop auto GCookie</button>";

    Game.CCH = {};

    Game.CCH.toggleBigCookieAutoClick = function() {
        if (typeof Game.CCH.bigCookieAutoClick === 'undefined') {
            Game.CCH.bigCookieAutoClick = setInterval(function() {
                Game.ClickCookie();
            }, 100);
        } else {
            Game.CCH.bigCookieAutoClick = clearInterval(Game.CCH.bigCookieAutoClick);
        }
    };

    Game.CMExtended.display("cmext-start-click", "Big Cookie", "Game.CCH.toggleBigCookieAutoClick()");

    // Notifications management
    // @note we probably want to ask for permission when the option is enabled (once there are options)
    Notification.requestPermission().then(function(result) {
        return; // @debug
        if (result === 'denied' || result === 'default') {
            return;
        }
        setInterval(function() {
            if (Game.goldenCookie.life > 0) {
                if (!popupCookie) {
                    popupCookie = new Notification(
                        'Golden Cookie!', {
                            'icon': document.querySelector('#goldenCookie').style.backgroundImage.slice(4, -1),
                        }
                    );
                    popupCookie.onclick = Game.goldenCookie.click();
                }
            } else if (popupCookie) {
                popupCookie.close();
                popupCookie = 0;
            }

            if (document.querySelector('#seasonPopup').style.display != 'none') {
                if (!popupSeason) {
                    popupSeason = new Notification(
                        'Golden Cookie!', {
                            'icon': document.querySelector('#seasonPopup').style.backgroundImage.slice(4, -1),
                        }
                    );
                    popupSeason.onclick = document.body.click.bind(document.querySelector('#seasonPopup'));
                }
            } else if (popupSeason) {
                popupSeason.close();
                popupSeason = 0;
            }
        }, 1000);
    });

})();

// @note
// Pretty info window:
// setTimeout(function(){Game.Prompt('<h3>New beta</h3><div class="block">Hey there! Unfortunately, your old beta save won\'t work here anymore; you\'ll have to start fresh or import your save from the live version.<div class="line"></div>Thank you for beta-testing Cookie Clicker, we hope you\'ll enjoy it and find strange and interesting bugs!</div>',[['Alright then!','Game.ClosePrompt();']]);},200);
// Popup and less pretty window:
// if (Game.prefs.popups) Game.Popup('Oops, looks like the import string is all wrong!');
//   else Game.Notify('Error importing save','Oops, looks like the import string is all wrong!','',6,1);
