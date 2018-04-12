/* Clear request from the URL */
if (location.href.match(/\?.*/) && document.referrer) {
  location.href = location.href.replace(/\?.*/, '');
}

$(function () {
	// Add tracklist titles
  $('.sc-trackslist.first').wrap('<div class="trackslist-wrapper first">');
  $('.sc-trackslist.second').wrap('<div class="trackslist-wrapper second">');
  $('.trackslist-wrapper.first').prepend('<div class="trackslist-title">' + title_first);
  $('.trackslist-wrapper.second').prepend('<div class="trackslist-title">' + title_second);

  // Add custom scrolls
  $('.sc-trackslist').slimScroll();

  // Remove preload
  $('#preload').remove();
});
