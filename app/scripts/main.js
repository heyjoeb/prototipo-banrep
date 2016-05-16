/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

	L.Icon.Default.imagePath = 'images/';

	/* create leaflet map */
	var map = L.map('map', {
		center: [13.358129, -81.366288],
		zoom: 13

	});

	/* add style tile layer */
	new L.tileLayer('https://api.mapbox.com/styles/v1/heyjoeb/cio4kq5k6004xafm06nm1pg4g/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGV5am9lYiIsImEiOiJjaW5vemYzeGgxMDUwdHZseXVicXZwbTAzIn0.7GJ_d9Xk-m50NUgRsOcnXg', {
		maxZoom: 20,
		useCache: true,
		tileSize: 512,
  		zoomOffset: -1,
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
	var marker2 = L.marker([13.369427, -81.385776], {icon: orangeIcon}).addTo(map);
	var marker3 = L.marker([13.352427, -81.365776], {icon: orangeIcon}).addTo(map);

	// ADD POPUP
	marker.bindPopup('Acá queda algo que se llama EL PULPO').openPopup();
	marker2.bindPopup('Acá queda algo que se llama EL PULPO2').openPopup();
	marker3.bindPopup('Acá queda algo que se llama EL PULPO3').openPopup();

	// ADD SIDEBAR
	var sidebar = $('#sidebar').sidebar();

	// ADD MINIMAP
	var osmUrl = 'https://api.mapbox.com/styles/v1/heyjoeb/cio4kq5k6004xafm06nm1pg4g/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGV5am9lYiIsImEiOiJjaW5vemYzeGgxMDUwdHZseXVicXZwbTAzIn0.7GJ_d9Xk-m50NUgRsOcnXg';
	var osmAttrib = 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
	var osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13, attribution: osmAttrib });
	var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map);

	//  ADD LINK FOR MAP NAVIGATION
	document.getElementById('map-navigation').onclick = function(abc) {
        var pos = abc.target.getAttribute('data-position');
        var zoom = abc.target.getAttribute('data-zoom');
        if (pos && zoom) {
            var locat = pos.split(',');
            var zoo = parseInt(zoom);
            map.setView(locat, zoo, {animation: true});
            return false;
        }
    }
}(window, document, L));