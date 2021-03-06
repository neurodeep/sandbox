// ==UserScript==
// @namespace     https://openuserjs.org/users/neurodeep
// @name          Getting Started with a User Script
// @description   Showing the current basic and recommended format for a User script.
// @copyright     2018, neurodeep (https://openuserjs.org/users/neurodeep)
// @license       MIT
// @version       0.0.0
// @include       https://https://www.youtube.com/watch*
// @grant none
// ==/UserScript==

// ==OpenUserJS==
// @author neurodeep
// ==/OpenUserJS==

// Continuos Integration

// Adds Like/Dislike buttons and keyboard shortcuts to fullscreen.

// commit script
// test It (so write tests(selenium))
// deploy to userscripts

//addEventListener('load', () => {
  let watchLater = document.querySelector('.ytp-button.ytp-watch-later-button');
  let like = document.querySelectorAll('ytd-toggle-button-renderer.force-icon-button')[0];
  let dislike = document.querySelectorAll('ytd-toggle-button-renderer.force-icon-button')[1];
  
  watchLater.parentElement.appendChild(like);
  watchLater.parentElement.appendChild(dislike);
//});

