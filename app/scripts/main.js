/*jslint browser: true*/
/*global L, $, alert */
/*jshint -W069 */
//jshint unused:false

(function (window, document, L, undefined) {
	'use strict';

	L.Icon.Default.imagePath = 'images/';

	// CREATE LEAFLET MAP
    var bounds = new L.LatLngBounds(new L.LatLng(14.658129, -82.200288), new L.LatLng(12.400129, -79.866288));
	var map = L.map('map', {
		center: bounds.getCenter(),
		zoom: 10
	});
    var latlngs = L.rectangle(bounds).getLatLngs();
        L.polyline(latlngs.concat([latlngs[0]])).addTo(map);
        map.setMaxBounds(bounds);   // Should not enter infinite recursion

	// ADD CSV SETTINGS AND ROUTE
	var geoCsv = L.geoCsv(null,{
	  fieldSeparator: ',',
	  firstLineTitles: true,
	  onEachFeature: function (feature, layer) {
	    layer.bindPopup(feature.properties['popup']);
	  },
	  pointToLayer: function (feature, latlng) {
	    return L.marker(latlng, {
	      icon:L.icon({
	        iconUrl: feature.properties['icon'],
	        //shadowUrl: 'images/shadow.png',
	        iconSize: [32,32],
	        //shadowSize:   [35,35],
	        //shadowAnchor: [5, 25]
	      })
	    });
	  }
	});
	$.ajax ({
	  type:'GET',
	  dataType:'text',
	  url:'../datos.csv',
	  error: function() {
	    alert('No se pudieron cargar los datos');
	  },
	  success: function(csv) {
	    geoCsv.addData(csv);
	    map.addLayer(geoCsv);
	    var input =  csv;
	    var data = $.csv.toObjects(input);
        // BUILD HTML LIST FROM CSV
        function generateList(data) {
          var html = '';
          var latitude = '';
          var longitude = '';

          if(typeof(data[0]) === 'undefined') {
            return null;
          }

          if(data[0].constructor === Object) {
            for(var row in data) {
              for(var item in data[row]) {
                if (item === 'lat') {
                    latitude = data[row][item];
                }  
                if (item === 'lng') {
                    longitude = data[row][item];
                }  
                if (item === 'name') {
                    html += '<li>' + '<a href="#"' + 'data-zoom="15"' + 'data-position=' + latitude + ',' + longitude + '>' + data[row][item] + '</a>' + '</li>\r\n';
                }  
              }
            }
          }
          
          return html;
        }
	    var html = generateList(data);
	    $('#csv-list').empty();
	    $('#csv-list').html(html);
		}
	});

	
    
	

	// ADD STYLE LAYER
	var layer = new L.tileLayer('https://api.mapbox.com/styles/v1/heyjoeb/cio4kq5k6004xafm06nm1pg4g/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGV5am9lYiIsImEiOiJjaW5vemYzeGgxMDUwdHZseXVicXZwbTAzIn0.7GJ_d9Xk-m50NUgRsOcnXg', {
		maxZoom: 16,
        minZoom: 10,
		useCache: true,
		tileSize: 512,
  		zoomOffset: -1,
		attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
    // Listen to cache hits and misses and spam the console
        // The cache hits and misses are only from this layer, not from the WMS layer.
        layer.on('tilecachehit',function(ev){
            console.log('Cache hit: ', ev.url);
        });
        layer.on('tilecachemiss',function(ev){
            console.log('Cache miss: ', ev.url);
        });

        layer.addTo(map);
	
	// ADD SIDEBAR
	var sidebar = $('#sidebar').sidebar();

	// ADD MINIMAP
	var osmUrl = 'https://api.mapbox.com/styles/v1/heyjoeb/cio4kq5k6004xafm06nm1pg4g/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGV5am9lYiIsImEiOiJjaW5vemYzeGgxMDUwdHZseXVicXZwbTAzIn0.7GJ_d9Xk-m50NUgRsOcnXg';
	var osmAttrib = 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
	var osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13, useCache: true, attribution: osmAttrib });
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
    };
}(window, document, L));

// OUTPUT CSV NAMES TO MAIN NAV
$( document ).ready(function() {
    
});
