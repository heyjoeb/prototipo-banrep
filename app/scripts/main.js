/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

	L.Icon.Default.imagePath = 'images/';

	/* create leaflet map */
	var map = L.map('map', {
		center: [13.378129, -81.366288],
		zoom: 13

	});

	/* add style tile layer */
	new L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
		maxZoom: 20,
		attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	// ADD CUSTOM ICONS
	var orangeIcon = L.icon({
	    iconUrl: 'images/octopus-icon.png',
	    shadowUrl: 'images/octopus-icon-shadow.png',

	    iconSize:     [35, 35], // size of the icon
	    shadowSize:   [35, 35], // size of the shadow
	    iconAnchor:   [0, 17], // point of the icon which will correspond to marker's location
	    shadowAnchor: [5, 20],  // the same for the shadow
	    popupAnchor:  [16, -17] // point from which the popup should open relative to the iconAnchor
	});

	// ADD MARKERS
	var marker = L.marker([13.366427, -81.384776], {icon: orangeIcon}).addTo(map);

	// ADD POPUP
	marker.bindPopup('Acá queda algo que se llama EL PULPO').openPopup();

}(window, document, L));