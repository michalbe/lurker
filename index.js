/* exported LURKER */
'use strict';
var URL = 'https://crossorigin.me/http://recapguide.com/';
var SEARCH_URL = URL + 'search/';

var LURKER = function(episodeObject, cb) {
  var dfd = $.Deferred();
  var title = episodeObject.title;
  var season = episodeObject.season;
  var episode = episodeObject.episode;

  $.ajax({
    type: 'GET',
    url: SEARCH_URL + title,
    contentType: 'application/json'
  }).then(function(data) {
    var _doc =  new DOMParser().parseFromString(data, 'text/html');
    var showId = _doc.querySelector('.gallery.row li a').pathname;

    showId = showId.replace('/recap/', '').split('/')[0];

    var showURL = ['recap', showId, title, 'season-' + season, 'episode-' + episode].join('/');

    $.ajax({
      type: 'GET',
      url: URL + showURL,
      contentType: 'application/json'
    }).then(function(data) {
      _doc =  new DOMParser().parseFromString(data, 'text/html');
      var images = _doc.querySelectorAll('.thumb .img-responsive.lazy-slide[data-src]');
      var image = images[Math.floor(Math.random()*images.length)];
      dfd.resolve(image.dataset.src);
    });
  });
  return dfd;
};
