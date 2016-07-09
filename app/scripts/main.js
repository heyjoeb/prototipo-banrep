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
		center: new L.LatLng(12.55673, -81.71852),
		zoom: 14
	});

    var latlngs = L.rectangle(bounds).getLatLngs();
        L.polyline(latlngs.concat([latlngs[0]])).addTo(map);
        map.setMaxBounds(bounds);   // Should not enter infinite recursion
    
	// ADD CSV SETTINGS AND ROUTE
	var geoCsv = L.geoCsv(null,{
      fieldSeparator: ';',
      firstLineTitles: true,
	  onEachFeature: function (feature, layer) {
	    //layer.bindPopup(feature.properties['popup']);
        // create popup contents
        var customPopup = '<h1>' + feature.properties['popup'] + '</h1>' + '<img src=' + feature.properties['image'] + '>' + '<p>' + feature.properties['text'] + '</p>' + '<p>' + feature.properties['text2'] + '</p>' + '<p>' + feature.properties['text3'] + '</p>' + '<p>' + feature.properties['text4'] + '</p>';
        
        // specify popup options 
        var customOptions =
           {
           'maxWidth': '280',
           'className' : 'custom'
        };
        layer.bindPopup(customPopup,customOptions);
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
        var options={'separator' : ';'};
	    var data = $.csv.toObjects(input, options);
        // BUILD HTML LIST FROM CSV
        function generateList(data) {
          var html = '';
          var latitude = '';
          var longitude = '';
          var name = '';
          var popup = '';

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
                if (item === 'popup') {
                    popup = data[row][item];
                    var slug2 = function(popup)
                    {
                        return popup
                        .replace(/[^a-z0-9-]/gi, '-')
                        .replace(/-+/g, '-')
                        .replace(/^-|-$/g, '')
                        .toLowerCase();
                    };
                    var theClass = slug2(popup);
                } 
                if (item === 'name') {
                    name = data[row][item];
                    var slug = function(name)
                    {
                        return name
                        .replace(/[^a-z0-9-]/gi, '-')
                        .replace(/-+/g, '-')
                        .replace(/^-|-$/g, '')
                        .toLowerCase();
                    };
                    var theId = slug(name);
                    html += '<li ' + 'id=' + theId + ' ' + 'class=' + theClass + '>' + '<a href="#"' + 'data-zoom="15"' + 'data-position=' + latitude + ',' + longitude + '>' + name + '</a>' + '</li>\r\n';
                }  
              }
            }
          }
          return html;
        }
	    var html = generateList(data);
	    $('#csv-list').empty();
	    $('#csv-list').html(html);
        $('#csv-list li').each(function(){
            $(this).addClass('item-list');
        });
		}
	});

	// ADD DECO
  var image01 = 'images/img03.png',
    imageBounds01 = [[13.373587513919782, -81.34616374969482], [13.398804155297157, -81.39500141143799]];
  L.imageOverlay(image01, imageBounds01).addTo(map);

  var image02 = 'images/img04.png',
    imageBounds02 = [[13.35838945541145, -81.34397506713867], [13.378848157085185, -81.39942169189453]];
  L.imageOverlay(image02, imageBounds02).addTo(map);

  var image03 = 'images/img05.png',
    imageBounds03 = [[13.336049912268548, -81.34320259094238], [13.359642078865688, -81.39890670776367]];
  L.imageOverlay(image03, imageBounds03).addTo(map);

  var image04 = 'images/img06.png',
    imageBounds04 = [[13.314292970650442, -81.35303020477295], [13.336885072551336, -81.40397071838379]];
  L.imageOverlay(image04, imageBounds04).addTo(map);

  var image05 = 'images/img07.png',
    imageBounds05 = [[12.576177454888787, -81.67845726013184], [12.601642692585052, -81.73154354095459]];
  L.imageOverlay(image05, imageBounds05).addTo(map);

  var image06 = 'images/img08.png',
    imageBounds06 = [[12.55163126686446, -81.68854236602783], [12.5773502516034, -81.74557685852051]];
  L.imageOverlay(image06, imageBounds06).addTo(map);

  var image07 = 'images/img09.png',
    imageBounds07 = [[12.528046290290643, -81.69098854064941], [12.553851410960164, -81.7478084564209]];
  L.imageOverlay(image07, imageBounds07).addTo(map);

  var image08 = 'images/img10.png',
    imageBounds08 = [[12.50429156675055, -81.69373512268066], [12.52997338535129, -81.7487096786499]];
  L.imageOverlay(image08, imageBounds08).addTo(map);

  var image09 = 'images/img11.png',
    imageBounds09 = [[12.479948040920366, -81.69845581054688], [12.50538089642164, -81.75141334533691]];
  L.imageOverlay(image09, imageBounds09).addTo(map);



	// ADD STYLE LAYER
	var layer = new L.tileLayer('https://api.mapbox.com/styles/v1/heyjoeb/cio4kq5k6004xafm06nm1pg4g/tiles/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaGV5am9lYiIsImEiOiJjaW5vemYzeGgxMDUwdHZseXVicXZwbTAzIn0.7GJ_d9Xk-m50NUgRsOcnXg', {
		maxZoom: 15,
    minZoom: 14,
		useCache: true,
		tileSize: 512,
  	zoomOffset: -1
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

    // Seed the base layer , according to the bounds variable set before and with zoom levels 14 through 15.
        $('#seed').click(function seed() {
            layer.seed( bounds, 14, 15 );
        });



        // Display seed progress on console
        layer.on('seedprogress', function(seedData){
            var percent = 100 - Math.floor(seedData.remainingLength / seedData.queueLength * 100);
            console.log('Seeding ' + percent + '% done');
        });
        layer.on('seedend', function(seedData){
            console.log('Cache seeding complete');
        });

  // REVEAL LAT AND LNG ON CLICK

   //map.on('click', function(e) { alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng) })



	
	// ADD SIDEBAR
	var sidebar = $('#sidebar').sidebar();

	// ADD MINIMAP
	//var osmUrl = 'https://api.mapbox.com/styles/v1/heyjoeb/cio4kq5k6004xafm06nm1pg4g/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGV5am9lYiIsImEiOiJjaW5vemYzeGgxMDUwdHZseXVicXZwbTAzIn0.7GJ_d9Xk-m50NUgRsOcnXg';
	//var osmAttrib = 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
	//var osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13, useCache: true, attribution: osmAttrib });
	//var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map);

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

// REMODAL
$( document ).ready(function() {
    var inst = $('[data-remodal-id=modal]').remodal();

/**
 * Opens the modal window
 */
inst.open();

  // slider ubicación
  $('#slider-ubicacion').click(function(){
    var hidden = $('.ubicacion');
    if (hidden.hasClass('visible')){
        hidden.animate({"right":"-120px"}, "500").removeClass('visible');
    } else {
        hidden.animate({"right":"0px"}, "500").addClass('visible');
    }
  });

  // slider tipología
  $('#slider-tipologia').click(function(){
    var hidden = $('.tipologia');
    if (hidden.hasClass('visible')){
        hidden.animate({"left":"-580px"}, "500").removeClass('visible');
    } else {
        hidden.animate({"left":"0px"}, "500").addClass('visible');
    }
  });
});

(function() {

  // ServiceWorker is a progressive technology. Ignore unsupported browsers
  if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('service-worker.js').then(function() {
      console.log('CLIENT: service worker registration complete.');
    }, function() {
      console.log('CLIENT: service worker registration failure.');
    });
  } else {
    console.log('CLIENT: service worker is not supported.');
  }

})();
$(window).load(function() {
  // CUSTOM SCROLL
  $('.sidebar-pane').mCustomScrollbar({
    theme: 'rounded-dark'
  });
  //ADD .CURRENT CLASS TO LINK IN LIST
   $('#csv-list li a').on('click', function(){
      $('li a.current').removeClass('current');
      $(this).addClass('current');
  });
});