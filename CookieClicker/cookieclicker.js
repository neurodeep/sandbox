javascript: if (typeof Game.goldenCookieAutoClick === "undefined") {
        Game.goldenCookieAutoClick = setInterval(function() {
            if (Game.goldenCookie.life > 0) {
                Game.goldenCookie.click();
            }
        }, 500);
    } else {
        Game.goldenCookieAutoClick = clearInterval(Game.goldenCookieAutoClick);
    }


javascript: if (typeof Game.bigCookieAutoClick === "undefined") {
        Game.bigCookieAutoClick = setInterval(function() { Game.ClickCookie(); }, 100);
    } else {
        Game.bigCookieAutoClick = clearInterval(Game.bigCookieAutoClick);
    }



javascript: if (typeof Game.goldenCookieBeep === "undefined") {
        var gcbHasAlerted = false;
        Game.goldenCookieBeep = setInterval(function() {
            if (!gcbHasAlerted && Game.goldenCookie.life > 0) {
                gcbHasAlerted = true;
                var a = new Audio("http://www.soundjay.com/button/beep-1.wav");
                a.volume = 0.7;
                a.play();
            } else if (Game.goldenCookie.life == 0) {
                gcbHasAlerted = false;
            }
        }, 100);
    } else {
        Game.goldenCookieBeep = clearInterval(Game.goldenCookieBeep);
    }




setInterval(function() {
    if (Game.clickFrenzy > 0 || Game.frenzy) Game.ClickCookie();
}, 150);



var gcbHasAlerted = false;
setInterval(function() {
    if (!gcbHasAlerted && Game.goldenCookie.life > 0) {
        gcbHasAlerted = true;
        var a = new Audio("http://www.soundjay.com/button/beep-1.wav");
        a.volume = 0.7;
        a.play();
    } else if (Game.goldenCookie.life == 0) {
        gcbHasAlerted = false;
    }
}, 100);


if (Game.nmCookieInterval) {
    Game.nmCookieInterval = clearInterval(Game.nmCookieInterval)
} else {
    Game.nmCookieInterval = setInterval(function() {
        if (Game.goldenCookie.life > 0) { Game.goldenCookie.click() }
    }, 1000)
}

if (Game.nmDeerInterval) {
    Game.nmDeerInterval = clearInterval(Game.nmDeerInterval)
} else {
    Game.nmDeerInterval = setInterval(function() {
        if (Game.seasonPopup.life > 0) { Game.seasonPopup.click() }
    }, 1000)
}

if (Game.nmWrinklerInterval) {
    Game.nmWrinklerInterval = clearInterval(Game.nmWrinklerInterval)
} else { Game.nmWrinklerInterval = setInterval(function() { Game.CollectWrinklers() }, 10000) }

if (Game.nmClickInterval) {
    Game.nmClickInterval = clearInterval(Game.nmClickInterval)
} else { Game.nmClickInterval = setInterval(function() { Game.ClickCookie() }, 5) }

if (Game.nmBuyInterval) {
    Game.nmBuyInterval = clearInterval(Game.nmBuyInterval)
} else {
    Game.nmBuyInterval = setInterval(function() {
        Game.ObjectsById.forEach(function(product) {
            if (product.amount < 10) { product.buy() }
        })
    }, 100)
}

if (Game.nmBuyInterval) { Game.nmBuyInterval = clearInterval(Game.nmBuyInterval) } else {
    Game.nmBuyInterval = setInterval(function() {
        Game.ObjectsById.forEach(function(product) {
            if (product.amount < 15) { product.buy() }
        })
    }, 100)
}

if (Game.nmBuyInterval) {
    Game.nmBuyInterval = clearInterval(Game.nmBuyInterval)
} else {
    Game.nmBuyInterval = setInterval(function() {
        Game.ObjectsById.forEach(function(product) {
            if (product.amount < 25) { product.buy() }
        })
    }, 100)
}

if (Game.nmBuyInterval) {
    Game.nmBuyInterval = clearInterval(Game.nmBuyInterval)
} else {
    Game.nmBuyInterval = setInterval(function() {
        Game.ObjectsById.forEach(function(product) {
            if (product.amount < 50) { product.buy() }
        })
    }, 100)
}

if (Game.nmBuyInterval) {
    Game.nmBuyInterval = clearInterval(Game.nmBuyInterval)
} else {
    Game.nmBuyInterval = setInterval(function() {
        Game.ObjectsById.forEach(function(product) {
            if (product.amount < 100) { product.buy() }
        })
    }, 100)
}

if (Game.nmBuyInterval) {
    Game.nmBuyInterval = clearInterval(Game.nmBuyInterval)
} else {
    Game.nmBuyInterval = setInterval(function() {
        Game.ObjectsById.forEach(function(product) {
            if (product.amount < 200) { product.buy() }
        })
    }, 100)
}

if (Game.nmBuyInterval) {
    Game.nmBuyInterval = clearInterval(Game.nmBuyInterval)
} else {
    Game.nmBuyInterval = setInterval(function() {
        Game.ObjectsById.forEach(function(product) {
            if (product.amount < 250) { product.buy() }
        })
    }, 100)
}

if (Game.nmBuyGrandmaInterval) {
    Game.nmBuyGrandmaInterval = clearInterval(Game.nmBuyGrandmaInterval)
} else {
    Game.nmBuyGrandmaInterval = setInterval(function() {
        Game.ObjectsById.forEach(function(product) {
            if (product.single == 'grandma' && product.amount < 350) { product.buy() }
        })
    }, 1000)
}

if (Game.nmBuyCursorInterval) {
    Game.nmBuyCursorInterval = clearInterval(Game.nmBuyCursorInterval)
} else {
    Game.nmBuyCursorInterval = setInterval(function() {
        Game.ObjectsById.forEach(function(product) {
            if (product.single == 'cursor' && product.amount < 500) { product.buy() }
        })
    }, 1000)
}

if (Game.nmBuyInterval) {
    Game.nmBuyInterval = clearInterval(Game.nmBuyInterval)
} else { Game.nmBuyInterval = setInterval(function() { Game.ObjectsById.forEach(function(product) { product.buy() }) }, 1000) }

if (Game.nmUpgradeInterval) {
    Game.nmUpgradeInterval = clearInterval(Game.nmUpgradeInterval)
} else {
    Game.nmUpgradeInterval = setInterval(function() {
        Game.UpgradesById.forEach(function(upgrade) {
            if (upgrade.unlocked && !upgrade.bought && upgrade.pool != 'toggle') { upgrade.buy() }
        })
    }, 1000)
}
