/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

	L.Icon.Default.imagePath = 'images/';

	// CREATE LEAFLET MAP
	var map = L.map('map', {
		center: [13.358129, -81.366288],
		zoom: 13

	});

	// ADD CSV SETTINGS AND ROUTE
	var geo_csv = L.geoCsv(null,{
	  fieldSeparator: ',',
	  firstLineTitles: true,
	  onEachFeature: function (feature, layer) {
	    layer.bindPopup(feature.properties["popup"]);
	  },
	  pointToLayer: function (feature, latlng) {
	    return L.marker(latlng, {
	      icon:L.icon({
	        iconUrl: feature.properties['icon'],
	        //shadowUrl: 'images/shadow.png',
	        //iconSize: [35,35],
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
	    geo_csv.addData(csv);
	    map.addLayer(geo_csv);
	    var input =  csv;
	    var data = $.csv.toObjects(input);
	    var html = generateList(data);
	    $('#csv-list').empty();
	    $('#csv-list').html(html);
		}
	});

	
    // BUILD HTML LIST FROM CSV
    function generateList(data) {
      var html = '';

      if(typeof(data[0]) === 'undefined') {
        return null;
      }

      if(data[0].constructor === Object) {
        for(var row in data) {
          for(var item in data[row]) {
          	if (item === 'lat') {
		        var latitude = data[row][item];
		    }  
		    if (item === 'lng') {
		        var longitude = data[row][item];
		    }  
          	if (item === 'name') {
		        html += '<li>' + '<a href="#"' + 'data-zoom="15"' + 'data-position=' + latitude + ',' + longitude + '>' + data[row][item] + '</a>' + '</li>\r\n';
		    }  
          }
        }
      }
      
      return html;
    }
	

	// ADD STYLE LAYER
	new L.tileLayer('https://api.mapbox.com/styles/v1/heyjoeb/cio4kq5k6004xafm06nm1pg4g/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGV5am9lYiIsImEiOiJjaW5vemYzeGgxMDUwdHZseXVicXZwbTAzIn0.7GJ_d9Xk-m50NUgRsOcnXg', {
		maxZoom: 20,
		useCache: true,
		tileSize: 512,
  		zoomOffset: -1,
		attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
	
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

// OUTPUT CSV NAMES TO MAIN NAV
$( document ).ready(function() {
    
});
