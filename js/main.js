// Vinyl fun


// Create record (top down)

// rotate it using css3


// angle it using css3?


// html5 audio to play crackling


// create arm in raphael


// animate it moving into position then play a different song in html5 audio

var VI = VI || {};



/*
	Core
*/

VI.core = (function () {


	var settings = {};


	function init() {

		var s = settings;

		VI.vinyl.load();

	}


	return {
		init : init
	};


})();


/*
	Vinyl
*/

VI.vinyl = (function () {


	var settings = {};


	function load() {

		// createRecord();

		// setTimeout(function () {

		// 	startPlaying();

		// }, 1000);

	}


	function getTrackRadius( position ) {

		var s = settings,
			tRadius;

		tRadius = s.radius - (position * Math.floor((Math.random()*240)+1));

		return tRadius;

	}


	function createRecord() {

		var s = settings;

		s.radius = 1000;
		s.centre = 200;

		var paper = Raphael(0, 0, s.radius+s.centre + 10, s.radius+s.centre + 10);

		// Record outer
		var outer = paper.circle(s.centre, s.centre, s.radius + 5).attr({
			stroke: '#000',
			'stroke-width': 10,
			fill: '#000'
		});

		// Main background
		var rPath = paper.circle(s.centre, s.centre, s.radius).attr({
			fill: '#333333'
		});

		// Tracks
		var tracks = [340, 450, 540, 600, 660, 730, 830, 920];

		_.each(tracks, function (track, index) {

			var trackLine = paper.circle(s.centre, s.centre, track).attr({
				stroke: '#000',
				'stroke-width': 4,
				fill: null
			});

		});

		// Main grooves
		for (var m = 440; m < 1000; m=m+2) {

			var groove = paper.circle(s.centre, s.centre, m).attr({
				stroke: '#000',
				'stroke-width': 1,
				fill: null
			});
		}

		// Grooves
		for (var g = 1; g < 40; g=g+3) {

			var innergroove = paper.circle(s.centre, s.centre, 364 + 2 * g).attr({
				stroke: '#000',
				'stroke-width': 1,
				fill: null
			});

		}

		// Label

		// label back
		// label outer dip
		// label center
		// label top
		// hole in middle


		var labelBackBg = paper.circle(s.centre, s.centre, 360).attr({
			fill: '#c80303'
		});

		var labelBackInner = paper.circle(s.centre, s.centre, 330).attr({
			fill: '#c80303',
			stroke: '#ac0202',
			'stroke-width': 10
		});

		var labelBackCentre = paper.circle(s.centre, s.centre, 148).attr({
			fill: '270-#fd3434:5-#ac0202:100',
			stroke: 'none'
		});

		var labelBackInnerCentre = paper.circle(s.centre, s.centre, 128).attr({
			fill: '#c80303',
			stroke: 'none'
		});

		var holeShadow = paper.circle(s.centre, s.centre, 30).attr({
			fill: '#000'
		});

		var hole = paper.circle(s.centre, s.centre+2, 30).attr({
			fill: '#fff',
			stroke: 'none'
		});

	}


	function startPlaying() {

		$('#footer').addClass('rotate');

		var player = $('audio')[0];

		player.addEventListener("ended", playNext);

		_.delay(function () {
			player.play();
		}, 500);

	}


	function playNext() {
		var player = $('audio')[0];

		if (!$('audio').hasClass('needle-up')) {

			player.removeEventListener("ended");

			player.src = 'audio/needle-up.mp3';

			$('audio').addClass('needle-up');

			player.load();
			player.play();

			console.log(player);
		}
		else {
			// Just played 'needle-up' so stop spinning

			console.log(getRotationDegrees($('#footer')));

			$('#footer').removeClass('rotate');
		}
	}


	// Parameter element should be a DOM Element object.
	// Returns the rotation of the element in degrees.
	function getRotationDegrees (element) {

		debugger;
	    // get the computed style object for the element
	    var style = window.getComputedStyle(element);
	    // this string will be in the form 'matrix(a, b, c, d, tx, ty)'
	    var transformString = style['-webkit-transform']
	                       || style['-moz-transform']
	                       || style['transform'] ;
	    if (!transformString || transformString == 'none')
	        return 0;
	    var splits = transformString.split(',');
	    // parse the string to get a and b
	    var a = parseFloat(splits[0].substr(7));
	    var b = parseFloat(splits[1]);
	    // doing atan2 on b, a will give you the angle in radians
	    var rad = Math.atan2(b, a);
	    var deg = 180 * rad / Math.PI;
	    // instead of having values from -180 to 180, get 0 to 360
	    if (deg < 0) deg += 360;
	    return deg;
	}


	return {
		load : load
	};


})();




$(document).ready(function () {

	VI.core.init();

});
