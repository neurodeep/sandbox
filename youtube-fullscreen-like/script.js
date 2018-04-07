// Continuos Integration

// Adds Like/Dislike buttons and keyboard shortcuts to fullscreen.


// commit script
// test It (so write tests(selenium))
// deploy to userscripts

watchLater = document.querySelector('.ytp-button.ytp-watch-later-button');
like = document.querySelectorAll('ytd-toggle-button-renderer.force-icon-button')[0];
dislike = document.querySelectorAll('ytd-toggle-button-renderer.force-icon-button')[1]

watchLater.parentElement.appendChild(like);
watchLater.parentElement.appendChild(dislike);

